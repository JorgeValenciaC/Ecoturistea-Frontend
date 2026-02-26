import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Compass, Map, Calendar, Heart, User, X, Check } from 'lucide-react';
import RouteCard from '../components/RouteCard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Explorar');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");

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
    { title: "Camino de Isaza", location: "Barbosa, Antioquia", duration: "5 Horas", difficulty: "Media", rating: "4.5", image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800" },
    { title: "Cerro Tusa", location: "Venecia (Antioquia)", duration: "5 Horas", difficulty: "Muy Difícil", rating: "5.0", image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=800" },
    { title: "Reserva La Romera", location: "Sabaneta, Antioquia", duration: "3 Horas", difficulty: "Media", rating: "4.6", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800" },
    { title: "Charcos de San Rafael", location: "San Rafael, Oriente", duration: "4 Horas", difficulty: "Fácil", rating: "4.8", image: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=800" },
    { title: "Farallones de Citará", location: "Betania", duration: "10 Horas", difficulty: "Experto", rating: "5.0", image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800" },
    { title: "La Catedral", location: "Envigado, Antioquia", duration: "4 Horas", difficulty: "Media", rating: "4.4", image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=800" },
    { title: "Páramo del Sol", location: "Urrao, Antioquia", duration: "12 Horas", difficulty: "Experto", rating: "5.0", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" }
  ];

  // Lógica de filtrado combinada (Buscador + Dificultad)
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "Todas" || route.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = ["Todas", "Fácil", "Media", "Difícil", "Muy Difícil", "Experto"];

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-stone-200 flex-col p-8 sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-green-800 tracking-tighter italic">ECOTURISTEA</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          {[
            { name: 'Explorar', icon: Compass },
            { name: 'Mis Rutas', icon: Map },
            { name: 'Reservas', icon: Calendar },
            { name: 'Favoritos', icon: Heart },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.name 
                ? 'bg-green-700 text-white shadow-lg shadow-green-200' 
                : 'text-stone-400 hover:bg-stone-50 hover:text-green-700'
              }`}
            >
              <item.icon size={22} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-stone-100">
          <button className="w-full flex items-center space-x-4 px-6 py-4 text-stone-400 font-bold hover:text-red-500 transition-colors">
            <User size={22} />
            <span>Mi Perfil</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black text-stone-800 tracking-tight">Hola, Jorge 👋</h2>
            <p className="text-stone-500 font-medium">¿Qué rincón de Antioquia descubriremos hoy?</p>
          </div>
          
          <div className="flex items-center space-x-4 relative">
            {/* INPUT DE BÚSQUEDA */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-green-700 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar rutas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-green-700 w-full md:w-80 transition-all outline-none"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* BOTÓN DE FILTRO Y DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className={`p-4 rounded-2xl shadow-sm transition-all ${
                  filterOpen || difficultyFilter !== "Todas" 
                  ? 'bg-green-700 text-white' 
                  : 'bg-white text-stone-400 hover:text-green-700'
                }`}
              >
                <Filter size={20} />
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 p-4 z-50"
                  >
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 px-2">Dificultad</p>
                    <div className="space-y-1">
                      {difficulties.map((diff) => (
                        <button
                          key={diff}
                          onClick={() => {
                            setDifficultyFilter(diff);
                            setFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                            difficultyFilter === diff 
                            ? 'bg-green-50 text-green-700' 
                            : 'text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {diff}
                          {difficultyFilter === diff && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* INFO DE RESULTADOS */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h4 className="text-2xl font-black text-stone-800 tracking-tight">
               {difficultyFilter === "Todas" ? "Rutas populares" : `Rutas ${difficultyFilter}`}
            </h4>
            {difficultyFilter !== "Todas" && (
                <button 
                  onClick={() => setDifficultyFilter("Todas")}
                  className="bg-stone-200 text-stone-600 text-[10px] font-black px-2 py-1 rounded-md uppercase hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  Limpiar Filtro
                </button>
            )}
          </div>
          <span className="bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1 rounded-full">
            {filteredRoutes.length} Resultados
          </span>
        </div>

        {/* GRID DE TARJETAS */}
        {filteredRoutes.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredRoutes.map((route) => (
                <motion.div
                  key={route.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <RouteCard {...route} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-stone-200">
            <Map className="text-stone-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-stone-800">No hay rutas aquí</h3>
            <p className="text-stone-500">Intenta cambiando el nombre o el filtro de dificultad.</p>
            <button 
                onClick={() => { setSearchTerm(""); setDifficultyFilter("Todas"); }}
                className="mt-4 text-green-700 font-bold hover:underline"
            >
                Mostrar todo de nuevo
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;