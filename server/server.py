from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS  # Import CORS
from PIL import Image
import io

app = Flask(__name__)

CORS(app)

# Load the YOLOv8 model
model = YOLO("yolov8n.pt")

@app.route('/detect', methods=['POST'])
def detect():
    print("Entered function")
    
    # Check if 'image' key exists in the uploaded files
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400
    
    # Retrieve the uploaded file
    file = request.files['image']
    print("files : ", file)
    
    # Convert the file into a PIL image
    try:
        image = Image.open(io.BytesIO(file.read()))
    except Exception as e:
        return jsonify({"error": "Invalid image format", "details": str(e)}), 400

    # Run the YOLO model on the image
    results = model.predict(source=image, save=False, save_txt=False)

    # Extract detection results
    detections = [
        {
            "class": model.names[int(box.cls)],
            "confidence": float(box.conf),
            
        } for box in results[0].boxes
    ]

    filtered_detections = [d["class"] for d in detections if d["confidence"] > 0.7]
    return filtered_detections

if __name__ == '__main__':
    print("Inside name == main")
    app.run(debug=True, host="0.0.0.0", port=5000)
