import matplotlib.pyplot as plt
import numpy as np
import plistlib
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

import pathlib
# we are using "Fruit-360" dataset from the getgo
dataset = "../recursos/datasets/1FA/fruits-360_original-size/fruits-360-original-size"
dataset_dir = pathlib.Path(dataset)
print(dataset)

image_count = len(list(dataset_dir.glob('Training/*.jpg')))

print(image_count)


# we work the dataset now, we set de batch size and the image size

batch_size = 64
img_height, img_width = 180, 180

# we already divided the dataset into train, val and test so we don't need to specify the subset and split parameters

# train dataset
train_ds = tf.keras.utils.image_dataset_from_directory(
    dataset_dir / "Training",
    seed=123,
    image_size=(img_height,img_width),
    batch_size=batch_size
)

# val dataset
val_ds = tf.keras.utils.image_dataset_from_directory(
    dataset_dir / "Validation",
    seed=123,
    image_size=(img_height,img_width),
    batch_size=batch_size
)

# test dataset
test_ds = tf.keras.utils.image_dataset_from_directory(
    dataset_dir / "Test",
    seed=123,
    image_size=(img_height,img_width),
    batch_size=batch_size
)

class_names = train_ds.class_names
print(class_names)


# dataset batch

images, labels = next(iter(train_ds))
type(images), images.shape, type(labels), labels.shape

plt.figure(figsize = (10, 10))
for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    plt.imshow(images[i].numpy().astype("uint8"))
    plt.title(class_names[labels[i]])
    plt.axis("off")

plt.show()

