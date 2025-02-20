import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Header from '@/components/layout/Header'
import './globals.css'
import { AppProvider } from '@/components/context/AppContext'
import { ApiProvider } from '@/components/context/ApiContext'
import WagmiClientProvider from '@/utils/WagmiClientProvider'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Elvado',
    description: 'Trading site',
    icons: {
        icon: '/elvado-logo.svg', // Default favicon
        shortcut: '/elvado-logo.svg',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-inter antialiased`}
            >
                <WagmiClientProvider>
                    <AppProvider>
                        <ApiProvider>
                            <Header />
                            {children}
                        </ApiProvider>
                    </AppProvider>
                </WagmiClientProvider>
            </body>
        </html>
    )
}
