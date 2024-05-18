from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer

data_files = {"train": "data.csv", "test": "data2.csv"}
datasets = load_dataset('csv', data_files=data_files)

tokenizer = AutoTokenizer.from_pretrained("llmware/industry-bert-insurance-v0.1")
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)
tokenized_datasets = datasets.map(tokenize_function, batched=True)


model = AutoModelForSequenceClassification.from_pretrained("llmware/industry-bert-insurance-v0.1", num_labels=2)

training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

trainer.train()

results = trainer.evaluate()
print(results)

model.save_pretrained("./model")
tokenizer.save_pretrained("./tokenizer")
