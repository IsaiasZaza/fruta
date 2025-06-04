# 🌱 Eco Fruti - Aplicativo de Hortifruti

![Logo Eco Fruti](./assets/logo.png)

**Eco Fruti** é um aplicativo mobile que conecta consumidores diretamente a produtores locais, com foco em comercializar produtos hortifrúti "imperfeitos" — alimentos que seriam descartados por estética, mas estão próprios para consumo. Isso permite preços mais acessíveis e ajuda a combater o desperdício de alimentos.

---

## 📲 Funcionalidades Principais

- 🥬 **Catálogo de produtos**: Navegue por frutas, verduras e legumes disponíveis  
- 🛒 **Carrinho de compras**: Adicione produtos, ajuste quantidades e finalize pedidos  
- 🎟️ **Cupons de desconto**: Aplique cupons promocionais na finalização da compra  
- 💬 **Chat com atendente**: Tire dúvidas diretamente pelo app  
- 📦 **Acompanhamento de pedidos**: Veja o status e detalhes dos seus pedidos

---

## 💡 Diferenciais

- 🌍 Foco em **produtos imperfeitos**: Combate ao desperdício de alimentos  
- 💸 **Preços acessíveis**: Economia real na sua compra semanal  
- 👩‍🌾 Compra **direta do produtor**: Apoio à agricultura familiar e economia local

---

## 🧪 Tecnologias Utilizadas

### Frontend

- [React Native](https://reactnative.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [React Navigation](https://reactnavigation.org/)  
- Context API (gerenciamento de estado)  
- Axios (requisições HTTP)

### Backend

- Node.js + Express (API REST)  
- PostgreSQL (Banco de dados relacional)

---

## 📁 Estrutura do Projeto
fruta/
├── assets/                     # Logos e imagens
├── screens/                    # Telas principais
│   ├── AddressScreen.tsx
│   ├── CarrinhoEtapa1.tsx
│   ├── CarrinhoEtapa2.tsx
│   ├── CarrinhoEtapa3.tsx
│   ├── CarrinhoScreen.tsx
│   ├── CatalogoScreen.tsx
│   ├── ChatScreen.tsx
│   ├── CupomScreen.tsx
│   ├── LoginScreen.tsx
│   ├── NotificationScreen.tsx
│   ├── OnboardingBemVindo.tsx
│   ├── OnboardingTermos.tsx
│   ├── OnboardingTipoUsuario.tsx
│   ├── OnboardingUpdateScreen.tsx
│   ├── PedidoConfirmadoScreen.tsx
│   ├── ResumoDoPedidoScreen.tsx
│   ├── SplashScreen.tsx
│   └── TodosProdutosScreen.tsx
├── App.tsx                     # Navegação principal
├── CarrinhoContext.tsx         # Contexto do carrinho
├── index.js
├── types.ts                    # Tipos globais
├── app.json
├── package.json
├── tsconfig.json
└── .gitignore

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js v16+
- npm ou yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio ou Xcode (para emuladores)

### Instalação

```bash
cd Fruta
npm install
```
### Execução
```bash
npx expo start
# ou
npm start
```
## 👥 Integrantes do Grupo
- Kathleen Gabrielle Lima Dias  - UC23100125
- Nathalia Cassimiro dos Santos - UC23101954
 

## 📄 Licença
Distribuído sob a licença [MIT](LICENSE). Veja o arquivo para mais detalhes.

