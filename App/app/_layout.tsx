import React, {useState, useEffect} from "react";
import { Stack, Link, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("userData");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "userData"]);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="register" options={{ headerShown: false }}/>
      <Stack.Screen name="home" options={{ 
        headerShown: true,
        headerTitle: "Dashboard",
        headerTitleAlign: "center",
        headerBackVisible: false,
        headerLeft: () => (
          <Image 
                source={require('../assets/images/petit.png')}
                style={styles.icon}
                resizeMode="contain"
            />
        ),
        headerRight: () => (
          <TouchableOpacity style={{ 
            marginRight: 15 }} 
            onPress={handleLogout} activeOpacity={0.5} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="exit-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "#fff" },
       }}/>
      <Stack.Screen name="camera" options={{ headerShown: false }}/>
      <Stack.Screen name="scan" options={{ 
        headerShown: true, 
        headerTitle: "Information",
        }}/>
      <Stack.Screen name="recipe" options={{ 
        headerShown: true, 
        headerTitle: "Scanned",
        }}/>
    </Stack>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
    marginLeft: 15,
  },
});
