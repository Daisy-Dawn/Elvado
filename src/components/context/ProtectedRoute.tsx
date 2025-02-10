'use client'

import { useAuth } from './AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login') // Redirect if not authenticated
        }
    }, [isAuthenticated, router])

    return isAuthenticated ? children : null
}

// import ProtectedRoute from '@/components/ProtectedRoute'

// export default function DashboardPage() {
//     return (
//         <ProtectedRoute>
//             <div>Welcome to the Dashboard</div>
//         </ProtectedRoute>
//     )
// }
