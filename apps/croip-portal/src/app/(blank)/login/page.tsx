import { Suspense } from 'react'
import Login from '@/views/pages/auth/login'

const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  )
}

export default LoginPage
