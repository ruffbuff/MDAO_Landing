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
import { Provider } from 'react-redux';
import store from 'store';
import { NftProvider } from "NftContext";

function App() {
  return (
    <>
      <NftProvider>
        <ThirdwebProvider
          activeChain="polygon"
          clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}
          supportedWallets={[
            metamaskWallet({ recommended: true }),
            coinbaseWallet(),
            walletConnect(),
            trustWallet(),
            rainbowWallet(),
          ]}
        >
          <GlobalStyle />
          <Provider store={store}>
            <RouterProvider router={mainRouter} />
          </Provider>
        </ThirdwebProvider>
      </NftProvider>
    </>
  );
}

export default App;