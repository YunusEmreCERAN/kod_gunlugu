// src/App.jsx
import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Kod Günlüğü</h1>
        </Link>
      </header>
      <main>
        {/* Router'daki child (çocuk) elementler buraya render edilecek */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;