import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import './Products.css';

export default function Products() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [modal, setModal] = useState({ open: false, product: null });
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = availableOnly
        ? await productsAPI.getAvailable()
        : await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [availableOnly]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = async (form) => {
    try {
      if (modal.product) {
        await productsAPI.update(modal.product.id, form);
        showToast('Produto atualizado!');
      } else {
        await productsAPI.create(form);
        showToast('Produto criado!');
      }
      setModal({ open: false, product: null });
      fetchProducts();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await productsAPI.delete(id);
      showToast('Produto removido!');
      setDeleteId(null);
      fetchProducts();
    } catch {
      showToast('Erro ao remover produto.');
    }
  };

  return (
    <div className="products-page">
      {toast && <div className="toast animate-fade-up">{toast}</div>}

      <div className="products-header">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p className="page-subtitle">{products.length} itens disponíveis no catálogo</p>
        </div>
        {isAdmin && (
          <button className="btn-add" onClick={() => setModal({ open: true, product: null })}>
            + Novo produto
          </button>
        )}
      </div>

      <div className="products-filters">
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          Apenas em estoque
        </label>
      </div>

      {loading ? (
        <div className="products-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="product-skeleton" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <p>Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              style={{ animationDelay: `${i * 0.04}s` }}
              onEdit={() => setModal({ open: true, product })}
              onDelete={() => setDeleteId(product.id)}
            />
          ))}
        </div>
      )}

      {modal.open && (
        <ProductModal
          product={modal.product}
          onSave={handleSave}
          onClose={() => setModal({ open: false, product: null })}
        />
      )}

      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="confirm-modal animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <h3>Remover produto?</h3>
            <p>Essa ação não pode ser desfeita.</p>
            <div className="confirm-actions">
              <button className="btn-ghost" onClick={() => setDeleteId(null)}>Cancelar</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Remover</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
