from ultralytics import YOLO
import torch

def main():
    # carreguem model
    model = YOLO('yolov8m.pt')

    # entrenament del model
    results = model.train(
        data='./recursos/datasets/1FA/aliments-v8.yaml',
        augment=True,
        imgsz=224,
        epochs=100,
        batch=32,
        degrees=0.45, 
        scale=0.3, 
        perspective=0.1,
        dropout=0.6,
        multi_scale=True,
        name='yolov8-alimentsv1',
        device=0
    )

if __name__ == '__main__':
    # Required for Windows multiprocessing support
    import multiprocessing
    multiprocessing.freeze_support()
    main()

