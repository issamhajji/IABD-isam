import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import plistlib
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Sequential
from tqdm import tqdm
from sklearn.model_selection import train_test_split
import pathlib


# we are using "Veggies" dataset from the getgo
dataset = "../recursos/datasets/1FA/veggies-keras/train/"
dataset_dir = pathlib.Path(dataset)
print(dataset)

image_count = len(list(dataset_dir.glob('*.jpg')))

print(image_count)


# we import the classnames

df = pd.read_csv("../recursos/datasets/1FA/veggies-keras/_classes.csv")
print(df.head())
print(df.columns)

class_names = df.columns[1:].str.strip().tolist()

df = df.iloc[:2000]


SIZE = 200
X_dataset = []
for i in tqdm(range(df.shape[0])):
    img = image.load_img(dataset +df['filename'][i], target_size=(SIZE,SIZE,3))
    img = image.img_to_array(img)
    img = img/255
    X_dataset.append(img)


X = np.array(X_dataset)

print("result:")
print(df['filename'][200])


y = np.array(df.drop(['filename'], axis=1))


X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=42, test_size=0.2)

# we work the dataset now, we set de batch size and the image size

batch_size = 64
img_height, img_width = 180, 180

# we already divided the dataset into train, val and test so we don't need to specify the subset and split parameters

# train dataset
# train_ds = tf.keras.utils.image_dataset_from_directory(
#     dataset_dir,
#     validation_split = 0.2,
#     subset = "training",
#     seed=123,
#     image_size=(img_height,img_width),
#     batch_size=batch_size
# )

# # val dataset
# val_ds = tf.keras.utils.image_dataset_from_directory(
#     dataset_dir,
#     validation_split = 0.2,
#     subset = "validation",
#     seed=123,
#     image_size=(img_height,img_width),
#     batch_size=batch_size
# )

# class_names = train_ds.class_names
# print(class_names)


model = Sequential([
  layers.Input(shape = (SIZE, SIZE, 3)),
  # normalization here
  layers.Rescaling(1./255),
  layers.Conv2D(8, 3, padding = 'same', activation = 'relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(16, 3, padding = 'same', activation = 'relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(8, 3, padding = 'same', activation = 'relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(4, 3, padding = 'same', activation = 'relu'),
  layers.MaxPooling2D(),
  layers.Flatten(),
  layers.Dense(64, activation = 'relu'),
  layers.Dense(len(class_names), activation='sigmoid')
])

model.compile(
    optimizer = tf.keras.optimizers.Adam(0.001),
    loss=tf.keras.losses.BinaryCrossentropy(from_logits=False),
    metrics=['accuracy']
)

model.summary()

epochs=10
history = model.fit(
  X_train, 
  y_train,
  validation_data = (X_test, y_test),
  epochs = epochs,
  batch_size=batch_size
)


history = history.history
fig, axs = plt.subplots(1, 2, figsize=(8, 8))
# train/validation loss
axs[0].plot(range(epochs), history['loss'], label = 'Training Loss')
axs[0].plot(range(epochs), history['val_loss'], label = 'Validation Loss')
axs[0].legend(loc = 'upper right')
axs[0].set_title('Training and Validation Loss')
# train/validation accuracy
axs[1].plot(range(epochs), history['accuracy'], label = 'Training Accuracy')
axs[1].plot(range(epochs), history['val_accuracy'], label = 'Validation Accuracy')
axs[1].legend(loc = 'lower right')
axs[1].set_title('Training and Validation Accuracy')
#
plt.tight_layout()
plt.show()


#### LET'S PREDICT

# image preprocessing
img_url = image.load_img("../recursos/fotos_ingredientes/veggie-tops-1.jpg", target_size=(SIZE,SIZE))
img_arr = image.img_to_array(img_url)
img_arr = img_arr/255
img_arr = np.expand_dims(img_arr,axis=0)

pred = model.predict(img_arr)[0]


# results

# for i, p in enumerate(pred):
#     print(f"{class_names[i]}: {p:.2f}")

threshold=0.00
top_preds = [(class_names[i], pred[i]) for i in range(len(pred)) if pred[i] > threshold]

# Show image
plt.figure(figsize=(6,6))
plt.imshow(img_url)
plt.axis('off')

# Add predicted labels
label_text = "\n".join([f"{cls}: {score:.2f}" for cls, score in top_preds])
plt.gcf().text(
        0.02, 0.98, label_text,
        fontsize=12, va='top', ha='left',
        bbox=dict(facecolor='white', alpha=0.7)
    )
plt.title("Predicted Classes")
plt.show()
