import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login'; 
import Register from './pages/register';
import Dashboard from './pages/Dashboard'; // Importamos el nuevo Dashboard

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 1. Ruta raíz: Redirige al login al abrir la app */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Ruta de Registro */}
        <Route path="/register" element={<Register />} />

        {/* 3. Ruta de Login */}
        <Route path="/login" element={<Login />} />

        {/* 4. Ruta del Dashboard (La nueva página principal) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 5. Ruta de error 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-stone-50">
            <div className="text-center">
              <h1 className="text-6xl mb-4">🍃</h1>
              <h1 className="text-2xl font-black text-green-900">
                404 - Bosque no encontrado
              </h1>
              <p className="text-stone-500 mt-2 font-medium">Parece que te has salido del sendero.</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;