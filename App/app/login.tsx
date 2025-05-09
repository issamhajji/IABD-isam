import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Pressable, StyleSheet, Button, Alert, View, ImageBackground} from "react-native";
import { Link, useRouter } from "expo-router";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = (data) => {console.log(data); router.push('/home');}
     console.log(errors);


    return(
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={{flex: 1, backgroundColor: '#1e1e1e',}}
            >
        <View style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
          }}>
            
            <Text style={styles.logo}>LOGO</Text>

            <Text style={styles.label}>Username</Text>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="username"
            />
            {errors.username && <Text style={styles.errorText}>Username is required.</Text>}

            <Text style={styles.label}>Password</Text>
            <Controller style={{
                position: 'relative',
                width: '100%',
            }}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.errorText}>Password is required.</Text>}

            <Link href="#" style={styles.forgotPassword}>Forgot my password</Link>

            <Pressable style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.line} />
            </View>

            <Link href="/register" asChild>
                <Pressable style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                </Pressable>
            </Link>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      marginVertical: 8,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },
    input: {
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        padding: 15,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#000',
        textAlign: 'right',
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    registerButton: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 8,
    },
    registerButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#666',
        fontSize: 14,
    },
    
  });