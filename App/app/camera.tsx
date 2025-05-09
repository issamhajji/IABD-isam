import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import Indicator from "@/components/Indicator";

export default function App() {
    const [facing, setFacing ] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if(!permission) {
        // Camera permission loading
        return <View />
    }

    if(!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}> We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        );
    }

    // function toggleCameraFacing() {
    //     setFacing(current => (current === 'back' ? 'front' : 'back'));
    // }

    async function takePicture() {
        if(cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync({ base64: true});

            console.log('picture taken');

            //redimensiona imatge
            const resizedImage = await ImageManipulator.manipulateAsync(
                uri,
                [{resize: {width: 225}}],
                {compress: 0.8, format: ImageManipulator.SaveFormat.JPEG}
            );
            
            console.log('picture resized')
            //send
            sendPicture(resizedImage);
        }
    }

    async function sendPicture(image) {
        try{
            const formData = new FormData();
            formData.append('image', {
                uri: image.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            // Envia la imagen al gateway
            const response = await fetch('http://10.98.254.60:5000/api/v1/ai/detect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            console.log('picture sent to api');
            // Recibimos las predicciones de la imagen
            const result = await response.json();
            console.log('result received');
            console.log(result.items)
            if(!result.items){
                console.log(result.items)
                alert("Could not identify the products in the image. Please try again!")
            }else{
                let products = ''
                for (let i = 0; i < result.items.length; i++) {
                    products += `item: ${result.items[i].item}, ${result.items[i].count} Unidades\n`;
                }
                alert(products)
            }
            console.log(result.items);
        } catch (error) {
            console.error('Error sending image to gateway:', error);
        }
    }



    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} animateShutter>
                <Indicator color="greenpoint" status="Testing..."></Indicator>
                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip camera</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Button style={styles.text}>Take picture</Button>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.cameraButton}
                        accessibilityLabel="Take a picture">
                            <View style={styles.cameraButtonBorder} />
                    </TouchableOpacity>
                    
                </View>
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      margin: 64,
    },
    cameraButton: {
      top: 0,
      flex: 0,
      alignSelf: 'flex-end',
      backgroundColor: 'white',
      borderRadius: 100,
      width: 100,
      height: 100,
    },
    cameraButtonBorder: {
        position: 'absolute',
        top: 5,
        left: 5,
        right: 5,
        bottom: 5,
        borderWidth: 4,
        borderRadius: 100,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });