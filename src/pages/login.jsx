import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Input from '../components/input';

const Login = () => {
  const [isPC, setIsPC] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-100 p-0 lg:p-12 font-sans">
      <div className="flex flex-row-reverse w-full max-w-7xl bg-white rounded-none lg:rounded-[2.5rem] shadow-none lg:shadow-2xl overflow-hidden min-h-screen lg:min-h-[750px]">
        
        {/* LADO DERECHO: Formulario */}
        <motion.div 
          initial={isPC ? { x: 150, opacity: 0 } : {}}
          animate={isPC ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-20"
        >
          <div className="w-full max-w-md">
            <h2 className="text-4xl lg:text-5xl font-black text-green-900 mb-4">¡Bienvenido!</h2>
            <p className="text-stone-500 mb-8 lg:mb-12 text-base lg:text-lg">Inicia sesión para continuar tu aventura.</p>

            <form className="space-y-6">
              <Input label="Email" type="email" placeholder="aventurero@email.com" />
              <Input label="Contraseña" type="password" placeholder="••••••••" />
              
              <button className="w-full bg-green-900 text-white font-bold py-4 lg:py-5 rounded-2xl shadow-xl text-lg mt-6">
                Ingresar al sistema
              </button>
            </form>

            <p className="mt-8 lg:mt-12 text-center text-stone-600 font-medium">
              ¿No tienes cuenta? <Link to="/register" className="text-green-700 font-bold hover:underline">Regístrate gratis</Link>
            </p>
          </div>
        </motion.div>

        {/* LADO IZQUIERDO: Imagen (Solo PC) */}
        <motion.div 
          initial={isPC ? { x: -150, opacity: 0 } : {}}
          animate={isPC ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block lg:w-[60%] relative bg-stone-200"
        >
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Bosque Niebla"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;