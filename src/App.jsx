import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login'; 
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 1. Ruta raíz: Redirige al registro al abrir la app */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Ruta de Registro */}
        <Route path="/register" element={<Register />} />

        {/* 3. Ruta de Login (SOLO UNA VEZ Y SIN NAVIGATE) */}
        <Route path="/login" element={<Login />} />

        {/* 4. Ruta de error 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-green-800 text-center p-4">
              404 - Bosque no encontrado 🍃
            </h1>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;