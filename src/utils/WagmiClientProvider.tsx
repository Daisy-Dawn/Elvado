'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import {
    injected,
    metaMask,
    safe,
    walletConnect,
    coinbaseWallet,
} from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = 'a6c2a4cdc20f2e9fdd324d8e2d798265'

// Create Wagmi and Query Clients
const queryClient = new QueryClient()
const config = createConfig({
    chains: [mainnet, base],
    connectors: [
        injected(),
        walletConnect({ projectId }),
        metaMask(),
        safe(),
        coinbaseWallet(),
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
    },
})

export default function WagmiClientProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
