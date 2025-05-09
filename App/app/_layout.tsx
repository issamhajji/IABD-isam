import { Stack, Link, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, Alert } from "react-native";

export default function RootLayout() {
  const router = useRouter();
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
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => Alert.alert("/profile")}>
            <Ionicons name="person" size={28} color="#2c3e50" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ 
            marginRight: 15 }} 
            onPress={() => Alert.alert("/")} activeOpacity={0.5} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="exit-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "#fff" },
       }}/>
      <Stack.Screen name="camera" options={{ headerShown: false }}/>
    </Stack>
  );
}
