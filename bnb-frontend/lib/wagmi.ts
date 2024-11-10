// import { http, createConfig } from "wagmi";
import { createConfig, http } from '@wagmi/core'
//import { Chain } from '@wagmi/core/chains'
import { defineChain } from 'viem'

const bnbTestnet = defineChain({
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bnb-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-testnet-rpc.publicnode.com'],
      webSocket: ['wss://bsc-testnet-rpc.publicnode.com'],
    },
    public: {
      http: ['https://bsc-testnet-rpc.publicnode.com'],
      webSocket: ['wss://bsc-testnet-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 17422483,
    },
  },
})

export const config = createConfig({
  chains: [bnbTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [bnbTestnet.id]: http(bnbTestnet.rpcUrls.default.http[0]),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
