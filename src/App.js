import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [dappazon, setDappazon] = useState(null)

  const [account, setAccount] = useState(null)


  const loadBlockchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    // Connect to the same network as our blockchain node
    const network = await provider.getNetwork()

    // Connect to solidity smart contracts (Create JS versions of them)
    const dappazon = new ethers.Contract(
      config[network.chainId].dappazon.address, 
      Dappazon, 
      provider
      )
    setDappazon(dappazon)

    // Load products (work in progress...)
    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1)
      items.push(item)
    }


  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <h2>Dappazon Best Sellers</h2>


    </div>
  );
}

export default App;