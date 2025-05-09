import { Text, Button, Alert, View, Pressable, StyleSheet, ImageBackground} from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={{flex: 1, backgroundColor: '#1e1e1e',}}
    >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={styles.logo}>LOGO</Text>

      <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>

      <Link href="/login" asChild>
        <Pressable style={styles.button }>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </Link>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text }>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 100,
  },
  subtitle: {
    fontSize: 16,
    color: '#a9a9a9a',
    lineHeight: 24,
  },
  button: {
    top: 20,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 25,
  },  
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
},
});
