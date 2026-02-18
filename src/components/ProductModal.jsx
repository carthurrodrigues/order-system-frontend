import { useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stockQuantity: product?.stockQuantity || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSave({
        ...form,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity),
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors
        ? Object.values(err.response.data.errors || {}).join(', ')
        : 'Erro ao salvar produto';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Editar produto' : 'Novo produto'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="field">
            <label>Nome *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nome do produto" required />
          </div>
          <div className="field">
            <label>Descrição</label>
            <input name="description" value={form.description} onChange={handleChange} placeholder="Descrição opcional" />
          </div>
          <div className="modal-row">
            <div className="field">
              <label>Preço (R$) *</label>
              <input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} placeholder="0,00" required />
            </div>
            <div className="field">
              <label>Estoque *</label>
              <input name="stockQuantity" type="number" min="0" value={form.stockQuantity} onChange={handleChange} placeholder="0" required />
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '10px 24px' }}>
              {loading ? <span className="spinner" /> : (product ? 'Salvar' : 'Criar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
