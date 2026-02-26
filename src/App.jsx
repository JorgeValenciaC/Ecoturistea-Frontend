import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login'; 
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; // 1. Importamos la nueva página de Perfil

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Ruta raíz: Redirige al login al abrir la app */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta de Registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta de Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta del Dashboard (Explorador de rutas) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 2. Ruta de Perfil (La nueva página independiente) */}
        <Route path="/profile" element={<Profile />} />

        {/* Ruta de error 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-stone-50">
            <div className="text-center">
              <h1 className="text-6xl mb-4">🍃</h1>
              <h1 className="text-2xl font-black text-green-900">
                404 - Bosque no encontrado
              </h1>
              <p className="text-stone-500 mt-2 font-medium">Parece que te has salido del sendero.</p>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="mt-4 text-green-700 font-bold underline"
              >
                Volver al sendero principal
              </button>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;