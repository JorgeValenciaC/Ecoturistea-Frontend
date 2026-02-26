const Input = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-green-900 font-semibold text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`p-3 rounded-lg border outline-none transition-all ${
          error ? 'border-red-500' : 'border-stone-300 focus:border-green-600'
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Input;