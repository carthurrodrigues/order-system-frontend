import './ProductCard.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

export default function ProductCard({ product, isAdmin, onEdit, onDelete, style }) {
  const inStock = product.stockQuantity > 0;

  return (
    <div className="product-card animate-fade-up" style={style}>
      <div className="product-card-header">
        <div className="product-icon">
          {product.name.charAt(0).toUpperCase()}
        </div>
        <span className={`stock-badge ${inStock ? 'in-stock' : 'out-stock'}`}>
          {inStock ? `${product.stockQuantity} un.` : 'Sem estoque'}
        </span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>

      {isAdmin && (
        <div className="product-actions">
          <button className="action-btn edit" onClick={onEdit}>Editar</button>
          <button className="action-btn delete" onClick={onDelete}>Remover</button>
        </div>
      )}
    </div>
  );
}
