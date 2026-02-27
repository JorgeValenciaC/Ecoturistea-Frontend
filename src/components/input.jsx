const Input = ({ label, type, placeholder, value, onChange, required }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm font-bold text-stone-700 ml-1 italic uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}         // Conecta con el estado
        onChange={onChange}   // Captura lo que escribes
        required={required}
        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-green-700 outline-none transition-all font-medium text-stone-800"
      />
    </div>
  );
};

export default Input;