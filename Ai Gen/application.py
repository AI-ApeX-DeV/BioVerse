from flask import Flask, request, send_file
from flask_cors import CORS
from src.logger import logging
from src.pipeline import Genrate
import cv2
import google.generativeai as genai
import requests
import io


app = Flask(__name__)
CORS(app)


@app.route("/imgen", methods=["POST"])
def makeimage():

    data = request.json
    img = Genrate.Gen()

    img.genimg(data["prompt"])
    print(data)

    logging.info("Image generated successfully!")

    import requests

    # Assuming `image` is already defined
    # Load the image file
    with open(
        "C:/Users/shrey/OneDrive/Desktop/EthMumbai/artifacts/image.jpg", "rb"
    ) as f:
        image_data = f.read()

    # Create FormData-like object
    files = {"file": ("filename.jpg", image_data)}  # Adding the filename here

    # Define headers (without Content-Type)
    headers = {
        "Authorization": "Bearer Your API Key",
    }

    # Make the request
    response = requests.post(
        "https://api.nft.storage/upload", files=files, headers=headers
    )
    # cid = response.text["value"]["cid"]
    # Print the response
    cid = response.json()["value"]["cid"]

    value = f"https://{cid}.ipfs.nftstorage.link/filename.jpg"

    return value


@app.route("/genmemerandom", methods=["POST"])
def genmeme():
    img = Genrate.Gen()
    value = img.genmeme()

    return value


@app.route("/uploadphoto", methods=["POST"])
def upload():
    import requests

    image = request.files["image"]
    image.save("C:/Users/shrey/OneDrive/Desktop/EthMumbai/artifacts/image1.jpg")

    API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
    headers = {"Authorization": "Bearer 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"}

    def query(filename):
        with open(filename, "rb") as f:
            data = f.read()
        response = requests.post(API_URL, headers=headers, data=data)
        return response.json()

    output = query("C:/Users/shrey/OneDrive/Desktop/EthMumbai/artifacts/image1.jpg")
    print(output[0]["generated_text"])

    import google.generativeai as genai

    genai.configure(api_key="Your API Key")
    model = genai.GenerativeModel("gemini-pro")
    # Here is my description in 5-10 words only write hinglish texts all text in english letter on
    response = model.generate_content(
        f"You are a Indian meme expert, you can generate short sarcastic/ humor full meme captions from descriptions. Here is my description {output[0]['generated_text']}  write meme in 7-10 words only",
    )
    print(response.text)

    import cv2

    # Load the image
    image = cv2.imread("C:/Users/shrey/OneDrive/Desktop/EthMumbai/artifacts/image1.jpg")

    # Define text to be drawn
    text = response.text

    # Calculate font scale based on image width and desired maximum text height
    max_text_height = 0.2 * image.shape[0]  # Adjust the value as needed
    font_scale = 1
    while True:
        # Choose font
        font = cv2.FONT_HERSHEY_SIMPLEX

        # Determine text size
        text_size, _ = cv2.getTextSize(text, font, font_scale, thickness=2)

        # Break the loop if the text height is within the desired maximum height
        if text_size[1] <= max_text_height:
            break

        # Reduce font scale if text height exceeds the maximum
        font_scale -= 0.05

    # Calculate text position (centered horizontally and at the top)
    text_x = (image.shape[1] - text_size[0]) // 2
    text_y = text_size[1] + 50  # Adjust the value to position the text

    # Add drop shadow effect (black outline)
    shadow_offset = 2

    # Split text into lines
    words = text.split()
    lines = [""]
    current_line_index = 0
    for word in words:
        # Check if adding this word would exceed 4 words per line
        if len(lines[current_line_index].split()) < 4:
            lines[current_line_index] += word + " "
        else:
            lines.append(word + " ")
            current_line_index += 1

    # Add the title lines to the image
    for i, line in enumerate(lines):
        # Determine text size for the current line
        text_size, _ = cv2.getTextSize(line, font, font_scale, thickness=2)

        # Calculate text position for the current line (centered horizontally)
        text_x = (image.shape[1] - text_size[0]) // 2
        text_y += text_size[1] + 10  # Adjust the value to set line spacing

        # Add drop shadow effect (black outline)
        cv2.putText(
            image,
            line,
            (text_x + shadow_offset, text_y + shadow_offset),
            font,
            font_scale,
            (0, 0, 0),  # Black color for drop shadow
            thickness=2,
            lineType=cv2.LINE_AA,
        )

        # Add the text
        cv2.putText(
            image,
            line,
            (text_x, text_y),
            font,
            font_scale,
            (255, 255, 255),  # White color for the text
            thickness=2,
            lineType=cv2.LINE_AA,
        )

    # Save the image with the text
    cv2.imwrite("output.jpg", image)

    import requests

    # Assuming `image` is already defined
    # Load the image file
    with open("output.jpg", "rb") as f:
        image_data = f.read()

    # Create FormData-like object
    files = {"file": ("filename.jpg", image_data)}  # Adding the filename here

    # Define headers (without Content-Type)
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRCOWM5Q0UwQmE3NENiRjA4QkJlZjIwNDMzZEUwYjczNzUxNjI4RTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODUwNDQ1NzM3MywibmFtZSI6IkZ1bmRFVEgifQ.JxTH4iRtScscfmb9mvZqhSqF9MKs2b0JJS2yof7hzF4",
    }

    # Make the request
    response = requests.post(
        "https://api.nft.storage/upload", files=files, headers=headers
    )
    # cid = response.text["value"]["cid"]
    # Print the response
    cid = response.json()["value"]["cid"]

    value = f"https://{cid}.ipfs.nftstorage.link/filename.jpg"

    return value


