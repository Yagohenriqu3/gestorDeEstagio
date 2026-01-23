import {Routes, Route} from 'react-router-dom'
import Login from '../pages/auth/Login/Login'
import Cadastro from '../pages/auth/Cadastro/Cadastro'
import RecuperarSenha from '../pages/auth/ForgotPassword/RecuperarSenha'
import DashboardAluno from '../pages/dashboard/DashboardAluno/DashboardAluno'
import DashboardCoordenador from '../pages/dashboard/DashboardCoordenador/DashboardCoordenador'
import DashboardPreceptor from '../pages/dashboard/DashboardPreceptor/DashboardPreceptor'
import DashboardGestorLocal from '../pages/dashboard/DashboardGestorLocal/DashboardGestorLocal'
import DashboardAdm from '../pages/dashboard/DashboardAdm/DashboardAdm'

export default function AppRoutes(){

    return(
        
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/recuperar-senha' element={<RecuperarSenha/>}/>
                <Route path='/aluno' element={<DashboardAluno/>}/>
                <Route path='/coordenador' element={<DashboardCoordenador/>}/>
                <Route path='/gestor-local' element={<DashboardGestorLocal/>}/>
                <Route path='/preceptor' element={<DashboardPreceptor/>}/>
                <Route path='/adm' element={<DashboardAdm/>}/>
                
            </Routes>
        
    )
}