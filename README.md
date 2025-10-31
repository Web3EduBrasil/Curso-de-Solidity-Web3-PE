# Solidity Course — Web3 PE (2nd Edition)

> A 24-hour, hands-on immersion to learn **Web3 fundamentals** and build **Solidity smart contracts** — culminating in real prototypes for **Moura** and a structured path to **Arbitrum One/Nova**.

<div align="center">

[![Made with Solidity](https://img.shields.io/badge/Made%20with-Solidity-363636.svg)](#)  
[![Arbitrum Ready](https://img.shields.io/badge/Target-Arbitrum%20One%2FNova-2d3748.svg)](#)  
[![Open Source](https://img.shields.io/badge/Code-Open%20Source-brightgreen.svg)](#)

</div>

---

## Photos from the Course

All photos from this edition are versioned in the repository at:

- [`./Photos from the Course/`](./Photos%20from%20the%20Course/) ← click to browse the files

## Table of Contents

- [Overview](#overview)  
- [Impact Report (for Arbitrum DAO)](#impact-report-for-arbitrum-dao)  
  - [1) Executive Summary](#1-executive-summary)  
  - [2) Alignment with Arbitrum DAO](#2-alignment-with-arbitrum-dao)  
  - [3) Scope, Methodology & Evidence](#3-scope-methodology--evidence)  
  - [4) Impact Indicators (KPIs)](#4-impact-indicators-kpis)  
  - [5) Case Samples](#5-case-samples)  
  - [6) Requests/Proposals to Arbitrum DAO](#6-requestsproposals-to-arbitrum-dao)  
  - [7) Links](#7-links)  
  - [8) Additional Reach Data](#8-additional-reach-data)  
- [Course Curriculum (3 Days)](#course-curriculum-3-days)  
- [Repository Structure](#repository-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Install](#install)  
  - [Quick Commands](#quick-commands)  
- [Deploying to Arbitrum](#deploying-to-arbitrum)  
- [Quality & Security](#quality--security)  
- [Contributing](#contributing)  
- [Acknowledgments](#acknowledgments)  
- [License](#license)

---

## Overview

**Why this course?**  
Digital transformation is moving toward **decentralized**, **transparent**, and **autonomous** systems. This course equips professionals, students, and enthusiasts with the foundations to design and ship production-grade smart contracts using **Solidity**, with a clear runway to the **Arbitrum** ecosystem.

- **Format/Duration:** 24 hours over 3 days (short lectures + labs + applied project)  
- **Core Delivery:** Public repository of smart-contract prototypes built for **Moura**  
- **Cohort:** 34 graduates (6 women)

---

## Impact Report (for Arbitrum DAO)

### 1) Executive Summary

- **Goal:** Train and onboard new developers into the **Arbitrum** ecosystem through Solidity fundamentals and an applied project.  
- **Key outcomes:** 34 trained developers (6 women); open-source code delivered (multiple “**Projeto Moura – [Name]**” directories); consistent commit history and public traction (stars/forks).  
- **Next step:** Test/deploy projects on **Arbitrum One/Nova**.

### 2) Alignment with Arbitrum DAO

- **Education & Community:** Hands-on developer onboarding and **open-source** asset creation.  
- **Developer Enablement:** A foundation to evolve **dApps** and **infrastructure** on Arbitrum (One/Nova).

### 3) Scope, Methodology & Evidence

- **Format:** 24 hours / 3 days (short lectures + labs + applied project).  
- **GitHub:** Multiple “**Projeto Moura – [Name]**” folders, solid commit history, and a **pre/post learning** directory (“Student Comprehension Report – Before and After”).  
- **Public signal:** Stars/forks indicating community interest.

### 4) Impact Indicators (KPIs)

| Dimension               | Metric                                                                 |
|-------------------------|------------------------------------------------------------------------|
| **Reach & Inclusion**   | 34 graduates; **6 women** (≈17.6%)                                     |
| **Technical Output**    | Public repo with working prototypes and a strong commit history         |
| **Arbitrum Onboarding** | Projects structured to port to **Arbitrum One/Nova** (testnet → mainnet)|

> **Suggested post-course KPIs:** # wallets created on Arbitrum; # contract deployments/verifications; # PRs/issues in ecosystem repos; retention (hackathons, bounties) and job placement.

### 5) Case Samples

Each **“Projeto Moura – [Name]”** folder includes contracts, tests/artifacts, and docs—supporting auditing and iteration (e.g., *Alexia Alves, Maria Leticia, João Vitor, Cecília Helena, Isabela de França*, among others).

### 6) Requests/Proposals to Arbitrum DAO

1. **Micro-bounty pool** for the 34 graduates to complete deployments (testnet → mainnet).  
2. **Spots in Arbitrum hackathons/bootcamps** and **office hours** with DevRel/ambassadors.  
3. **Infrastructure credits** (RPCs, explorers/verify, tooling).  
4. **Visibility:** Highlight the **“Web3 PE”** case across DAO channels when applicable.

### 7) Links

- **Course repository:** `Web3EduBrasil/Curso-de-Solidity-Web3-PE`

### 8) Additional Reach Data

- **Event attendance (3 days):** **1,200+ people** total  
- **Social media reach:** **109,000+ views** (2nd edition content)

---

## Course Curriculum (3 Days)

**Day 1 — Web3 & Solidity Fundamentals**  
Accounts, EVM basics, data types, functions, events, modifiers, development environment setup.

**Day 2 — Patterns & Security**  
Ownership, access control, token patterns, testing & verification, secure development guidelines (e.g., reentrancy, CEI pattern).

**Day 3 — Applied Project & Delivery**  
Finalize **Moura** prototypes, tests, documentation, code review, and demo.

---

## Repository Structure

```
.
├─ /projects
│  ├─ Projeto Moura – Alexia Alves/
│  ├─ Projeto Moura – Maria Leticia/
│  ├─ Projeto Moura – João Vitor/
│  └─ ...
├─ /reports
│  └─ Student Comprehension Report – Before and After/
├─ /contracts
├─ /scripts
├─ /test
└─ README.md
```

> **Tip:** Each project directory should be self-contained (contracts, tests, docs) to simplify audits and deployments.

---

## Getting Started

### Prerequisites

- **Node.js** (LTS) & **npm** or **pnpm/yarn**  
- **Hardhat** or **Foundry** (choose your toolchain)  
- A wallet (e.g., MetaMask) and **Arbitrum Sepolia** RPC for test deployments

### Install

```bash
# clone
git clone https://github.com/Web3EduBrasil/Curso-de-Solidity-Web3-PE.git
cd Curso-de-Solidity-Web3-PE

# install deps
npm install
# or: pnpm install
```

### Quick Commands

```bash
# compile contracts
npx hardhat compile

# run tests
npx hardhat test

# run a local node (optional)
npx hardhat node

# deploy (example)
npx hardhat run scripts/deploy.ts --network arbitrumSepolia
```

> Configure networks and keys in `hardhat.config.ts` via environment variables (e.g., `ARBITRUM_RPC_URL`, `PRIVATE_KEY`).

---

## Deploying to Arbitrum

1. **Network Config:** Add **Arbitrum Sepolia** (testnet) and **Arbitrum One** (mainnet) to `hardhat.config.ts`.  
2. **Deploy:** Use `scripts/deploy.ts` and pass constructor args if needed.  
3. **Verify:**  
   ```bash
   npx hardhat verify --network arbitrumSepolia <DEPLOYED_ADDRESS> <constructor_args...>
   ```
4. **Post-Deploy:** Publish ABI, contract address, and a short README in the project folder.

---

## Quality & Security

- **Checklist (pre-deploy):**
  - [ ] Reentrancy protection (CEI pattern / `ReentrancyGuard`)  
  - [ ] Input validation & access control (`onlyOwner`, roles)  
  - [ ] Overflow/underflow (Solidity ^0.8.x built-ins)  
  - [ ] Events for critical state changes  
  - [ ] Unit tests for core flows and failure cases  
  - [ ] Gas sanity checks and simple fuzz (if available)

- **Recommended tooling:** `hardhat-ethers`, `hardhat-verify`, `solhint`, `slither` (optional).

---

## Contributing

We welcome contributions from students, mentors, and the community:

1. Fork the repo and create a feature branch.  
2. Follow the repo structure for new projects.  
3. Open a PR describing changes (scope, testing notes, and screenshots/logs).  

> For student projects, please include: **problem statement**, **architecture overview**, **contract addresses (if deployed)**, and **test output**.

---

## Acknowledgments

- **Sponsor:** **Arbitrum DAO**  
- **Organizer:** **Web3EduBrasil**  
- **Industry Partner:** **Moura**

Special thanks to all mentors, instructors, and the 34 graduates (with 6 women) who built and shipped across three intense days.

---

## License

Unless specified in subfolders, this repository is provided under the **MIT License**.  
Feel free to reuse, fork, and adapt for educational and community growth purposes.

---

*Questions or media inquiries?*  
Open an **Issue** or reach out via the Web3EduBrasil channels.
