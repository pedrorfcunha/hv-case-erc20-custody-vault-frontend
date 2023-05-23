import CustodyVaultContainer from "./components/custody-vault-container/custody-vault-container.component";
import SampleTokenContainer from "./components/sample-token-container/sample-token-container.component";
import TrusteeCommandsContainer from "./components/trustee-commands-container/trustee-commands-container.component";
import Signature from "./components/signature/signature.component";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import NotConnected from "./components/not-connected/not-connected.component";

import "./App.scss";

function App() {
    const { isConnected } = useAccount();

    return (
        <div className="App">
            <ConnectButton />
            {isConnected ? (
                <div className="app-main-container">
                    <SampleTokenContainer />
                    <CustodyVaultContainer />
                    <TrusteeCommandsContainer />
                </div>
            ) : (
                <NotConnected />
            )}

            <Signature />
        </div>
    );
}

export default App;
