import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from './components/layout/ProtectedLayout.jsx';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DoctorPage from './pages/DoctorPage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import OperatorPage from './pages/OperatorPage.jsx';
import { HOME } from './utils/routes.js';

/**
 * Rotas:
 *   /login                  entrada (escolha de perfil)
 *   /medico                 Espaço do Médico
 *   /medico/envio/:id       envio e rastreio do laudo de uma solicitação
 *   /operador               Espaço do Operador
 */
export default function App() {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedLayout perfil="medico" />}>
        <Route path="/medico" element={<DoctorPage />} />
        <Route path="/medico/envio/:id" element={<UploadPage />} />
      </Route>

      <Route element={<ProtectedLayout perfil="operadora" />}>
        <Route path="/operador" element={<OperatorPage />} />
      </Route>

      <Route path="*" element={<Navigate to={session ? HOME[session.perfil] : '/login'} replace />} />
    </Routes>
  );
}
