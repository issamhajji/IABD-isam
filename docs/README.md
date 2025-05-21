


# Scan2Cook

![alt text](https://github.com/issamhajji/IABD-isam/blob/main/logotip.png)

#

‼️This repository contains a full-stack application with separate frontend and backend components.


## About 👀 

This project is a mobile application for android that sends a photo and returns the ingredients it has detected and generates a healthy recipe with clear and understandable step-by-step instructions.

## How it works? 🧠

The backend (Node and Python) are in charge of managing the data received from the user when interacting with the frontend (React Native + Expo).

**Node backend:** Takes care of all the user petitions and acts as a middleware between azure blob storage (to host the images) and mongodb (to save the url)

**Python backend:** Handles all the requests the user makes to the AI model by sending the photo.
takes that picture, converts it into an array, it does a BGR to RGB conversion and feeds the trained model. Takes care of the result of the prediction by converting it into a DataFrame and gets back the number of times the same ingredient appears in the dataframe. 

**React native + Expo frontend:** It's a basic but good and fluid interface that makes interacting with the model more easy to use for the end user. 

---

### 🌳 Directory tree 🌳

- `/back` - Main backend directory (Contains the server-side code and includes the use of swagger).
- `/App` - Frontend application (Contains the client-side code).
- `/model-1F/api.py` - Python backend (Flask API for AI object detection and classification).
---

## 📁 Node.js backend folder (`/Back`) 📁

#### 🟢 It's deployed!
The backend is deployed using `Railway` on the following url: [iabd-isam-production.up.railway.app](https://iabd-isam-production.up.railway.app)

#### API URLs descriptions:

| Method | Description | URL | Parameters |
|--------|-------------|-----|------------|
| GET    | Retrieves a list of items | `/api/v1/items/` | - |
| POST   | Creates a new item | `/api/v1/items/` | - |
| GET    | Retrieves an item by ID | `/api/v1/items/{itemId}` | `itemId` (path, string, required) |
| PATCH  | Updates an item | `/api/v1/items/{itemId}` | `itemId` (path, string, required) |
| DELETE | Deletes an item by ID | `/api/v1/items/{itemId}` | `itemId` (path, string, required) |
| GET    | Retrieves an item by username | `/api/v1/items/user/{username}` | `username` (path, string, required) |
| POST   | Logs in a user | `/api/v1/users/login` | `body`: { username, password } |
| GET    | Retrieves a list of users | `/api/v1/users/` | - |
| POST   | Creates a new user | `/api/v1/users/` | `body`: { fullName, username, email, password } |
| GET    | Retrieves a user by ID | `/api/v1/users/{userId}` | `userId` (path, string, required) |
| PATCH  | Updates a user | `/api/v1/users/{userId}` | `userId` (path), `fullname`, `username`, `email` |
| DELETE | Deletes a user by ID | `/api/v1/users/{userId}` | `userId` (path, string, required) |
| POST   | Returns a recipe based on ingredients | `/api/v1/openai/generate-recipe` | - |
| POST   | Uploads an image blob to Azure Blob Storage | `/api/v1/azure/azure-upload-url` | - |
| GET    | Retrieves a list of test entries | `/api/v1/test/` | `parameterName` (query, number) |

### Running the server

```bash
cd back
npm run start
```
The server will start on `http://0.0.0.0:3000`.

---
## 📁 Python backend folder (`/model-1F/api.py`) 📁

#### 🟢 It's deployed!
The Python backend is deployed using `Railway` on the following url: [lucky-ambition-production.up.railway.app](https://lucky-ambition-production.up.railway.app)

#### API URLs descriptions:

| Method | Description | URL | Parameters |
|--------|-------------|-----|------------|
| POST   | Sends the image to the model and returns a json | `/api/v1/ai/detect` | `body`: image file  |

### Features

- Accepts image uploads via POST to `/api/v1/ai/detect`.
- Uses a YOLO model to predict ingredients in the image.
- Returns detected items and their counts as JSON.


### Main Dependencies

- Flask
- Pillow
- NumPy
- OpenCV
- ultralytics

### Running the API

```bash
cd model-1F
pip install -r requirements.txt
flask --app api  run --host=0.0.0.0
```
The API will start on `http://0.0.0.0:5000`.

---

## 📁 React native frontend (`/App`) 📁

#### 🟢 It's built!
The React native frontend was build using Expo Go which generated an APK file for Android phones

### Main Components
- **Home:** Dashboard showing recent scans and user information
- **Camera:** Ingredient detection through device camera
- **Scan:** Review detected ingredients and generate recipes
- **Recipe:** View past generated recipes and ingredient details
- **Login/Register:** User authentication screens
- **Splash screen:** Loading splash screen

---

## 💬 Contact

For questions and support, open an issue or contact the repo owner.
