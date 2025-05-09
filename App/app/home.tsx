import { Text, Button, Pressable, StyleSheet, Alert, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
    return(
        <View style={{
            flex: 1,
            alignItems: "center",
          }}>
            {/* STATISTICS */}
            <Text style={styles.section_title}>Stats</Text>
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Total Scans</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>18</Text>
                    <Text style={styles.statLabel}>Products Found</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>75%</Text>
                    <Text style={styles.statLabel}>Success Rate</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Total Scans</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Total Scans</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>75%</Text>
                    <Text style={styles.statLabel}>Success Rate</Text>
                </View>
            </View>

            {/* RECENT SCNAS */}
            <Text style={styles.section_title}>Recent scans</Text>
            <ScrollView style={styles.recentScansContainer}>
                <TouchableOpacity onPress={() => Alert.alert('Scan details')}>
                        <View style={styles.scanCard}>
                            <Text style={styles.scanTitle}>Ingredient List 1</Text>
                            <Text style={styles.scanDate}>2024-01-20</Text>
                            <Text style={styles.scanResult}>Found: Gluten, Lactose</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Scan details')}>
                    <View style={styles.scanCard}>
                        <Text style={styles.scanTitle}>Ingredient List 2</Text>
                        <Text style={styles.scanDate}>2024-01-19</Text>
                        <Text style={styles.scanResult}>Found: Nuts</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Scan details')}>
                    <View style={styles.scanCard}>
                        <Text style={styles.scanTitle}>Ingredient List 3</Text>
                        <Text style={styles.scanDate}>2024-01-18</Text>
                        <Text style={styles.scanResult}>No allergens found</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <Link href="/camera" asChild>
                <Pressable style={styles.scanButton } onPress={() => Alert.alert('Camera Button pressed')}>
                <Text style={styles.scanButtonText}>Scan new ingredients</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    section_title: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'left',
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
    scanButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 4,
        marginVertical: 15,
        marginHorizontal: 20,
        backgroundColor: '#00ffff',
        shadowColor: 'rgba(0, 255, 255, 0.9)',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    },
    scanButtonText: {
        fontSize: 18,
        color: '#000000',
        textShadowColor: 'rgba(0, 255, 255, 0.9)',
        textShadowOffset: {
          width: 0,
          height: 0,
        },
        textShadowRadius: 5,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        top: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        gap: 10,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '30%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff', // Change the background color to white or any other color you prefer,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: 5,
    },
    recentScansContainer: {
        width: '100%',
        paddingHorizontal: 20,
        maxHeight: 260,
    },
    scanCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scanTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    scanDate: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 5,
    },
    scanResult: {
        fontSize: 14,
        color: '#34495e',
        marginTop: 5,
    },
  });