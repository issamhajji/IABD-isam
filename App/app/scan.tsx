import { View, Alert, ScrollView, Text, Pressable, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { parse } from '@babel/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Markdown from 'react-native-markdown-display';

export default function Scan() {
    const router = useRouter();
    const [capturedImage, setCapturedImage] = useState(null);
    const [parsedItems, setParsedItems] = useState([]);
    const { items, imageUri } = useLocalSearchParams();
    const [counts, setCounts] = useState([]);
    const [healthyRecipe, setHealthyRecipe] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [user, setUser] = useState({});
    const [tokens, setTokens] = useState('');


    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');
        setTokens(token);
        const userLoginData = await AsyncStorage.getItem('userData');
        if (!token) {
            Alert.alert('Error', 'Inicia session primero!');
            return;
        }
        setUser(userLoginData ? JSON.parse(userLoginData) : null);
    }

    const uploadImage = async () => {
        const token = await AsyncStorage.getItem('token');
        if(!capturedImage){
            return null;
        }
        try {
            const backUrlUpload = await fetch('https://iabd-isam-production.up.railway.app/api/v1/azure/azure-upload-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fileName: capturedImage.split('/').pop()
                }),
            })

            const {uploadUrl, imageUrl } = await backUrlUpload.json();
            
            // puja el fitxe al azure blob storage
            const response = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'x-ms-blob-type': 'BlockBlob',
                    'Content-Type': 'image/jpeg',
                },
                body: await fetch(capturedImage).then(res => res.blob()),
            });

            if (!response.ok) {
                return null;
            }
            return imageUrl;
            
        } catch (error) {
            console.error('Error:', error);
            return null;}
    }

    const getRecipeOpenAi = async (items) => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://iabd-isam-production.up.railway.app/api/v1/openai/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                items: items.map(item => item.item).join(', ')
            })
        });

        const data = await response.json();
        return data.recipe;
        
    }

    const handleSave = async () => {
        try {
            const imageUrl = await uploadImage();
            console.log('Image URL:', imageUrl);


            const itemData = {
                username: user.username,
                items: parsedItems,
                recipe: healthyRecipe,
                picture: imageUrl // Use the uploaded image URL
            };
    

            const response = await fetch('https://iabd-isam-production.up.railway.app/api/v1/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens}`,
                },
                body: JSON.stringify(itemData)
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('✅ Scan saved correctly!');
                router.back();
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // function listItems() {
    //     for (let i = 0; i < items.length; i++) {
    //         <View key={items[i].item} style={styles.listItem}>
    //             <View style={styles.itemNameContainer}>
    //                 <Text>{items[i].item}</Text>
    //             </View>
    //             <View style={styles.unitsBox} />
    //             <Text>{items[i].count}</Text>
    //         </View>
    //         // products += `item: ${result.items[i].item}, ${result.items[i].count} Unidades\n`;
    //     };
    // };

    const genRecipe = async () => {
        try{
            setIsGenerating(true); 
            const recipe = await getRecipeOpenAi(parsedItems);
            if (recipe) {
                console.log('Recipe:', recipe);
                setIsGenerating(false); 
                setHealthyRecipe(recipe);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUser();
        if (items) {
          try {
            const parsed = JSON.parse(items);
            setParsedItems(parsed);
          } catch (error) {
            console.error("Failed to parse items:", error);
          }
        }
    
        if (imageUri) {
          setCapturedImage(imageUri);
        }
      }, [items, imageUri]);

    // funcion para guardar el numero de unidades de cada item ddetectado
    const handleCountChange = (index, value) => {
        const updatedItems = [...parsedItems];
        updatedItems[index] = {
            ...updatedItems[index],
            count: value,
        };
        setParsedItems(updatedItems);
    }

    const listItems = () => {
        return parsedItems.map((item, index) => ( 
            <View key={index} style={styles.listItem}>
                <View>
                    <Text>{item.item}</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleCountChange(index, value)}
                        value={String(item.count)}
                        placeholder={String(item.count)}
                        keyboardType="numeric"
                    />
                    {/* <Text>{item.count}</Text> */}
                </View>
            </View>
        ));
    };

    return (
        
        <View style={styles.container}>
            <ScrollView>
            {/* Imagen */}
            <View style={styles.imageContainer}>
                {capturedImage ? (
                    <Image source={{ uri: capturedImage }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage} />
                )}
            </View>

            {/* Lista */}
            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>List</Text>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Items</Text>
                    <Text style={styles.listHeaderText}>Units</Text>
                </View>
                {/* {items.map(item => (
                    <View key={item.name} style={styles.listItem}>
                        <View style={styles.itemNameContainer}>
                            <View style={styles.itemBar} />
                        </View>
                        <View style={styles.unitsBox} />
                    </View>
                ))} */}
                { listItems() }
            </View>
            {/* recetas */}
            <TouchableOpacity 
                style={styles.generateButton}
                onPress={genRecipe}
                disabled={isGenerating}>
                <Text style={styles.generateButtonText}>
                    {isGenerating ? 'Generating...' : 'Give me a healthy recipe'}
                </Text>
            </TouchableOpacity>
            <View style={styles.receiptSection}>
                <Text style={styles.sectionTitle}>Recipe</Text>
                <View style={styles.receipt}>
                    <Markdown>{healthyRecipe || 'Click on the button to get a recipe'}</Markdown>
                    {/* <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '60%' }]} />
                    <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '80%' }]} />
                    <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '70%' }]} /> */}
                </View>
            </View>

            </ScrollView>

            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </Pressable>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    imageContainer: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 20,
        marginLeft: 12,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e0e0e0',
    },
    listSection: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    listHeaderText: {
        fontSize: 16,
        fontWeight: '500',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemNameContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemBar: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    unitsBox: {
        width: 40,
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    receiptSection: {
        padding: 15,
        flex: 1,
    },
    receipt: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
    },
    receiptLine: {
        height: 15,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        width: '100%',
        borderRadius: 4,
    },
    saveButton: {
        backgroundColor: '#5CE65C',
        padding: 15,
        borderRadius: 8,
        width: '90%',
        margin: 20,
    },

    saveButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    generateButton: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 8,
        width: '90%',
        margin: 20,
    },
    generateButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'medium',
    },
});