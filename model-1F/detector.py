import numpy as numpy
import matplotlib as plt
import random
import os
import cv2
import shutil
import tqdm
import glob
from ultralytics import YOLO

# iniciamos el modelo entrenado
model = YOLO("./runs/detect/yolov8n-foodv33/weights/best.pt")

# predecimos los ingredientes en la imagen
results = model.predict(source="./recursos/fotos_ingredientes/veggie-tops.jpg", show=True, conf=0.05)

print(results)

cv2.waitKey(0)