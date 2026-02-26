import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Zap, Map, Heart, Calendar, User, Camera, CheckCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Rutas', value: '24', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Km', value: '158', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Reservas', value: '3', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Favoritos', value: '12', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      {/* Header Navegación */}
      <nav className="p-6 flex items-center justify-between bg-white border-b border-stone-100 sticky top-0 z-50">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-stone-600 font-bold hover:text-green-800 transition-colors"
        >
          <ChevronLeft size={24} />
          <span>Explorador</span>
        </button>
        <h1 className="text-sm font-black text-green-800 tracking-tighter uppercase italic">ECOTURISTEA</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* Card de Perfil Principal */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden">
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-green-800 to-emerald-900 shadow-inner" />
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-6">
              {/* Avatar con icono de usuario */}
              <div className="p-1 bg-white rounded-[2.5rem] shadow-xl">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-stone-100 rounded-[2rem] flex items-center justify-center text-stone-400">
                  <User size={60} strokeWidth={1.5} />
                </div>
              </div>
              
              {/* BOTÓN DE EDITAR FOTO (Sustituye a Configuración) */}
              <div className="flex space-x-3 mb-4">
                <button 
                  className="group flex items-center space-x-2 bg-green-700 text-white px-5 py-3 rounded-2xl font-bold hover:bg-green-800 transition-all shadow-lg shadow-green-200"
                  title="Editar foto de perfil"
                >
                  <Camera size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Editar Perfil</span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-black text-stone-800 tracking-tight">Jorge Valencia</h3>
                <CheckCircle size={20} className="text-blue-500 fill-blue-50" />
              </div>
              <p className="text-stone-500 font-medium flex items-center gap-2 mt-1">
                <Award size={18} className="text-green-700" /> Miembro desde Enero 2024
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${stat.bg} p-6 rounded-[2rem] border border-stone-50 hover:shadow-md transition-all`}
                >
                  <stat.icon className={`${stat.color} mb-2`} size={24} />
                  <p className="text-2xl font-black text-stone-800">{stat.value}</p>
                  <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Personal */}
        <div className="mt-8 bg-white rounded-[3rem] p-8 shadow-sm border border-stone-100">
          <h4 className="text-xl font-black text-stone-800 mb-6 px-2">Datos de Explorador</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-5 bg-stone-50 rounded-[1.5rem] border border-stone-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Nombre Completo</span>
                <span className="text-stone-800 font-bold">Jorge Valencia</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 bg-stone-50 rounded-[1.5rem] border border-stone-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Correo Electrónico</span>
                <span className="text-stone-800 font-bold">jorge.valencia@email.com</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 bg-stone-50 rounded-[1.5rem] border border-stone-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Ubicación</span>
                <span className="text-stone-800 font-bold">Medellín, Antioquia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;