import { MapPin, Clock, Star } from 'lucide-react';

const RouteCard = ({ title, location, duration, difficulty, image, rating }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100 h-full flex flex-col">
      {/* Contenedor de Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          loading='lazy' 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-green-800 shadow-sm uppercase tracking-wider">
          {difficulty}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-800 leading-tight group-hover:text-green-800 transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-amber-500 shrink-0">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm font-bold text-stone-600">{rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-stone-500 text-sm font-medium">
            <MapPin size={16} className="mr-2 text-green-600" />
            {location}
          </div>
          <div className="flex items-center text-stone-500 text-sm font-medium">
            <Clock size={16} className="mr-2 text-green-600" />
            {duration}
          </div>
        </div>

        {/* Botón Simple */}
        <div className="mt-auto">
          <button className="w-full py-3 bg-stone-50 text-green-700 font-bold rounded-xl group-hover:bg-green-700 group-hover:text-white transition-all duration-300">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;