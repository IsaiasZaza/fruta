import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext'; // ajuste o caminho conforme seu projeto

type Mensagem = {
    id: string;
    texto: string;
    autor: 'sistema' | 'usuario';
};

export default function ChatScreen(): JSX.Element {
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const navigation = useNavigation();
    const { carrinho } = useCarrinho();

    useEffect(() => {
        setMensagens([
            {
                id: '1',
                texto: `Olá! Sou a assistente virtual da ECO FRUTI 🌿\n\nComo posso te ajudar hoje?\n\n1️⃣ Onde estão meus produtos?\n2️⃣ Quais cupons temos?\n3️⃣ Falar com um atendente`,
                autor: 'sistema',
            },
        ]);
    }, []);

    const enviarMensagem = () => {
        const texto = mensagem.trim();
        if (!texto) return;

        const novaMensagemUsuario: Mensagem = {
            id: Date.now().toString(),
            texto,
            autor: 'usuario',
        };

        setMensagens((prev) => [...prev, novaMensagemUsuario]);
        setMensagem('');

        setTimeout(() => {
            const respostaSistema = gerarResposta(texto);
            if (respostaSistema) {
                setMensagens((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString() + '-sys',
                        texto: respostaSistema,
                        autor: 'sistema',
                    },
                ]);
            }
        }, 500);
    };

    const gerarResposta = async (entrada: string): Promise<string> => {
        switch (entrada.trim()) {
            case '1':
                if (carrinho.length === 0) {
                    return `🛒 Seu carrinho está vazio no momento.\n\nDeseja adicionar algo? 🥝🍌`;
                } else {
                    const itens = carrinho.map((item: any, idx: number) => `• ${item.nome} (${item.quantidade})`).join('\n');
                    return `📦 Aqui estão os produtos no seu carrinho:\n\n${itens}\n\nDeseja fazer mais alguma coisa? 😊`;
                }

            case '2':
                try {
                    const response = await fetch('https://nova-pasta-production.up.railway.app/api/coupons');
                    if (!response.ok) throw new Error('Erro ao buscar cupons');

                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const cupons = data.map((cupom: any) => `• ${cupom.codigo}: ${cupom.valor}$`).join('\n');
                        return `🎁 Aqui estão os cupons disponíveis:\n\n${cupons}`;
                    } else {
                        return `❌ Não há cupons disponíveis no momento.`;
                    }
                } catch (error) {
                    return `⚠️ Ocorreu um erro ao buscar os cupons. Tente novamente mais tarde.`;
                }

            case '3':
                return `👩‍💼 Um atendente será conectado com você em instantes.\n\nEnquanto isso, posso te ajudar com mais alguma coisa?`;

            default:
                return `🤖 Desculpe, não entendi.\n\nPor favor, escolha uma das opções:\n1️⃣ Onde estão meus produtos?\n2️⃣ Quais cupons temos?\n3️⃣ Falar com um atendente`;
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={24} color="green" />
                    <Text style={styles.logoText}>ECO FRUTI</Text>
                </View>
            </View>

            {/* Título */}
            <Text style={styles.chatTitle}>CHAT</Text>

            {/* Mensagens */}
            <ScrollView
                style={styles.chatArea}
                contentContainerStyle={{ paddingVertical: 10 }}
            >
                {mensagens.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.message,
                            msg.autor === 'usuario' ? styles.userMessage : styles.systemMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{msg.texto}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Campo de envio */}
            <View style={styles.inputArea}>
                <TextInput
                    value={mensagem}
                    onChangeText={setMensagem}
                    placeholder="Digite sua mensagem..."
                    style={styles.input}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={enviarMensagem} style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        marginBottom: 30,
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    logoText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatTitle: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginTop: 10,
    },
    chatArea: {
        flex: 1,
        paddingHorizontal: 12,
    },
    message: {
        padding: 10,
        marginVertical: 4,
        borderRadius: 10,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#d0f0c0',
        alignSelf: 'flex-end',
    },
    systemMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 14,
        color: '#333',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 14,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#2e7d32',
        padding: 10,
        borderRadius: 20,
    },
});
