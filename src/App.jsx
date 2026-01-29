import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/layout/Header/Header'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <div className='bg-[#F5F7FA]'>
        <Header/>
        <AppRoutes/>
      </div>
    </AuthProvider>
  )
}

export default App
