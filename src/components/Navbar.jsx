import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/products" className="nav-logo">
          <span className="logo-icon">⬡</span>
          <span>OrderSystem</span>
        </Link>

        <div className="nav-links">
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
            Produtos
          </Link>
          {user && (
            <Link to="/my-orders" className={`nav-link ${isActive('/my-orders') ? 'active' : ''}`}>
              Meus Pedidos
            </Link>
          )}
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <div className="nav-user">
                <div className="nav-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <div className="nav-user-info">
                  <span className="nav-user-name">{user.name}</span>
                  {user.role === 'ADMIN' && <span className="nav-badge">Admin</span>}
                </div>
              </div>
              <button onClick={handleLogout} className="nav-logout">Sair</button>
            </>
          ) : (
            <Link to="/login" className="nav-btn-login">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
