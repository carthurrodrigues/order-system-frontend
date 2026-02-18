# 🖥️ Order System Frontend

Interface web desenvolvida em **React** para gerenciamento de pedidos e produtos.  
A aplicação permite autenticação de usuários, navegação protegida e interação com a API para criação e visualização de pedidos.

## 🚀 Funcionalidades

- 🔐 Autenticação de usuários  
- 🔒 Rotas protegidas por login  
- 📦 Visualização de produtos  
- 📝 Criação e gerenciamento de pedidos  
- 🔄 Integração com API REST  
- 📱 Interface responsiva e moderna  

## 🛠️ Tecnologias Utilizadas

- React  
- Context API (gerenciamento de autenticação)  
- JavaScript (ES6+)  
- CSS  
- Axios / Fetch para consumo da API  

## 📂 Estrutura do Projeto

```
src/
 ├── components/   # Componentes reutilizáveis
 ├── pages/        # Páginas da aplicação
 ├── services/     # Comunicação com a API
 ├── context/      # Controle de autenticação
 ├── routes/       # Rotas protegidas
 └── App.js
```

## ⚙️ Instalação e Execução

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/order-system-frontend.git
```

### 2️⃣ Acesse a pasta do projeto
```bash
cd order-system-frontend
```

### 3️⃣ Instale as dependências
```bash
npm install
```

### 4️⃣ Execute a aplicação
```bash
npm start
```

A aplicação estará disponível em:

http://localhost:3000

## 🔗 Integração com Backend

Certifique-se de que a API esteja rodando e configure a URL base no arquivo:

src/services/api.js

## 🔐 Autenticação

Após o login, o token JWT é armazenado e enviado automaticamente nas requisições protegidas, garantindo acesso seguro às funcionalidades do sistema.

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para praticar conceitos modernos de desenvolvimento frontend, incluindo autenticação, consumo de APIs, organização de componentes e criação de interfaces responsivas.

## 👨‍💻 Autor

Desenvolvido por **Arthur Rodrigues**
