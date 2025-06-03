import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App'; // ajuste o caminho se necessário

export default function UpdateScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            {/* Botão de voltar para tela OnboardingTipoUsuario */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('OnboardingTipoUsuario')}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            {/* Logo e nome */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>ECO FRUTI</Text>
            </View>

            {/* Imagem da cesta */}
            <Image
                source={require('../assets/fruit-basket.png')}
                style={styles.basket}
                resizeMode="contain"
            />



            {/* Título principal */}
            <Text style={styles.mainText}>ESTAMOS COLHENDO MELHORIAS! 🌱</Text>

            {/* Texto explicativo */}
            <Text style={styles.subText}>
                ESTAMOS FAZENDO MELHORIAS PARA DEIXAR O APP AINDA MELHOR. VOLTAMOS EM BREVE!
            </Text>

            {/* Rodapé */}
            <Text style={styles.footerText}>ESTIMAMOS 5 MESES</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backText: {
        fontSize: 24,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    basket: {
        width: 250,
        height: 250,
        marginTop: 80,
        marginBottom: 40,
    },
    mainText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    footerText: {
        fontSize: 11,
        color: '#aaa',
        position: 'absolute',
        bottom: 20,
    },
});
