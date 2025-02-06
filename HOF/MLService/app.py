import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from fastapi.staticfiles import StaticFiles
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

class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response

app.mount('/', SPAStaticFiles(directory='../dist', html=True), name='index')

@app.get("/predict")
def test_get():
    return {"message": "GET is working, but use POST!"}

@app.post("/predict")
def predict_department(request: GrievanceRequest):
    try:
        prediction = model.predict([request.statement])
        return {"department": prediction[0]}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
