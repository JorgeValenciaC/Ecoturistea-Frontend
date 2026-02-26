import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Compass, Heart, User, X, Check, Menu, Map } from 'lucide-react';
import RouteCard from '../components/RouteCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Explorar');

  // Menú simplificado: Solo Explorar, Favoritos y Perfil
  const menuItems = [
    { name: 'Explorar', icon: Compass, path: '/dashboard' },
    { name: 'Favoritos', icon: Heart, path: '#' },
    { name: 'Mi Perfil', icon: User, path: '/profile' },
  ];

  const routes = [
    { title: "Páramo de Belmira", location: "Belmira, Antioquia", duration: "7 Horas", difficulty: "Difícil", rating: "4.9", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { title: "Reserva El Romeral", location: "La Estrella", duration: "4 Horas", difficulty: "Media", rating: "4.7", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800" },
    { title: "Parque Arví", location: "Santa Elena", duration: "3 Horas", difficulty: "Fácil", rating: "4.8", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
    { title: "Salto del Buey", location: "La Ceja / Abejorral", duration: "5 Horas", difficulty: "Media", rating: "5.0", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" },
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

  const difficulties = ["Todas", "Fácil", "Media", "Difícil", "Muy Difícil", "Experto"];

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-stone-200 flex-col p-8 sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-green-800 tracking-tighter italic">ECOTURISTEA</h1>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.slice(0, 2).map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.name ? 'bg-green-700 text-white shadow-lg shadow-green-200' : 'text-stone-400 hover:text-green-700'}`}
            >
              <item.icon size={22} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="pt-8 border-t border-stone-100">
          <button 
            onClick={() => navigate('/profile')}
            className="w-full flex items-center space-x-4 px-6 py-4 text-stone-400 font-bold hover:text-green-700 transition-colors"
          >
            <User size={22} />
            <span>Mi Perfil</span>
          </button>
        </div>
      </aside>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[70] lg:hidden p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-xl font-black text-green-800">ECOTURISTEA</h1>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-stone-100 rounded-full"><X size={20} /></button>
              </div>
              <nav className="space-y-4 flex-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { 
                      if(item.path !== '#') navigate(item.path);
                      else setActiveTab(item.name);
                      setIsMenuOpen(false); 
                    }}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.name ? 'bg-green-700 text-white' : 'text-stone-400'}`}
                  >
                    <item.icon size={22} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 lg:p-12 overflow-y-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-3 bg-white rounded-xl shadow-sm text-green-800">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-stone-800 tracking-tight">Hola, Jorge 👋</h2>
              <p className="hidden md:block text-stone-500 font-medium tracking-tight">Explora las mejores rutas de Antioquia.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text" placeholder="Buscar rutas..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-10 py-3 lg:py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-green-700 w-full md:w-80 outline-none text-sm"
              />
            </div>
            <button onClick={() => setFilterOpen(!filterOpen)} className={`p-3 lg:p-4 rounded-2xl shadow-sm transition-all ${filterOpen || difficultyFilter !== "Todas" ? 'bg-green-700 text-white' : 'bg-white text-stone-400'}`}>
              <Filter size={20} />
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl lg:text-2xl font-black text-stone-800 tracking-tight">
             {difficultyFilter === "Todas" ? "Rutas populares" : `Rutas ${difficultyFilter}`}
          </h4>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            {filteredRoutes.length} resultados
          </span>
        </div>

        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.title} {...route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
            <Map className="mx-auto text-stone-300 mb-4" size={40} />
            <p className="text-stone-500 font-bold">No encontramos esa ruta 🍃</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;