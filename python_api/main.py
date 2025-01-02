from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Model = tf.keras.models.load_model("C:/Users/1650/Documents/TubesPCD/deteksi_penyakit_tanaman/python_models/plant_resnet50v2new.keras")
ClassNames = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy",
]

@app.get("/")
async def ping():
    return {"message": "test"}

def read_file_as_image(data) -> np.ndarray:
    try:
        image = Image.open(BytesIO(data))
        # Convert to RGB if image is in a different mode
        if image.mode != "RGB":
            image = image.convert("RGB")
        # Resize image to 224x224 (common input size for many models)
        image = image.resize((224, 224))
        # Convert to numpy array
        image_array = np.array(image)
        return image_array
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        raise ValueError("Failed to process image")

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            print(f"Invalid file type: {file.content_type}")
            raise ValueError("File must be an image")
            
        print(f"Processing file: {file.filename}, size: {file.size} bytes")
        image_bytes = await file.read()
        print(f"Read {len(image_bytes)} bytes from file")
        
        image = read_file_as_image(image_bytes)
        print(f"Image shape after processing: {image.shape}")
        
        img_batch = np.expand_dims(image, 0)
        print(f"Batch shape: {img_batch.shape}")
        
        try:
            print("Starting model prediction...")
            predictions = Model.predict(img_batch)
            score = tf.nn.softmax(predictions[0])
            print(f"Model predictions shape: {predictions.shape}")
            print(f"Model predictions: {predictions[0]}")
            print(f"Model predictions score: {score}")
            
            predicted_class = ClassNames[np.argmax(score)]
            confidence = float(100 * np.max(score))
            
            print(f"Predicted class: {predicted_class}, confidence: {confidence}")
            
            return {
                "class": predicted_class,
                "confidence": confidence
            }
        except Exception as e:
            print(f"Model prediction error: {str(e)}")
            print(f"Model prediction error type: {type(e)}")
            raise ValueError(f"Failed to make prediction: {str(e)}")
            
    except Exception as e:
        print(f"Prediction endpoint error: {str(e)}")
        print(f"Error type: {type(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)