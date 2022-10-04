import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { BSC, Config, DAppProvider, Mainnet, BSCTestnet, ChainId } from "@usedapp/core"
import { Rpc_URLS } from './constants/AppConstants'
import { ThemeProvider } from "@emotion/react"
import theme from "src/theme/theme"
import Layout from 'src/common/layout/Layout'
import { RefreshContextProvider } from "src/contexts"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Mint, Home } from 'src/pages'
import { NFTProvider } from 'src/contexts'

// mainet
const config: Config = {
  // readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: Rpc_URLS[ChainId.BSC] ?? '',
    [BSCTestnet.chainId]: Rpc_URLS[ChainId.BSCTestnet] ?? ''
  },
  // networks: [BSC, Mainnet, BSCTestnet],
  autoConnect: false
}

function App() {
  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <RefreshContextProvider>
          <NFTProvider>            
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/mint" element={<Mint />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                      path="*"
                      element={<Navigate to="/mint" replace />}
                    />
                  </Routes>
                </Layout>
              </BrowserRouter>
              <ToastContainer />            
          </NFTProvider>
        </RefreshContextProvider>
      </ThemeProvider>
    </DAppProvider>
  );
}

export default App;
