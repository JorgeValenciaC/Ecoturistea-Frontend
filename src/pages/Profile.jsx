import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Shield, LogOut } from 'lucide-react'; // Eliminados Camera y Loader2
import { supabase } from '../lib/supabaseClient';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Cargando...",
    email: "",
    avatar_url: null,
  });

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      navigate('/login');
    } else {
      setUserData({
        name: user.user_metadata?.full_name || "Viajero",
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url || null,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-lg font-black uppercase italic tracking-tighter text-stone-800">Mi Perfil</h1>
        <div className="w-10" />
      </div>

      <main className="max-w-md mx-auto px-6 py-10">
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {userData.avatar_url ? (
                <img 
                  src={userData.avatar_url} 
                  alt="Perfil" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User size={64} className="text-green-700" />
              )}
            </div>
            {/* Se ha eliminado el label con el icono de la cámara y el input de carga */}
          </div>

          <h2 className="mt-6 text-2xl font-black text-stone-800 italic uppercase tracking-tight text-center">
            {userData.name}
          </h2>
          <p className="text-stone-400 font-bold italic text-sm">{userData.email}</p>
        </div>

        <div className="space-y-4">
          <motion.section 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-2 shadow-sm border border-stone-100"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Correo Electrónico</p>
                <p className="font-bold text-stone-700 italic">{userData.email}</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-2 shadow-sm border border-stone-100"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Estado de Cuenta</p>
                <p className="font-bold text-stone-700 italic">Usuario Verificado</p>
              </div>
            </div>
          </motion.section>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase italic text-sm border border-red-100 hover:bg-red-100 transition-colors mt-6"
          >
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;