import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { login } from '@/store/slices/authSlice';
import { syncCart } from '@/store/slices/cartSlice';
import { RootState, AppDispatch } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'super_admin') {
        navigate(ROUTES.SUPER_ADMIN.DASHBOARD.BASE, { replace: true });
      } else if (user.role === 'company_admin') {
        navigate(ROUTES.COMPANY.DASHBOARD.BASE, { replace: true });
      } else {
        const from = (location.state as any)?.from?.pathname || ROUTES.PUBLIC.HOME;
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = t('validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('validation.emailInvalid');
    if (!formData.password) newErrors.password = t('validation.passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(login(formData)).unwrap();
      dispatch(syncCart()); // Fusionne le panier localStorage avec la DB
    } catch (err) {
      console.error('Erreur connexion:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-gray-900">ANIBAHA</span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">{t('auth.loginToAccount')}</h2>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 {t('auth.security.secureConnection')}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                {t('user.email')}
              </label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleInputChange}
                className={`appearance-none block w-full px-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-400" />
                {t('user.newPassword')}
              </label>
              <div className="relative">
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password" required
                  value={formData.password} onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-3 pr-10 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="••••••••"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">{t('auth.rememberMe')}</label>
              </div>
              <Link to={ROUTES.PUBLIC.AUTH.FORGOT_PASSWORD} className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('common.processing')}
                </div>
              ) : (
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  {t('auth.signIn')}
                </span>
              )}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">ou</span></div>
            </div>

            <button type="button" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-500" />
              {t('auth.socialLogin.continueWithGoogle')}
            </button>
          </form>

          <p className="pt-6 text-center text-sm text-gray-600">
            {t('auth.dontHaveAccount')}{' '}
            <Link to={ROUTES.PUBLIC.AUTH.REGISTER} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              {t('auth.createAccount')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;