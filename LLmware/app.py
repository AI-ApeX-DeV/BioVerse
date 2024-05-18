import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain.llms import HuggingFaceHub
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Chroma
from langchain.embeddings import SentenceTransformerEmbeddings

load_dotenv()

os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN")

app = Flask(__name__)

prompt_template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Only return the helpful answer below and nothing else.
Helpful answer:
"""

prompt = PromptTemplate(template=prompt_template, input_variables=["question", "context"])

embeddings = SentenceTransformerEmbeddings(model_name="llmware/industry-bert-insurance-v0.1")

load_vector_store = Chroma(persist_directory="stores/insurance_cosine", embedding_function=embeddings)

retriever = load_vector_store.as_retriever(search_kwargs={"k": 2})

repo_id = "llmware/bling-sheared-llama-1.3b-0.1"

llm = HuggingFaceHub(
    repo_id=repo_id, model_kwargs={"temperature": 0.3, "max_length": 500}
)

chain_type_kwargs = {"prompt": prompt}

def qa_chain():
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs=chain_type_kwargs,
        verbose=True
    )
    return qa

qa = qa_chain()

@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    text_query = data.get("question")
    
    if text_query:
        response = qa(text_query)
        return jsonify({"response": response}), 200
    else:
        return jsonify({"error": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)
