import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import plistlib
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Dropout
from tqdm import tqdm
from sklearn.model_selection import train_test_split
import pathlib
import torch


print(torch.cuda.is_available())


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
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

# df = df.iloc[:5600]

def preprocess(x, y):
    # Apply any transformations if needed
    return x, y

def main():
    SIZE = 180
    X_dataset = []

    for i in tqdm(range(df.shape[0])):
        img_path = os.path.join(dataset_dir, df['filename'][i])

        img = image.load_img(img_path, target_size=(SIZE,SIZE))
        img = image.img_to_array(img)
        img = img/255
        X_dataset.append(img)
    
    X = np.array(X_dataset)
    
    print("result:")
    print(df['filename'][200])

    # y = np.array(df.drop(['filename'], axis=1))
    y = df.drop(['filename'], axis=1).values

    X_train, X_test, y_train, y_test = train_test_split(X,y, shuffle=True, random_state=42, test_size=0.2)
    
    print("X_train shape:", X_train.shape)
    
    print("y_train shape:", y_train.shape)  
# we work the dataset now, we set de batch size and the image size

    batch_size = 64
    # img_height, img_width = 180, 180

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

    train_dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train))
    test_dataset = tf.data.Dataset.from_tensor_slices((X_test, y_test))

    train_dataset = (
        train_dataset
        .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
        .shuffle(buffer_size=1000)
        .batch(64)
        .prefetch(tf.data.AUTOTUNE)
    )

    test_dataset = (
        test_dataset
        .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
        .batch(64)
        .prefetch(tf.data.AUTOTUNE)
    )


#### LET'S PREDICT

# image preprocessing
    img_url = image.load_img("../recursos/fotos_ingredientes/Image_8.jpg", target_size=(SIZE,SIZE))
    img_arr = image.img_to_array(img_url)
    img_arr = img_arr/255
    img_arr = np.expand_dims(img_arr,axis=0)


# REGULARIZATION

    data_augmentation = Sequential(
    [
        layers.Input(shape = (SIZE, SIZE, 3)),
        layers.Rescaling(1./255),
        layers.RandomFlip("horizontal"),
        layers.RandomFlip("vertical"),
        layers.RandomRotation(0.2),
        layers.RandomContrast(0.1),
        layers.RandomZoom(0.2),
    ]
    )

    model_reg = Sequential([
        data_augmentation,
        layers.Conv2D(26, 3, padding = 'same', activation = 'relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(12, 3, padding = 'same', activation = 'relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(8, 3, padding = 'same', activation = 'relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(4, 3, padding = 'same', activation = 'relu'),
        layers.MaxPooling2D(),
        layers.Flatten(),
        layers.Dense(26, activation = 'sigmoid'),
        layers.Dense(len(class_names), name='output')
    ])

    # PRE TRAINED MODEL
    # pre_model = tf.keras.applications.efficientnet.EfficientNetB0(
    #     input_shape = (SIZE, SIZE, 3),
    #     include_top = False,
    #     weights = 'imagenet',
    #     pooling = 'max'
    # )

    # pre_model.trainable = False

    # inputs = pre_model.input
    # x = data_augmentation(inputs)

    # x = Dense(128, activation='relu')(pre_model.output)
    # x = Dense(256, activation='relu')(x)

    # outputs = Dense(26, activation='sigmoid')(x)

    # model = Model(inputs=inputs, outputs=outputs)

    # model.compile(
    #     optimizer = tf.keras.optimizers.Adam(0.000333),
    #     loss=tf.keras.losses.BinaryCrossentropy(),
    #     metrics=['accuracy']
    # )


    model_reg.compile(
        optimizer = tf.keras.optimizers.Adam(0.001),
        loss=tf.keras.losses.BinaryCrossentropy(from_logits=False),
        metrics=['accuracy']
    )

    model_reg.summary()

    epochs=20
    regularized_history = model_reg.fit(
        X_train, 
        y_train, 
        validation_data = (X_test, y_test),
        epochs = epochs,
        batch_size=batch_size
    )

    ### history = regularized_history.history
    fig, axs = plt.subplots(1, 2, figsize=(8, 8))
    # train/validation loss
    axs[0].plot(range(epochs), regularized_history.history['loss'], label = 'Training Loss')
    axs[0].plot(range(epochs), regularized_history.history['val_loss'], label = 'Validation Loss')
    axs[0].legend(loc = 'upper right')
    axs[0].set_title('Training and Validation Loss')
    # train/validation accuracy
    axs[1].plot(range(epochs), regularized_history.history['accuracy'], label = 'Training Accuracy')
    axs[1].plot(range(epochs), regularized_history.history['val_accuracy'], label = 'Validation Accuracy')
    axs[1].legend(loc = 'lower right')
    axs[1].set_title('Training and Validation Accuracy')
    #
    plt.tight_layout()

    pred1 = model_reg.predict(img_arr)[0]

    threshold=0.05
    top_preds1 = [(class_names[i], pred1[i]) for i in range(len(pred1)) if pred1[i] > threshold]

# Show image
    plt.figure(figsize=(6,6))
    plt.imshow(img_url)
    plt.axis('off')

# Add predicted labels
    label_text = "\n".join([f"{cls}: {score:.2f}" for cls, score in top_preds1])
    plt.gcf().text(
            0.02, 0.98, label_text,
            fontsize=12, va='top', ha='left',
            bbox=dict(facecolor='white', alpha=0.7)
        )
    plt.title("Predicted Classes")
    plt.show()

if __name__ == '__main__':
    # Required for Windows multiprocessing support
    import multiprocessing
    multiprocessing.freeze_support()
    main()