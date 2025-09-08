# Cultivation Simulator

> This project is a modification of the original work found at https://github.com/SoulDancer27/cultivation-simulator.

![image](https://github.com/SoulDancer27/cultivation-simulator/assets/34806883/0f999b12-c958-4996-aa41-ef5a082342e1)

A browser-based incremental game where you embark on a journey of cultivation, growing stronger through training, crafting, and fighting.

## Core Features (from the original project)

*   **Cultivation System:** Advance through various realms and increase your power.
*   **Activities:** Engage in activities like training, mining, crafting, and gathering to improve your stats and obtain resources.
*   **Item System:** A variety of items to collect, including herbs, minerals, money, and treasures.

## New Features & Modifications

This version builds upon the original project by adding the following major features:

*   **Full Localization (i18n):** The entire game interface has been translated into Chinese (中文) and English. A robust internationalization framework (`i18next`) has been integrated to make adding new languages simple.
*   **Dark Mode:** A theme switcher has been added to the settings page, allowing users to toggle between a light and a dark theme for a more comfortable viewing experience, especially in low-light environments.
*   **Developer Cheat Panel:** For testing and experimental purposes, a cheat panel has been integrated. It can be opened from the top bar and allows users to add money, cultivation experience, and any in-game item on demand.
*   **Bug Fixes & Dependency Upgrades:** Resolved numerous compilation errors caused by outdated dependencies and improved overall project stability by upgrading the core build system (`react-scripts`).

## Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

*   [Node.js](https://nodejs.org/en)
*   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/SoulDancer27/cultivation-simulator.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd cultivation-simulator
    ```
3.  Install the dependencies:
    ```sh
    yarn install
    ```

### Running the development server

```sh
yarn start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](/CONTRIBUTING.md) for more information.

## Project Tracking

You can follow the project's progress on our [Notion workspace](https://www.notion.so/Cultivation-Simulator-927db0045f05489294cf198071cbd216).