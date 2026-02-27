import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Shield, LogOut, Camera } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Cargando...",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        navigate('/login');
      } else {
        setUserData({
          name: user.user_metadata?.full_name || "Viajero",
          email: user.email,
        });
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* HEADER DE NAVEGACIÓN */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-lg font-black uppercase italic tracking-tighter text-stone-800">Mi Perfil</h1>
        <div className="w-10" /> {/* Espaciador para centrar el título */}
      </div>

      <main className="max-w-md mx-auto px-6 py-10">
        {/* AVATAR Y NOMBRE */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              <User size={64} className="text-green-700" />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-green-700 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <h2 className="mt-6 text-2xl font-black text-stone-800 italic uppercase tracking-tight">
            {userData.name}
          </h2>
          <p className="text-stone-400 font-bold italic text-sm">{userData.email}</p>
        </div>

        {/* LISTA DE OPCIONES */}
        <div className="space-y-4">
          <section className="bg-white rounded-[2rem] p-2 shadow-sm border border-stone-100">
            <div className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-2xl cursor-pointer transition-all">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Correo Electrónico</p>
                <p className="font-bold text-stone-700 italic">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-2xl cursor-pointer transition-all">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Seguridad</p>
                <p className="font-bold text-stone-700 italic">Cambiar Contraseña</p>
              </div>
            </div>
          </section>

          {/* BOTÓN CERRAR SESIÓN */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase italic text-sm hover:bg-red-100 transition-all border border-red-100"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;