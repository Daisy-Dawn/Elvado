'use client'
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { useRouter } from 'next/navigation'

// Define User type based on expected properties
interface User {
    id: string
    username: string
    email: string
}

// Define AuthContext type
interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
    isAuthenticated: boolean
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    // const isAuthenticated = !!user
    const isAuthenticated = false
    const router = useRouter()

    useEffect(() => {
        // Load user from localStorage if available
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User) // Type assertion
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/login') // Redirect after logout
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
