import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Agregamos useNavigate
import { Eye, EyeOff, Loader2 } from 'lucide-react'; 
import Input from '../components/input';
import { supabase } from '../lib/supabaseClient'; // Importamos la conexión

const Register = () => {
  const navigate = useNavigate();
  const [isPC, setIsPC] = useState(window.innerWidth >= 1024);
  
  // ESTADOS PARA EL FORMULARIO
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // ESTADOS DE UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FUNCIÓN PARA REGISTRAR
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Validación básica de coincidencia
    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      // 1. Registro en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName, // Guardamos el nombre en el metadata
          }
        }
      });

      if (error) throw error;

      if (data) {
        alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        navigate('/login');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-100 p-0 lg:p-12 font-sans">
      <div className="flex w-full max-w-7xl bg-white rounded-none lg:rounded-[2.5rem] shadow-none lg:shadow-2xl overflow-hidden min-h-screen lg:min-h-[750px]">
        
        {/* LADO IZQUIERDO: Formulario */}
        <motion.div 
          initial={isPC ? { x: -150, opacity: 0 } : {}}
          animate={isPC ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-20 bg-white"
        >
          <div className="w-full max-w-md">
            <h2 className="text-4xl lg:text-5xl font-black text-green-900 mb-4 tracking-tight">Crea tu cuenta</h2>
            <p className="text-stone-500 mb-8 lg:mb-10 text-base lg:text-lg font-medium leading-relaxed">
              Únete a la mayor red de ecoturismo en el Valle de Aburrá.
            </p>

            {/* Mensaje de Error */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
                {errorMsg}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>
              <Input 
                label="Nombre completo" 
                type="text" 
                placeholder="Ej: Jorge Valencia" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input 
                label="Correo electrónico" 
                type="email" 
                placeholder="jorge@ecoturistea.com" 
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

              <div className="relative group">
                <Input 
                  label="Confirma tu contraseña" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onMouseDown={() => setShowConfirmPassword(true)}
                  onMouseUp={() => setShowConfirmPassword(false)}
                  onTouchStart={() => setShowConfirmPassword(true)}
                  onTouchEnd={() => setShowConfirmPassword(false)}
                  className="absolute right-4 top-[40px] text-stone-400 hover:text-green-700 transition-all duration-300 opacity-100 select-none outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 text-white font-bold py-4 lg:py-5 rounded-2xl shadow-xl text-lg mt-4 lg:mt-8 hover:bg-green-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Registrarme ahora"}
              </button>
            </form>

            <p className="mt-8 lg:mt-10 text-center text-stone-600 font-medium">
              ¿Ya eres miembro? <Link to="/login" className="text-green-700 font-bold hover:underline">Inicia sesión aquí</Link>
            </p>
          </div>
        </motion.div>

        {/* LADO DERECHO: Imagen */}
        <motion.div 
          initial={isPC ? { x: 150, opacity: 0 } : {}}
          animate={isPC ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block lg:w-[60%] relative bg-stone-200"
        >
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Bosque Niebla Medellín"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-brightness-95" />
          <div className="absolute bottom-20 left-12 right-12 text-white z-20">
            <h3 className="text-5xl font-black mb-4 leading-tight drop-shadow-2xl">Explora los pulmones de Medellín</h3>
            <p className="text-xl text-green-50/90 max-w-xl font-medium drop-shadow-lg">Desde caminatas en Santa Elena hasta reservas protegidas en Envigado.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;