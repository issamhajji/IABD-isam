from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import matplotlib as plt
import random
import os
import cv2
import shutil
import tqdm
import glob
from ultralytics import YOLO
import json


app = Flask(__name__)

@app.route('/api/v1/ai/detect', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file"}), 400

    try:

        image_file = request.files['image']
        image = Image.open(image_file)
        image = np.array(image)

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # iniciamos el modelo entrenado
        model = YOLO("./runs/detect/yolov8n-foodv33/weights/best.pt")

        # predecimos los ingredientes en la imagen
        results = model.predict(source=image_rgb, conf=0.45)

        
        # convertimos el resultado en un df
        for result in results:
            df = result.to_df()

        print(df.head())
        # cv2.waitKey(0)
        # enviamos json con resultados
        # for result in results:
        #     json = result.to_json()


        # estadisticas
        total_obj = df.name.value_counts()

        print(total_obj)

        jsonstring = '{}'

        response = json.loads(jsonstring)
        response['items'] = []
        for obj, count in total_obj.items():
            
            response['items'].append({'item': obj, 'count': int(count)})
            print(f"I detected {count} {obj}(s)")

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)
    # app.run(debug=True)