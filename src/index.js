import React from "react";
import ReactDOM from "react-dom/client";

import { configureChains, sepolia, WagmiConfig, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import { TransferProvider } from "./contexts/transfer.context";
import { UiDataProvider } from "./contexts/ui-data.context";

import "./index.scss";
import App from "./App";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
        publicProvider(),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
});

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                <ChakraProvider>
                    <UiDataProvider>
                        <TransferProvider>
                            <App />
                        </TransferProvider>
                    </UiDataProvider>
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
);
