from ultralytics import YOLO
import sys
import json

def run_yolo(image_path):
    model = YOLO("path/to/your/model.pt")  # Load your YOLOv8 model
    results = model(image_path)
    return results.pandas().xyxy[0].to_json(orient="records")  # JSON output

if __name__ == "__main__":
    image_path = sys.argv[1]
    print(run_yolo(image_path))
