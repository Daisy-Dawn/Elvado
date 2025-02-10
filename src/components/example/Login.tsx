// import { useAuth } from '../context/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

// export default function LoginPage() {
//     const { isAuthenticated, login } = useAuth()
//     const router = useRouter()

//     useEffect(() => {
//         if (isAuthenticated) {
//             router.push('/dashboard') // Redirect logged-in users away from login
//         }
//     }, [isAuthenticated, router])

//     return (
//         <div>
//             <h1>Login</h1>
//             <button onClick={() => login({ username: 'user123' })}>
//                 Login
//             </button>
//         </div>
//     )
// }
