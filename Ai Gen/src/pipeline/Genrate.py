import requests
import io
from PIL import Image
import requests
import random


class Gen:
    def __init__(self):
        pass

    def genimg(self, promt):
        try:
            import requests
            import io

            print("Generating image...")

            API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
            headers = {"Authorization": "Bearer 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"}

            def query(payload):
                response = requests.post(API_URL, headers=headers, json=payload)
                return response.content

            image_bytes = query(
                {
                    "inputs": promt,
                }
            )
            # You can access the image with PIL.Image for example
            import io
            from PIL import Image

            image = Image.open(io.BytesIO(image_bytes))

            # Specify the file path to save the image
            file_path = "C:/Users/shrey/OneDrive/Desktop/EthMumbai/artifacts/image.jpg"

            # Save the image to the specified file path
            image.save(file_path)

            return file_path

        except Exception as e:
            # logging.error(e)
            print(e)

            return "-1"

    def genmeme(self):
        # API endpoint
        url = "https://api.memegen.link/images"

        # Send a GET request to the API
        response = requests.get(url)

        # Parse the JSON response
        data = response.json()

        # Get the list of meme templates
        memes = data

        # Select a random meme
        random_meme = random.choice(memes)

        # Get user input for the meme text
        meme_text = "hackathon project"

        # Replace spaces with underscores
        meme_text = meme_text.replace(" ", "_")

        # Generate the meme URL
        meme_url = f"https://api.memegen.link/images/{random_meme}/{meme_text}.png"

        value = meme_url.replace("https://api.memegen.link/images/{'url': ", "")
        value = value.split(",")
        print(value[0])

        return value[0]


if __name__ == "__main__":
    gen = Gen()
    gen.genimg("rivers")  # Example prompt
