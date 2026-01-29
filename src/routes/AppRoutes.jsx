import {Routes, Route} from 'react-router-dom'
import Login from '../pages/auth/Login/Login'
import Cadastro from '../pages/auth/Cadastro/Cadastro'
import RecuperarSenha from '../pages/auth/ForgotPassword/RecuperarSenha'
import DashboardAluno from '../pages/dashboard/DashboardAluno/DashboardAluno'
import DashboardCoordenador from '../pages/dashboard/DashboardCoordenador/DashboardCoordenador'
import DashboardPreceptor from '../pages/dashboard/DashboardPreceptor/DashboardPreceptor'
import DashboardGestorLocal from '../pages/dashboard/DashboardGestorLocal/DashboardGestorLocal'
import DashboardAdm from '../pages/dashboard/DashboardAdm/DashboardAdm'
import PrivateRoute from './PrivateRoute'

export default function AppRoutes(){

    return(
        
            <Routes>
                {/* Rotas Públicas */}
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/recuperar-senha' element={<RecuperarSenha/>}/>

                {/* Rotas Privadas */}
                <Route path='/aluno' element={
                    <PrivateRoute tiposPermitidos={['Aluno']}>
                        <DashboardAluno/>
                    </PrivateRoute>
                }/>
                <Route path='/coordenador' element={
                    <PrivateRoute tiposPermitidos={['Coordenador']}>
                        <DashboardCoordenador/>
                    </PrivateRoute>
                }/>
                <Route path='/gestor-local' element={
                    <PrivateRoute tiposPermitidos={['Docente']}>
                        <DashboardGestorLocal/>
                    </PrivateRoute>
                }/>
                <Route path='/preceptor' element={
                    <PrivateRoute tiposPermitidos={['Preceptor']}>
                        <DashboardPreceptor/>
                    </PrivateRoute>
                }/>
                <Route path='/adm' element={
                    <PrivateRoute tiposPermitidos={['Administrador']}>
                        <DashboardAdm/>
                    </PrivateRoute>
                }/>
            </Routes>
        
    )
}
