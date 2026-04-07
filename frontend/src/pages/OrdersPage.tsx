import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { AppLayout } from '../layout/AppLayout';
import { Order, Product } from '../types';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';

export const OrdersPage = () => {
  const [items, setItems] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState({ productId: '', quantity: '', status: '' });

  const load = async () => {
    const [ordersResponse, productsResponse] = await Promise.all([
      api.get<{ items: Order[] }>('/orders'),
      api.get<{ items: Product[] }>('/products')
    ]);
    setItems(ordersResponse.data.items);
    setProducts(productsResponse.data.items);
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form, quantity: Number(form.quantity) };
    if (editingId) await api.put(`/orders/${editingId}`, payload);
    else await api.post('/orders', payload);
    setEditingId('');
    setForm({ productId: '', quantity: '', status: '' });
    await load();
  };

  const remove = async (id: string) => {
    await api.delete(`/orders/${id}`);
    await load();
  };

  return (
    <AppLayout>
      <div className="grid grid-2">
        <section className="card section">
          <h1 className="title">Pedidos</h1>
          <form className="form-grid" onSubmit={handleSubmit}>
            <SelectField label="Produto" value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}
              options={products.map((item) => ({ value: item.id, label: item.name }))} />
            <InputField label="Quantidade" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <InputField label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
            <button className="btn btn-primary" type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
          </form>
        </section>
        <section className="card section table-wrap">
          <table>
            <thead><tr><th>Produto</th><th>Quantidade</th><th>Total</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product?.name}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {item.total.toFixed(2)}</td>
                  <td>{item.status}</td>
                  <td className="actions">
                    <button className="btn btn-secondary" onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        productId: item.productId,
                        quantity: String(item.quantity),
                        status: item.status
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
