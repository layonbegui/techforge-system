import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { InputField } from '../components/InputField';
import { AppLayout } from '../layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { validateCpf, validateStrongPassword } from '../utils/validators';

export const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCpf(user.cpf);
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!validateCpf(cpf)) return setError('CPF inválido.');
    if (!validateStrongPassword(password)) return setError('Senha fraca.');
    if (password !== confirmPassword) return setError('As senhas não coincidem.');

    try {
      await api.put('/users/me', { name, cpf, password });
      await refreshUser();
      setMessage('Perfil atualizado com sucesso.');
    } catch {
      setError('Não foi possível atualizar o perfil.');
    }
  };

  return (
    <AppLayout>
      <section className="card section">
        <h1 className="title">Meu perfil</h1>
        <p className="subtitle">O e-mail é exibido, mas não pode ser alterado.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <InputField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="E-mail" value={user?.email || ''} disabled />
          <InputField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <InputField label="Nova senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Confirmar senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error && <span className="error">{error}</span>}
          {message && <span className="success">{message}</span>}
          <button className="btn btn-primary" type="submit">Salvar</button>
        </form>
      </section>
    </AppLayout>
  );
};
