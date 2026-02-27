import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
// 1. Importamos el cliente que creaste en la carpeta lib
import { supabase } from './lib/supabaseClient';

// 2. Creamos una pequeña función de prueba
async function checkSupabase() {
  try {
    const { data, error } = await supabase.from('routes').select('*').limit(1);
    if (error) {
      console.log('❌ Error de conexión:', error.message);
    } else {
      console.log('✅ ¡Conectado a Supabase correctamente!', data);
    }
  } catch (err) {
    console.log('❌ Error inesperado:', err);
  }
}

// 3. Ejecutamos la prueba
checkSupabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);