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
model = YOLO("yolov8n.pt")

# predecimos los ingredientes en la imagen
results = model.predict(source="./recursos/fotos_ingredientes/2.webp", show=True)

cv2.waitKey(0)