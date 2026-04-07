import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { AppLayout } from '../layout/AppLayout';
import { Category, Product } from '../types';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';

export const ProductsPage = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', categoryId: '' });

  const load = async () => {
    const [productsResponse, categoriesResponse] = await Promise.all([
      api.get<{ items: Product[] }>('/products'),
      api.get<{ items: Category[] }>('/categories')
    ]);
    setItems(productsResponse.data.items);
    setCategories(categoriesResponse.data.items);
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price)
    };
    if (editingId) await api.put(`/products/${editingId}`, payload);
    else await api.post('/products', payload);
    setEditingId('');
    setForm({ name: '', description: '', price: '', categoryId: '' });
    await load();
  };

  const remove = async (id: string) => {
    await api.delete(`/products/${id}`);
    await load();
  };

  return (
    <AppLayout>
      <div className="grid grid-2">
        <section className="card section">
          <h1 className="title">Produtos</h1>
          <form className="form-grid" onSubmit={handleSubmit}>
            <InputField label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <InputField label="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <InputField label="Preço" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <SelectField label="Categoria" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              options={categories.map((item) => ({ value: item.id, label: item.name }))} />
            <button className="btn btn-primary" type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
          </form>
        </section>
        <section className="card section table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Preço</th><th>Categoria</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>R$ {item.price.toFixed(2)}</td>
                  <td>{item.category?.name}</td>
                  <td className="actions">
                    <button className="btn btn-secondary" onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        name: item.name,
                        description: item.description,
                        price: String(item.price),
                        categoryId: item.categoryId
                      });
                    }}>Editar</button>
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
