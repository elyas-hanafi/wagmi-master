# Web3 Authentication App with SIWE, WAGMI, Iron Session, NextAuth, and RainbowKit

This project demonstrates how to implement **Sign-In with Ethereum (SIWE)** authentication in a Next.js application, using a combination of popular Web3 libraries such as **WAGMI**, **viem**, **Iron Session**, **NextAuth**, and **RainbowKit**. The authentication flow allows users to sign in using their Ethereum wallet, ensuring a secure and decentralized login mechanism.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This repository showcases a complete Web3 authentication flow for Next.js applications. By leveraging SIWE, users can authenticate themselves with their Ethereum wallet without relying on traditional username/password systems. The stack includes wallet integration, cryptographic signature verification, and secure session handling.

---

## Features

- **Sign-In with Ethereum (SIWE)**: Enables users to authenticate using their Ethereum wallet.
- **WAGMI + RainbowKit**: Provides a smooth and elegant wallet connection experience.
- **viem**: Ensures efficient and modern blockchain interactions.
- **Iron Session**: Manages session handling in a secure manner.
- **NextAuth**: Handles authentication and integrates session management.
- **API Routes**: Protects server-side resources using signed Ethereum messages.

---

## Tech Stack

- **Next.js**: React framework for building SSR and static applications.
- **WAGMI**: A Web3 React library to interact with Ethereum wallets.
- **RainbowKit**: Wallet connection UI library for a polished user experience.
- **viem**: A blockchain interaction library to communicate with Ethereum.
- **SIWE (Sign-In with Ethereum)**: An authentication protocol for Ethereum users.
- **Iron Session**: Lightweight session management for Next.js apps.
- **NextAuth**: Full-fledged authentication provider for Next.js.

---

## Prerequisites

- **Node.js**: v14.x or later
- **pnpm**: Package manager (recommended)
- **Ethereum Wallet**: MetaMask or any WalletConnect-compatible wallet

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/web3-auth-app.git
cd web3-auth-app
```

### 2. Install Dependencies

```bash
pnpm install
```

---

## Configuration

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
SESSION_SECRET=your-session-secret-key
NEXTAUTH_SECRET=your-nextauth-secret-key
```

- **SESSION_SECRET**: A strong secret used by Iron Session for session management.
- **NEXTAUTH_SECRET**: A secret key used by NextAuth for encrypting session tokens.

### 2. Wallet Providers and Chain Configuration

You can configure the wallet providers and supported Ethereum chains in the `pages/_app.tsx` file. RainbowKit and WAGMI handle this configuration.

```tsx
import { mainnet, polygon } from 'wagmi/chains';
```

---

## Project Structure

```
/web3-auth-app
├── /components            # Reusable UI components
├── /pages
│   ├── /api               # API routes for authentication and session management
│   └── _app.tsx           # App entry point with WAGMI and RainbowKit setup
├── /styles                # Global and component-specific styles
├── /utils                 # Helper functions for SIWE message generation
└── .env.local             # Environment variables (excluded from version control)
```

---

## Running the Project

### Development Mode

Start the development server:

```bash
pnpm dev
```

Navigate to `http://localhost:3000` in your browser.

### Production Build

To build and start the project in production mode:

```bash
pnpm build
pnpm start
```

---

## Usage

1. **Connect Wallet**: On the homepage, click "Connect Wallet" to open the RainbowKit modal. Select your preferred wallet (e.g., MetaMask).
2. **Sign Message**: Once connected, the app will prompt you to sign a cryptographic message to authenticate.
3. **Access Protected Routes**: After signing in, you can access protected resources by using your authenticated session.

---

## Troubleshooting

### Common Issues

1. **Session Not Persisting**:
   - Ensure your `SESSION_SECRET` is set correctly and that Iron Session is configured for secure cookies in production.
   
2. **Signature Verification Errors**:
   - Verify that the SIWE message and signature are being correctly generated and verified both client- and server-side.

---

## Contributing

We welcome contributions! Feel free to fork the repository and submit pull requests. Make sure to follow the code style guidelines and write tests for any new features.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

If you have any questions or need further assistance, feel free to open an issue or reach out via the contact details in the repository. Happy coding!
