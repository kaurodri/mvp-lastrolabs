import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../mocks/api.js';
import ConfirmDialog from '../ui/ConfirmDialog.jsx';
import { useToast } from '../ui/Toast.jsx';
import { HOME } from '../../utils/routes.js';
import Sidebar from './Sidebar.jsx';

/**
 * Área logada: só entra quem tem sessão com o perfil certo.
 * Navegação fixa + conteúdo fluido (até 1440px, centralizado em monitores maiores).
 * Celular: barra no topo (conteúdo começa 56px abaixo). Desktop: barra lateral de 72px.
 */
export default function ProtectedLayout({ perfil }) {
  const { session, logout } = useAuth();
  const notify = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  if (!session) return <Navigate to="/login" replace />;
  if (session.perfil !== perfil) return <Navigate to={HOME[session.perfil]} replace />;

  const resetDemo = async () => {
    try {
      await api.resetDemo();
      setDataVersion((v) => v + 1); // remonta a página para recarregar os dados
      notify('Dados restaurados.');
    } catch (err) {
      notify(err.message || 'Não foi possível restaurar os dados.', 'error');
      throw err;
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar session={session} onLogout={logout} onSettings={() => setConfirmReset(true)} />
      <main className="pt-14 md:pl-[72px] md:pt-0">
        <div key={dataVersion} className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8 2xl:px-14">
          <Outlet />
        </div>
      </main>

      <ConfirmDialog
        open={confirmReset}
        title="Restaurar dados iniciais"
        message="Todas as alterações feitas (envios de laudo, aprovações, edições e exclusões) serão desfeitas."
        confirmLabel="Restaurar"
        onConfirm={resetDemo}
        onClose={() => setConfirmReset(false)}
      />
    </div>
  );
}
