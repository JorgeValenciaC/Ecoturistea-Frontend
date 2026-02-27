import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Todos los iconos importados correctamente para evitar errores
import { 
  ChevronLeft, 
  Clock, 
  Star, 
  MapPin, 
  Thermometer, 
  ShieldCheck, 
  Check, 
  Mountain, 
  Info, 
  AlertTriangle, 
  Heart 
} from 'lucide-react';

const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para el corazón de favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Datos de las rutas
  const routesData = {
    "paramo-de-belmira": {
      title: "Páramo de Belmira",
      location: "Belmira, Antioquia",
      duration: "7 Horas",
      difficulty: "Difícil",
      rating: "4.9",
      temp: "8°C - 12°C",
      altitude: "3.350 msnm",
      longDescription: "Un ecosistema de alta montaña vital para el agua de Antioquia. Caminarás entre frailejones y verás lagunas glaciales en un paisaje nublado y majestuoso.",
      tips: ["Ropa térmica obligatoria", "Botas impermeables", "No tocar frailejones"],
      includes: ["Guía certificado", "Seguro médico", "Ingreso a reserva"],
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
    },
    "reserva-el-romeral": {
      title: "Reserva El Romeral",
      location: "La Estrella",
      duration: "4 Horas",
      difficulty: "Media",
      rating: "4.7",
      temp: "14°C - 18°C",
      altitude: "2.800 msnm",
      longDescription: "Bosque de niebla con una biodiversidad increíble. Es ideal para avistamiento de aves y desconexión total cerca de la ciudad.",
      tips: ["Llevar impermeable", "Cámara para aves", "Repelente"],
      includes: ["Guía local", "Snack saludable", "Transporte retorno"],
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200"
    },
    "parque-arvi": {
      title: "Parque Arví",
      location: "Santa Elena",
      duration: "3 Horas",
      difficulty: "Fácil",
      rating: "4.8",
      temp: "12°C - 16°C",
      altitude: "2.500 msnm",
      longDescription: "Un paraíso natural accesible por Metrocable. Ofrece senderos prehispánicos, mercados locales y una inmersión total en el bosque de pinos.",
      tips: ["Llevar bloqueador", "Usar el Metrocable", "Probar las fresas locales"],
      includes: ["Recorrido guiado", "Acceso a senderos", "Tarjeta de asistencia"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
    },
    "salto-del-buey": {
      title: "Salto del Buey",
      location: "La Ceja / Abejorral",
      duration: "5 Horas",
      difficulty: "Media",
      rating: "5.0",
      temp: "15°C - 20°C",
      altitude: "2.100 msnm",
      longDescription: "Una de las cascadas más imponentes de Antioquia. Puedes disfrutar de una caminata escénica o incluso hacer canopy frente a la caída de agua.",
      tips: ["Ropa de cambio", "Cámara resistente al agua", "Llegar temprano"],
      includes: ["Entrada al parque", "Seguro", "Acceso a miradores"],
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=1200"
    }
    // Puedes seguir agregando el resto aquí...
  };

  const route = routesData[id] || routesData["paramo-de-belmira"];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-stone-50"
    >
      {/* Hero Section */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
        
        {/* BOTONES SUPERIORES */}
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          {/* ICONO DE FAVORITOS */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 backdrop-blur-md rounded-2xl transition-all duration-300 shadow-lg ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="absolute bottom-10 left-8 right-8 text-white z-10">
          <span className="px-3 py-1 bg-green-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
            {route.difficulty}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-2 italic uppercase tracking-tighter leading-none">
            {route.title}
          </h1>
          <p className="flex items-center text-stone-200 font-bold italic">
            <MapPin size={18} className="mr-2 text-green-400" /> {route.location}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: "Duración", val: route.duration, color: "text-blue-500" },
            { icon: Star, label: "Clima", val: route.temp, color: "text-red-500" },
            { icon: Mountain, label: "Altitud", val: route.altitude, color: "text-emerald-500" },
            { icon: ShieldCheck, label: "Seguro", val: "Incluido", color: "text-purple-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
              <item.icon className={item.color} size={24} />
              <p className="text-[10px] font-black text-stone-400 uppercase mt-2 tracking-tighter">{item.label}</p>
              <p className="font-bold text-stone-800 text-sm italic">{item.val}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm">
              <h3 className="text-xl font-black text-stone-800 mb-4 flex items-center gap-2 italic uppercase">
                <Info className="text-green-600" size={24} /> Resumen del sitio
              </h3>
              <p className="text-stone-600 leading-relaxed text-lg font-medium italic">
                {route.longDescription}
              </p>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-amber-100">
              <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center gap-2 italic uppercase">
                <AlertTriangle className="text-amber-500" size={24} /> Recomendaciones
              </h3>
              <ul className="space-y-4">
                {route.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 font-bold italic text-sm">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Checkbox / Includes Sidebar */}
          <div className="space-y-6">
            <div className="bg-green-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-100">
              <h3 className="text-lg font-black mb-6 italic uppercase tracking-widest border-b border-green-700 pb-2 flex items-center gap-2">
                <Check size={20} /> Incluye:
              </h3>
              <ul className="space-y-4">
                {route.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-green-100 text-sm font-bold italic">
                    <div className="bg-green-700 p-1 rounded-lg">
                      <Check size={14} className="text-green-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RouteDetail;