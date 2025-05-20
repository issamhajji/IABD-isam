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
    const { items, imageUri, recipe } = useLocalSearchParams();


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

    const listItems = () => {
        return parsedItems.map((item, index) => ( 
            <View key={index} style={styles.listItem}>
                <View>
                    <Text>{item.item}</Text>
                </View>
                <View>
                    <Text>{item.count}</Text>
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
                { listItems() }
            </View>
            {/* recetas */}
            <View style={styles.receiptSection}>
                <Text style={styles.sectionTitle}>Recipe</Text>
                <View style={styles.receipt}>
                    <Markdown>{recipe}</Markdown>
                    {/* <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '60%' }]} />
                    <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '80%' }]} />
                    <View style={styles.receiptLine} />
                    <View style={[styles.receiptLine, { width: '70%' }]} /> */}
                </View>
            </View>

            </ScrollView>
            
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