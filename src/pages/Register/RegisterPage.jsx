import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, User, Mail, Phone, Lock, AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { extractApiError } from '../../api/apiError';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre:           '',
    apellido:         '',
    email:            '',
    telefono:         '',
    password:         '',
    confirmPassword:  '',
  });
  const [errors, setErrors]   = useState({});
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { register }          = useAuth();
  const navigate              = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim())    newErrors.nombre   = 'El nombre es requerido';
    if (!form.apellido.trim())  newErrors.apellido = 'El apellido es requerido';
    if (!form.email.trim())     newErrors.email    = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Correo inválido';
    if (!form.password)         newErrors.password = 'La contraseña es requerida';
    else if (form.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (form.telefono && !/^[\d\s\-\+\(\)]{7,15}$/.test(form.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    try {
      await register({
        nombre:   form.nombre.trim(),
        apellido: form.apellido.trim(),
        email:    form.email.trim().toLowerCase(),
        telefono: form.telefono.trim() || undefined,
        password: form.password,
      });
      navigate('/micuenta');
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'nombre',          label: 'Nombre',               icon: User,  type: 'text',     placeholder: 'Juan', required: true },
    { name: 'apellido',        label: 'Apellido',             icon: User,  type: 'text',     placeholder: 'Pérez', required: true },
    { name: 'email',           label: 'Correo electrónico',   icon: Mail,  type: 'email',    placeholder: 'juan@ejemplo.com', required: true },
    { name: 'telefono',        label: 'Teléfono (opcional)',  icon: Phone, type: 'tel',      placeholder: '300 123 4567', required: false },
    { name: 'password',        label: 'Contraseña (mín. 6 caracteres)', icon: Lock,  type: 'password', placeholder: 'Mínimo 6 caracteres', required: true },
    { name: 'confirmPassword', label: 'Confirmar contraseña', icon: Lock,  type: 'password', placeholder: 'Repite tu contraseña', required: true },
  ];

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
          <p className="text-primary-200 mt-1 text-sm">Únete a NeoMarket y empieza a comprar</p>
        </div>

        <div className="auth-body">
          <form id="register-form" onSubmit={handleSubmit} noValidate>
            {fields.map(({ name, label, icon: Icon, type, placeholder, required, inputMode, maxLength }) => (
              <div key={name} className="form-group">
                <label htmlFor={`register-${name}`} className="form-label">
                  {label}
                  {required && <span className="text-danger-500 ml-0.5">*</span>}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id={`register-${name}`}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    inputMode={inputMode}
                    maxLength={maxLength}
                    className={`form-input pl-10 ${errors[name] ? 'border-danger-400 bg-danger-50' : ''}`}
                    autoComplete={name === 'email' ? 'email' : name.includes('password') ? 'new-password' : 'off'}
                  />
                </div>
                {errors[name] && (
                  <span className="form-error flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors[name]}
                  </span>
                )}
              </div>
            ))}

            {error && (
              <div className="alert-error mb-4 animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creando cuenta…
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Crear cuenta
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                id="register-login-link"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
