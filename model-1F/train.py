from ultralytics import YOLO
import torch

def main():
    # carreguem model
    model = YOLO('yolov8n.pt')

    # tuning
    # model.tune(data="coco8.yaml", epochs=30, iterations=300, optimizer="AdamW", imgsz=256)
    # model.to('GPU')
    # entrenament del model
    results = model.train(
        data='./recursos/datasets/1FA/data.yaml',
        augment=True,
        imgsz=256,
        epochs=10,
        batch=64,
        # degrees=0.45, 
        # scale=0.3, 
        perspective=0.1,
        warmup_epochs=3.0,
        # multi_scale=True,
        name='yolov8n-fopagacherv2',
        patience=10,
        optimizer="AdamW",
        device=0
    )

if __name__ == '__main__':
    # Required for Windows multiprocessing support
    import multiprocessing
    multiprocessing.freeze_support()
    main()

