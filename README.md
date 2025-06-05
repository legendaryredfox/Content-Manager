
# 🗂️ Content Manager

Aplicativo de gerenciamento de criadores de conteúdo, com histórico de preços e gráficos interativos. Desenvolvido com [Tauri](https://tauri.app/), [React](https://reactjs.org/) e SQLite.

## 📦 Funcionalidades

- Cadastro de criadores de conteúdo com título e URL;
- Visualização de histórico de preços;
- Cadastro de novos preços com anotações;
- Gráfico interativo com preços ao longo do tempo;
- Exclusão de criadores com confirmação;
- Interface limpa e responsiva.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/legendaryredfox/content-manager.git
cd content-manager
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Rode o projeto em modo desenvolvimento

```bash
npm run tauri dev
# ou
yarn tauri dev
```

## 🛠️ Gerar pacote .deb (Linux)

Certifique-se de estar em um sistema baseado em Debian (Ubuntu, Pop!_OS, etc):

```bash
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget gnupg squashfs-tools libssl-dev libgtk-3-dev
npm run tauri build
```

O arquivo `.deb` será gerado em:

```
src-tauri/target/release/bundle/deb/
```

## 📁 Estrutura de diretórios

```
.
├── src/                # Frontend React
│   ├── components/     # Componentes da UI
│   ├── App.tsx         # Aplicativo principal
├── src-tauri/          # Backend Tauri (Rust)
│   ├── main.rs         # Ponto de entrada Tauri
│   ├── database/       # Módulos de banco de dados
```

## 📃 Licença

Este projeto está licenciado sob os termos da **MIT License**.


---


# 🗂️ Content Manager

A content creator management application with price history and interactive charts. Built with [Tauri](https://tauri.app/), [React](https://reactjs.org/), and SQLite.

## 📦 Features

- Register content creators with title and URL;
- View price history;
- Register new prices with optional notes;
- Interactive chart showing price evolution;
- Delete creators with confirmation;
- Clean and responsive UI.

## 🚀 How to run the project

### 1. Clone the repository

```bash
git clone https://github.com/legendaryredfox/content-manager.git
cd content-manager
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Start in development mode

```bash
npm run tauri dev
# or
yarn tauri dev
```

## 🛠️ Build .deb package (Linux)

Make sure you're on a Debian-based system (Ubuntu, Pop!_OS, etc):

```bash
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget gnupg squashfs-tools libssl-dev libgtk-3-dev
npm run tauri build
```

The `.deb` file will be generated in:

```
src-tauri/target/release/bundle/deb/
```

## 📁 Directory structure

```
.
├── src/                # React frontend
│   ├── components/     # UI components
│   ├── App.tsx         # Main application
├── src-tauri/          # Tauri backend (Rust)
│   ├── main.rs         # Tauri entry point
│   ├── database/       # Database modules
```

## 📃 License

This project is licensed under the **MIT License**.
