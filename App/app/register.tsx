import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Pressable, StyleSheet, View, ImageBackground } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = (data) => {
        console.log(data);
        router.push('/home');
    };

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

            <Text style={styles.label}>Full name</Text>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="fullname"
            />
            {errors.fullname && <Text style={styles.errorText}>Full name is required.</Text>}

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

            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.errorText}>Valid email is required.</Text>}

            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                rules={{ required: true, minLength: 6 }}
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
            {errors.password && <Text style={styles.errorText}>Password must be at least 6 characters.</Text>}
            <Pressable style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginButtonText}>Register</Text>
            </Pressable>

            <View style={styles.divider}>
                <View style={styles.line} />
            </View>

            <Link href="/login" style={styles.backToLogin}>
                <Text>Back to Login</Text>
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
        borderWidth:1,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
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
    backToLogin: {
        color: '#666',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
});