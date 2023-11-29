import React from 'react';
import { RouterProvider } from "react-router-dom";
import mainRouter from "routes";
import GlobalStyle from "style/globalStyle";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";

function App() {
  return (
    <>
    <ThirdwebProvider
      activeChain="polygon"
      clientId="cb0bcf9cb91ad584a61a6c9d1210fb17"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        rainbowWallet(),
      ]}
    >
      <GlobalStyle />
      <RouterProvider router={mainRouter} />
    </ThirdwebProvider>
    </>
  );
}

export default App;