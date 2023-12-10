import { RouterProvider } from "react-router-dom";
import mainRouter from "routes";
import GlobalStyle from "style/globalStyle";
import { Provider } from 'react-redux';
import store from 'store';
import { polygon, polygonMumbai } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [
    alchemyProvider({ apiKey: "0QHDGVtInkstSYcCyYwk1rsbYwbxmpW6" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'MDAO',
  projectId: '76616387fbe3b73fc4458f459276c1bf',
  chains
});

const wagmiConfig = createConfig({
  connectors,
  publicClient,
  webSocketPublicClient
})

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          coolMode
          modalSize="compact"
          chains={chains}
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
          showRecentTransactions={true}
        >
          <GlobalStyle />
          <Provider store={store}>
            <RouterProvider router={mainRouter} />
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;