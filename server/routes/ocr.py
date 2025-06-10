from fastapi import APIRouter, UploadFile, File
from PIL import Image
from io import BytesIO
import pytesseract
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/api/ocr-upload")
async def ocr_and_generate_answer(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(BytesIO(image_bytes))

    # Step 1: Extract text from image
    extracted_text = pytesseract.image_to_string(image)

    # Step 2: Generate answers using OpenAI
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You're a helpful tutor. Answer the following questions clearly."},
            {"role": "user", "content": extracted_text}
        ]
    )

    answer = response.choices[0].message.content
    return {
        "extracted_text": extracted_text,
        "answer": answer
    }
