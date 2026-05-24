# 🌐 D-AIC Wallet: Decentralized Academic Identity Console

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Ethereum](https://img.shields.io/badge/Ethereum-EVM--Compatible-cyan)](https://ethereum.org)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-purple)](https://soliditylang.org)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)](https://react.dev)

A complete, high-end decentralized application (dApp) built on Ethereum and IPFS designed for cryptographically securing, issuing, and validating academic degrees and professional certifications. Eliminates third-party trust dependencies with direct university signature validation and immutable ledger record-keeping.

---

## 💎 State-of-the-Art Visual & Tech Upgrades

The **D-AIC Wallet** has been fully overhauled into a modern, premium Web3 SaaS-style console featuring:
* **Physics-Driven Route Navigation**: Integrated `AnimatePresence` and custom hardware-accelerated motion matrices for smooth blur fades and sliding page reveals.
* **12 Dedicated Sci-Fi Webpages**: Standalone modules including an Institutional Signature Admin panel, Student Vault with search queries, Employer Verifier Portal, explorer gas history charts, and systemic block latency analytics dashboards.
* **Timeline Verification Scanner**: A horizontal neon laser validation swipe that simulates structural Web3 cryptographic security audits.
* **MetaMask Blockaid Lock Bypass**: Standard Hardhat local node addresses pre-deploy dummy registries to anchor cleanly on safe, clean EVM keys.
* **Offline Storage Sandbox**: A local `localStorage` Base64 IPFS gateway fallback, allowing users to test credential uploads, signatures, and QR code scans 100% offline without Pinata configurations.

---

## 🛠️ Technological Stack & System Architecture

```text
                                  ┌────────────────────────┐
                                  │   MetaMask Provider    │
                                  └───────────┬────────────┘
                                              │ Cryptographic Auth
                                              ▼
┌────────────────────────┐        ┌────────────────────────┐        ┌────────────────────────┐
│  Distributed IPFS Hub  │ ◄────  │   React Web3 Frontend  │ ═════► │  Ethereum EVM Ledger   │
│ (Pinata / Cache Gate)  │ CIDs   │ (Ethers.js Client API) │ Tx     │ (Certificate Registry) │
└────────────────────────┘        └────────────────────────┘        └────────────────────────┘
```

* **Smart Contracts**: Solidty (0.8.20) compiling gas-efficient registry arrays.
* **Local Blockchain network**: Hardhat Network with pre-funded local accounts.
* **Client Interface**: React 18, Vite, Ethers.js v6.
* **Visual Components**: Framer Motion, Lucide React, and high-fidelity custom glassmorphism stylesheet cards.
* **Distributed Registry**: IPFS Cluster via Pinata REST APIs + browser caching gateways.

---

## 📁 Repository Structure

```text
D-AIC-Wallet/
├── contracts/
│   └── Certificate.sol          # Core Solidity Academic Ledger smart contract
├── scripts/
│   ├── deploy.js                # Auto-compiled contract ABI exporter script
│   └── fund.js                  # Pre-funds test keys with mock Ethereum
├── frontend/
│   ├── public/                  # Static assets & icons
│   └── src/
│       ├── components/
│       │   ├── pages/           # 12 Standalone Pages (Landing, About, Student, etc.)
│       │   └── ui/              # Modular GlassCards, NeonButtons, and background particles
│       ├── utils/
│       │   └── ipfs.js          # Dual-Mode Pinata & Local Base64 storage gateway
│       ├── App.jsx              # Navigation and MetaMask context router
│       └── index.css            # Custom CSS scrollbars & glow keyframes
├── hardhat.config.js            # Hardhat EVM network parameters
├── package.json                 # Node command runner registry
└── README.md                    # System documentation
```

---

## 🚀 Step-by-Step Installation & Local Execution

Follow these steps to run a completely pre-funded blockchain sandbox locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed and [MetaMask Browser Extension](https://metamask.io/) enabled.

### 2. Install Root Hardhat & Build Tools
Navigate to the root directory `D-AIC-Wallet/` in your shell and execute:
```bash
npm install
```

### 3. Spin Up Local Hardhat Node Sandbox
Compile the contracts and deploy a mock local network on port 8545:
```bash
npx hardhat node
```
*Leave this terminal window running to host the active local ledger.*

### 4. Deploy Smart Contract to Local Network
In a new terminal window, execute the deployment script to compile and write current contract details (ABIs & addresses) directly into the React source:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Config MetaMask for Localhost
Configure a new network inside your MetaMask wallet:
* **Network Name**: `Hardhat Localhost`
* **New RPC URL**: `http://127.0.0.1:8545`
* **Chain ID**: `31337`
* **Currency Symbol**: `ETH`

Import one of the pre-funded private keys output by **Step 3** into MetaMask to receive 10,000 developer ETH instantly.

### 6. Start the React Frontend Dev Server
Navigate to the `frontend/` directory, install packages, and boot the Vite server:
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🔮 Roadmap & Future Scope

* **ERC-4337 Account Abstraction**: Social logins (Google, Apple) bypassing direct MetaMask extension dependencies.
* **Zero-Knowledge Proofs (ZKP)**: Allowing graduates to verify criteria (e.g., "Holds a CS Degree") without disclosing GPA or university names.
* **Soulbound Tokens (SBT)**: Rendering academic qualifications non-transferable between addresses to prevent identity thefts.
* **Multi-Signature University Multi-sig Registries**: Requiring approvals from multiple registrar keys before credential anchoring.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.
