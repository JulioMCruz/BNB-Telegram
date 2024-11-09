'use client'

import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  DynamicContextProvider,
} from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { WagmiProvider } from 'wagmi'
import { config } from "../lib/wagmi";

//import { http } from 'viem'
//import { base, baseSepolia } from 'viem/chains'
//import { useRouter } from 'next/navigation'

// const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API ?? undefined
const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID;

const evmNetworks = [
  {
    blockExplorerUrls: ['testnet.bscscan.com'],
    chainId: 97,
    chainName: 'BNB Smart Chain Testnet',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/bnb.svg'],
    name: 'tBNB',
    nativeCurrency: {
      decimals: 18,
      name: 'tBNB',
      symbol: 'tBNB',
    },
    networkId: 97,
    rpcUrls: ['97.rpc.thirdweb.com'],
    vanityName: 'tBNB',
  },
];


const queryClient = new QueryClient()

export default function OnchainProvider({ children }: { children: ReactNode }) {

  if (!dynamicEnvId) {
    const errMsg =
      "Please add your Dynamic Environment to this project's .env file";
    console.error(errMsg);
    throw new Error(errMsg);
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
  }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
