import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn import metrics
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

df = pd.read_csv("public_grievances_detailed.csv") 
texts = df["Statement"].tolist()
labels = df["Department"].tolist()

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.25, random_state=42)

model = make_pipeline(TfidfVectorizer(), MultinomialNB())

model.fit(X_train, y_train)

with open("grievance_model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("grievance_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

class GrievanceRequest(BaseModel):
    statement: str

@app.post("/predict/")
def predict_department(request: GrievanceRequest):
    prediction = model.predict([request.statement])
    return {"department": prediction[0]}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
