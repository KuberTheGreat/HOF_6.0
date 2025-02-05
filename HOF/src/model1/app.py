import torch
import pandas as pd
import numpy as np
from transformers import XLNetTokenizer, XLNetForSequenceClassification, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
from datasets import Dataset
from sklearn.preprocessing import LabelEncoder


df = pd.read_csv("grievances_dataset.csv")  

print(df.head())

label_encoder = LabelEncoder()
df["Department"] = label_encoder.fit_transform(df["Department"])  

train_texts, val_texts, train_labels, val_labels = train_test_split(
    df["Grievance Text"], df["Department"], test_size=0.2, random_state=42
)

train_data = Dataset.from_dict({"Grievance Text": train_texts.tolist(), "labels": train_labels.tolist()})
val_data = Dataset.from_dict({"Grievance Text": val_texts.tolist(), "labels": val_labels.tolist()})

tokenizer = XLNetTokenizer.from_pretrained("xlnet-base-cased")

def tokenize_function(examples):
    tokens = tokenizer(
        examples["Grievance Text"], padding="max_length", truncation=True, max_length=128
    )
    tokens["labels"] = examples["labels"]  
    return tokens

train_dataset = train_data.map(tokenize_function, batched=True)
val_dataset = val_data.map(tokenize_function, batched=True)

train_dataset = train_dataset.remove_columns(["Grievance Text"])
val_dataset = val_dataset.remove_columns(["Grievance Text"])

train_dataset.set_format("torch")
val_dataset.set_format("torch")

model = XLNetForSequenceClassification.from_pretrained("xlnet-base-cased", num_labels=len(label_encoder.classes_))

class CustomTrainer(Trainer):
    def compute_loss(self, model, inputs, return_outputs=False, **kwargs):  
        labels = inputs.pop("labels")  
        outputs = model(**inputs)  
        logits = outputs.logits  
        loss = torch.nn.functional.cross_entropy(logits, labels)  
        return (loss, outputs) if return_outputs else loss

training_args = TrainingArguments(
    output_dir="./xlnet_results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    num_train_epochs=3,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    logging_dir="./logs",
    logging_steps=10,
    load_best_model_at_end=True
)

trainer = CustomTrainer(  
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=tokenizer,
)

trainer.train()

def predict_department(text):
    tokens = tokenizer(text, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    outputs = model(**tokens)
    predicted_label = torch.argmax(outputs.logits).item()
    return label_encoder.inverse_transform([predicted_label])[0]  

test_grievances = [
    "There is no water in my area since morning",
    "Potholes on main road causing accidents",
    "No electricity for past 3 hours",
    "Overflowing garbage bins in market area"
]

for grievance in test_grievances:
    print(f"Grievance: {grievance} -> Department: {predict_department(grievance)}")
