import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PageHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="card header">
      <div>
        <div className="muted">Área logada</div>
        <strong>{user?.name}</strong>
      </div>
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/categories">Categorias</Link>
        <Link to="/products">Produtos</Link>
        <Link to="/orders">Pedidos</Link>
        <button className="btn btn-secondary" onClick={signOut}>Sair</button>
      </nav>
    </header>
  );
};
