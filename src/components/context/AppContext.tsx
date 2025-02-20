'use client'
import { createContext, useContext, useState } from 'react'
import { Meme } from '../types/meme'

// context state
interface AppState {
    searchTerm: string
    memeCoinList: Meme[]
    setSearchTerm: (term: string) => void
    setMemeCoinList: (list: Meme[]) => void
}

// Default values
const AppContext = createContext<AppState>({
    searchTerm: '',
    memeCoinList: [],
    setSearchTerm: () => {},
    setMemeCoinList: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [memeCoinList, setMemeCoinList] = useState<Meme[]>([])

    return (
        <AppContext.Provider
            value={{ searchTerm, setSearchTerm, memeCoinList, setMemeCoinList }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
