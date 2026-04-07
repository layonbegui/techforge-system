import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { useAuth } from '../contexts/AuthContext';
import { emailRegex } from '../utils/validators';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
      setError('Informe um e-mail válido.');
      return;
    }

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch {
      setError('Não foi possível entrar. Verifique os dados.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card card">
        <h1 className="title">Entrar</h1>
        <p className="subtitle">Acesse o sistema Tech Forge.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <InputField label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <span className="error">{error}</span>}
          <button className="btn btn-primary" type="submit">Entrar</button>
          <Link to="/register" className="muted">Criar conta</Link>
        </form>
      </div>
    </div>
  );
};
