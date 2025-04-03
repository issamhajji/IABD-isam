from ultralytics import YOLO
import torch

def main():
    # carreguem model
    model = YOLO('yolov8n.pt')

    # entrenament del model
    results = model.train(
        data='./recursos/datasets/1FA/1fa_v8.yaml',
        imgsz=640,
        epochs=10,
        batch=8,
        name='yolov8n-foodv3',
        device=0
    )

if __name__ == '__main__':
    # Required for Windows multiprocessing support
    import multiprocessing
    multiprocessing.freeze_support()
    main()

