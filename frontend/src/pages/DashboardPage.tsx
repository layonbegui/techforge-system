import { AppLayout } from '../layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="grid grid-2">
        <section className="card section">
          <h2 className="title">Bem-vindo</h2>
          <p className="subtitle">Sistema completo com autenticação, contexto global e CRUDs.</p>
          <p><strong>Usuário:</strong> {user?.name}</p>
          <p><strong>E-mail:</strong> {user?.email}</p>
        </section>
        <section className="card section">
          <h2 className="title">Recursos</h2>
          <ul>
            <li>Autenticação JWT</li>
            <li>Paginação</li>
            <li>Validações</li>
            <li>3 CRUDs completos</li>
            <li>Relacionamentos entre entidades</li>
          </ul>
        </section>
      </div>
    </AppLayout>
  );
};
