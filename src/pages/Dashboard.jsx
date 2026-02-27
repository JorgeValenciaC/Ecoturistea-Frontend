import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Compass, Heart, User, X, Menu, LogOut } from 'lucide-react';
import RouteCard from '../components/RouteCard';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Viajero");

  // EFECTO: Verificar usuario y cargar nombre
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || user.email.split('@')[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      } else {
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);

  const difficulties = ["Todas", "Fácil", "Media", "Difícil", "Muy Difícil", "Experto"];

  const routes = [
    { title: "Páramo de Belmira", location: "Belmira, Antioquia", duration: "7 Horas", difficulty: "Difícil", rating: "4.9", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { title: "Reserva El Romeral", location: "La Estrella", duration: "4 Horas", difficulty: "Media", rating: "4.7", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800" },
    { title: "Parque Arví", location: "Santa Elena", duration: "3 Horas", difficulty: "Fácil", rating: "4.8", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
    { title: "Salto del Buey", location: "La Ceja / Abejorral", duration: "5 Horas", difficulty: "Media", rating: "5.0", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=1200" },
    { title: "Cerro El Volador", location: "Robledo, Medellín", duration: "1.5 Horas", difficulty: "Fácil", rating: "4.4", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800" },
    { title: "Cerro Quitasol", location: "Bello, Antioquia", duration: "6 Horas", difficulty: "Difícil", rating: "4.7", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800" },
    { title: "Cueva del Esplendor", location: "Jardín, Antioquia", duration: "4 Horas", difficulty: "Media", rating: "4.9", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" },
    { title: "Alto de San Miguel", location: "Caldas (Antioquia)", duration: "5 Horas", difficulty: "Media", rating: "4.8", image: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800" },
    { title: "Cerro las Tres Cruces", location: "Belén, Medellín", duration: "2 Horas", difficulty: "Media", rating: "4.5", image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800" },
    { title: "Cerro Tusa", location: "Venecia (Antioquia)", duration: "5 Horas", difficulty: "Muy Difícil", rating: "5.0", image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=800" },
    { title: "Farallones de Citará", location: "Betania", duration: "10 Horas", difficulty: "Experto", rating: "5.0", image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800" },
    { title: "La Catedral", location: "Envigado, Antioquia", duration: "4 Horas", difficulty: "Media", rating: "4.4", image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "Todas" || route.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleViewDetails = (title) => {
    const routeId = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");
    navigate(`/route/${routeId}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans overflow-x-hidden">
      
      {/* MENÚ MÓVIL (HAMBURGUESA) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-[70] p-6 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-green-900 italic">ECOTURISTEA</h2>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="space-y-4 flex-1">
                <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 w-full p-4 bg-green-50 text-green-800 rounded-2xl font-bold italic">
                   <Compass size={22}/> Explorar
                </button>
                <div className="flex items-center justify-between p-4 text-stone-300 font-bold italic opacity-60">
                   <div className="flex items-center gap-4"><Heart size={22}/> Favoritos</div>
                   <span className="text-[8px] bg-stone-100 px-2 py-1 rounded-lg text-stone-400 font-black uppercase">Pronto</span>
                </div>
                <button onClick={() => {navigate('/profile'); setIsMenuOpen(false)}} className="flex items-center gap-4 w-full p-4 text-stone-400 font-bold italic">
                   <User size={22}/> Mi Perfil
                </button>
              </nav>
              <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-red-500 font-bold italic border-t border-stone-100">
                <LogOut size={22}/> Cerrar Sesión
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SIDEBAR PC */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-stone-200 flex-col p-6 h-screen sticky top-0">
        <h2 className="text-2xl font-black text-green-900 italic mb-10 uppercase">Ecoturistea</h2>
        <nav className="space-y-2 flex-1">
          <button className="flex items-center gap-4 w-full p-4 bg-green-50 text-green-800 rounded-2xl font-bold italic">
            <Compass size={22} /> Explorar
          </button>
          <button className="flex items-center justify-between w-full p-4 text-stone-300 rounded-2xl font-bold italic cursor-not-allowed">
            <div className="flex items-center gap-4"><Heart size={22} /> Favoritos</div>
            <span className="text-[8px] bg-stone-100 px-2 py-1 rounded-lg text-stone-400 font-black">Pronto</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex items-center gap-4 w-full p-4 text-stone-400 hover:text-green-700 rounded-2xl font-bold italic transition-all">
            <User size={22} /> Mi Perfil
          </button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-4 w-full p-4 text-red-500 font-bold italic border-t border-stone-100 mt-auto">
          <LogOut size={22} /> Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full relative">
        <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md px-4 lg:px-12 py-4 border-b border-stone-200/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-3 bg-white rounded-xl shadow-md text-green-800 lg:hidden">
                <Menu size={24} />
              </button>
              <h2 className="text-xl lg:text-3xl font-black text-stone-800 tracking-tight italic">Hola, {userName} 👋</h2>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar rutas..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-10 py-3 bg-white border-none rounded-2xl shadow-sm w-full md:w-80 outline-none focus:ring-2 focus:ring-green-700/20"
                />
              </div>
              <button 
                onClick={() => setFilterOpen(!filterOpen)} 
                className={`p-3 rounded-2xl shadow-sm transition-all ${filterOpen || difficultyFilter !== "Todas" ? 'bg-green-700 text-white' : 'bg-white text-stone-400'}`}
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* PANEL FILTROS */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 py-4 border-t border-stone-200 mt-4">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase italic transition-all ${
                        difficultyFilter === diff 
                        ? 'bg-green-700 text-white shadow-md' 
                        : 'bg-white text-stone-Stone-500 border border-stone-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* GRILLA DE RUTAS */}
        <div className="px-4 lg:px-12 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <motion.div 
                  layout
                  key={route.title} 
                  onClick={() => handleViewDetails(route.title)} 
                  className="cursor-pointer active:scale-95 transition-transform"
                >
                  <RouteCard {...route} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-stone-400 font-bold italic">
                No hay rutas con estos criterios... 🏔️
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;