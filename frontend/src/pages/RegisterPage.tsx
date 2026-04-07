import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { InputField } from '../components/InputField';
import { emailRegex, validateCpf, validateStrongPassword } from '../utils/validators';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', cpf: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!emailRegex.test(form.email)) return setError('E-mail inválido.');
    if (!validateCpf(form.cpf)) return setError('CPF inválido.');
    if (!validateStrongPassword(form.password)) return setError('Senha fraca.');
    if (form.password !== form.confirmPassword) return setError('As senhas não coincidem.');

    try {
      await api.post('/users', {
        name: form.name,
        email: form.email,
        cpf: form.cpf,
        password: form.password
      });
      setSuccess('Cadastro realizado com sucesso.');
      setTimeout(() => navigate('/login'), 800);
    } catch {
      setError('Não foi possível cadastrar.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card card">
        <h1 className="title">Criar conta</h1>
        <p className="subtitle">Preencha os dados obrigatórios.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <InputField label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <InputField label="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <InputField label="CPF" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
          <InputField label="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <InputField label="Confirmar senha" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          {error && <span className="error">{error}</span>}
          {success && <span className="success">{success}</span>}
          <button className="btn btn-primary" type="submit">Cadastrar</button>
          <Link to="/login" className="muted">Voltar para login</Link>
        </form>
      </div>
    </div>
  );
};
