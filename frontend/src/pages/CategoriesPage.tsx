import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { AppLayout } from '../layout/AppLayout';
import { Category } from '../types';
import { InputField } from '../components/InputField';

export const CategoriesPage = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState('');

  const load = async () => {
    const response = await api.get<{ items: Category[] }>('/categories');
    setItems(response.data.items);
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingId) await api.put(`/categories/${editingId}`, { name });
    else await api.post('/categories', { name });
    setName('');
    setEditingId('');
    await load();
  };

  const remove = async (id: string) => {
    await api.delete(`/categories/${id}`);
    await load();
  };

  return (
    <AppLayout>
      <div className="grid grid-2">
        <section className="card section">
          <h1 className="title">Categorias</h1>
          <form className="form-grid" onSubmit={handleSubmit}>
            <InputField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary" type="submit">
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
          </form>
        </section>
        <section className="card section table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="actions">
                    <button className="btn btn-secondary" onClick={() => { setEditingId(item.id); setName(item.name); }}>Editar</button>
                    <button className="btn btn-danger" onClick={() => void remove(item.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppLayout>
  );
};
