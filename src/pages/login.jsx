import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Añadimos Loader2 para el feedback
import { supabase } from '../lib/supabaseClient'; // Importamos la conexión
import Input from '../components/input';

const Login = () => {
  const navigate = useNavigate();
  const [isPC, setIsPC] = useState(window.innerWidth >= 1024);
  
  // ESTADOS DEL FORMULARIO
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // ESTADOS DE UI
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FUNCIÓN DE LOGIN REAL
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos iniciar sesión con Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        // Si todo sale bien, vamos al dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Manejo de errores amigable
      setErrorMsg("Credenciales incorrectas o usuario no registrado.");
      console.error("Error detallado:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-100 p-0 lg:p-12 font-sans">
      <div className="flex flex-row-reverse w-full max-w-7xl bg-white rounded-none lg:rounded-[2.5rem] shadow-none lg:shadow-2xl overflow-hidden min-h-screen lg:min-h-[750px]">
        
        {/* LADO DERECHO: Formulario */}
        <motion.div 
          initial={isPC ? { x: 150, opacity: 0 } : {}}
          animate={isPC ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-20 bg-white"
        >
          <div className="w-full max-w-md">
            <h2 className="text-4xl lg:text-5xl font-black text-green-900 mb-4 tracking-tight">¡Bienvenido!</h2>
            <p className="text-stone-500 mb-8 lg:mb-12 text-base lg:text-lg font-medium leading-relaxed">
              Inicia sesión para continuar tu aventura.
            </p>

            {/* Mensaje de Error Visual */}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100"
              >
                {errorMsg}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <Input 
                label="Email" 
                type="email" 
                placeholder="example@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              
              <div className="relative group">
                <Input 
                  label="Contraseña" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onTouchStart={() => setShowPassword(true)}
                  onTouchEnd={() => setShowPassword(false)}
                  className="absolute right-4 top-[40px] text-stone-400 hover:text-green-700 transition-all duration-300 opacity-100 select-none outline-none"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-900 text-white font-bold py-4 lg:py-5 rounded-2xl shadow-xl text-lg mt-6 hover:bg-green-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Verificando...</span>
                  </>
                ) : (
                  "Iniciar Sesion"
                )}
              </button>
            </form>

            <p className="mt-8 lg:mt-12 text-center text-stone-600 font-medium">
              ¿No tienes cuenta? <Link to="/register" className="text-green-700 font-bold hover:underline">Regístrate gratis</Link>
            </p>
          </div>
        </motion.div>

        {/* LADO IZQUIERDO: Imagen */}
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
          <div className="absolute inset-0 bg-black/10 backdrop-brightness-95" />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;