@app.route("/call", methods=["POST"])
def callu(number):
    headers = {
        "Authorization": "sk-49l0jhdx24371l57ronsc74no6o2py5ghoa6wkczwcu7xd6z6kd99lwyk3nn6hvx69"
    }

    # Data
    data = {
        "phone_number": "+91" + "9969109851",
        "task": """"AI:
            "Hello, welcome to Dnets's decentralized social network app. I'm ConsultAI, your virtual consultant, here to assist you with any questions or information you may need regarding our platform's features. How can I help you today?"

            User:

            "I'm curious about how peer-to-peer transfers work on this app."
            "I want to start a crowdfunding campaign. Can you guide me through the process?"
            "Are there any fees associated with P2P transfers or crowdfunding?"
            AI:
            "Absolutely! I'd be delighted to assist you with understanding our app's features. Could you please provide me with more details about your interests or specific questions regarding P2P transfers or crowdfunding campaigns?"

            P2P Transfer:
            "To initiate a peer-to-peer transfer, you can navigate to the 'Wallet' section of our app. From there, you'll be able to select the option to send funds to another user by entering their username or scanning their QR code. It's important to note that our platform utilizes blockchain technology to facilitate secure and transparent transactions between users. There is a small fee associated with P2P transfers, which is 0.02% of the transfer amount. This fee helps cover operational costs and ensures the integrity of the blockchain network."

            Crowdfunding Campaign:
            "If you're interested in starting a crowdfunding campaign, you can navigate to the 'Campaigns' section of our app. From there, you'll have the option to create a new campaign, where you can set your funding goal, provide details about your project or cause, and customize your campaign page with images and videos. Users within our community can then contribute to your campaign, and all transactions are recorded on the blockchain for transparency and accountability."

            Fees and Charges:
            "While there is a fee associated with P2P transfers, there are no fees for creating or contributing to crowdfunding campaigns. We believe in empowering users to support causes and projects they believe in without additional charges. Our platform strives to maintain transparency regarding fees, ensuring that users can make informed decisions about their transactions and contributions."

            User:
            "I'm interested in starting a crowdfunding campaign for my project."
            "Thanks for the information. I'll explore the P2P transfer feature further."
            "Could you clarify if there are any restrictions on who can participate in crowdfunding campaigns?"

            AI:
            "Fantastic! To get started with your crowdfunding campaign, you can navigate to the 'Campaigns' section and follow the prompts to create your campaign page. If you have any specific questions or need assistance along the way, feel free to ask, and I'll be here to help you."

            **Regarding participation in crowdfunding campaigns, our platform typically allows all users to participate, provided they meet certain criteria, such as compliance with our community guidelines and any legal requirements applicable to crowdfunding activities. However, it's always a good idea to review the specific terms and conditions associated with each campaign to ensure eligibility and compliance."

            User:
            "Thank you for your assistance. I'll start setting up my campaign now."
            "I appreciate your help. I'll reach out if I have any further questions."
            "I'm impressed with the features. I'll definitely recommend this app to others."

            AI:
            "Great to hear! If you have any further questions or need assistance in the future, don't hesitate to reach out. We're here to support you every step of the way. Thank you for choosing Dsocial's decentralized social network app, leveraging blockchain technology for secure and transparent transactions. Have a wonderful day!
            User: "How secure are P2P transfers on this app? Is my financial information safe?"
            AI: "Security is a top priority for us. Our platform utilizes advanced encryption and security measures to ensure the safety of your financial information during P2P transfers. Additionally, we adhere to strict privacy policies to protect your personal data."

            2. Customer Support:
            User: "What should I do if I encounter an issue while using the app?"
            AI: "If you encounter any issues or have questions while using our app, you can reach out to our dedicated customer support team for assistance. We offer various support channels, including live chat, email, and a help center, to ensure that your concerns are addressed promptly."

            3. Integration with External Wallets:
            User: "Can I link my external cryptocurrency wallet to this app for P2P transfers?"
            AI: "At the moment, our platform supports internal wallet transactions for P2P transfers. However, we're continuously exploring options for integrating external wallets to provide more flexibility for our users. Stay tuned for any updates on this feature!"

            4. Rewards and Loyalty Programs:
            User: "Does the app offer any rewards or loyalty programs for frequent users?"
            AI: "Yes, we value our users' loyalty and engagement. We have plans to introduce rewards and loyalty programs in the near future, offering incentives for active participation and contributions within our community. Keep an eye out for announcements about these programs!"

            5. Future Development Roadmap:
            User: "What new features or updates can we expect from the app in the future?"
            AI: "We're committed to continuous improvement and innovation. Our development team is working on several exciting features and updates, including enhanced social networking capabilities, expanded payment options, and integration with decentralized finance (DeFi) protocols. We'll keep our users informed about upcoming releases and developments.""",
        "voice_id": 1,
        "reduce_latency": True,
        "request_data": {},
        "voice_settings": {"speed": "0.8"},
        "interruption_threshold": 0,
        "start_time": None,
        "transfer_phone_number": None,
        "answered_by_enabled": False,
        "from": None,
        "first_sentence": None,
        "record": True,
        "max_duration": 2,
        "model": "enhanced",
        "language": "ENG",
    }

    # API request
    requests.post("https://api.bland.ai/call", json=data, headers=headers)

    return "0"


if __name__ == "__main__":
    app.run(host="0.0.0.0")
