import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faShoppingCart, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { register } from '@/store/slices/authSlice';
import { syncCart } from '@/store/slices/cartSlice';
import { RootState, AppDispatch } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '', color: 'red' });

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  useEffect(() => {
    const pwd = formData.password;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    const map: Record<number, { feedback: string; color: string }> = {
      0: { feedback: t('auth.passwordStrength.veryWeak'), color: 'red' },
      1: { feedback: t('auth.passwordStrength.veryWeak'), color: 'red' },
      2: { feedback: t('auth.passwordStrength.weak'), color: 'orange' },
      3: { feedback: t('auth.passwordStrength.medium'), color: 'yellow' },
      4: { feedback: t('auth.passwordStrength.strong'), color: 'green' },
      5: { feedback: t('auth.passwordStrength.veryStrong'), color: 'green' },
    };
    setPasswordStrength({ score, ...map[score] });
  }, [formData.password, t]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('validation.firstNameRequired');
    else if (formData.firstName.length < 2) newErrors.firstName = t('validation.firstNameMinLength');
    if (!formData.lastName.trim()) newErrors.lastName = t('validation.lastNameRequired');
    else if (formData.lastName.length < 2) newErrors.lastName = t('validation.lastNameMinLength');
    if (!formData.email) newErrors.email = t('validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('validation.emailInvalid');
    if (!formData.password) newErrors.password = t('validation.passwordRequired');
    else if (formData.password.length < 6) newErrors.password = t('validation.passwordMinLength', { min: 6 });
    if (!formData.confirmPassword) newErrors.confirmPassword = t('validation.confirmPasswordRequired');
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('validation.passwordsNoMatch');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })).unwrap();
      dispatch(syncCart()); // Fusionne le panier localStorage avec la DB
    } catch (err) {
      console.error("Erreur inscription:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const passwordCriteria = [
    { test: (p: string) => p.length >= 8,         text: t('auth.passwordStrength.requirements.minLength') },
    { test: (p: string) => /[a-z]/.test(p),       text: t('auth.passwordStrength.requirements.lowercase') },
    { test: (p: string) => /[A-Z]/.test(p),       text: t('auth.passwordStrength.requirements.uppercase') },
    { test: (p: string) => /\d/.test(p),           text: t('auth.passwordStrength.requirements.number') },
    { test: (p: string) => /[^a-zA-Z0-9]/.test(p), text: t('auth.passwordStrength.requirements.special') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-gray-900">ANIBAHA</span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">{t('auth.createYourAccount')}</h2>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 {t('auth.security.secureRegistration')}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5 text-red-400 mr-3" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />{t('user.firstName')}
                </label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" required
                  value={formData.firstName} onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-3 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="Jean" />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('user.lastName')}</label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" required
                  value={formData.lastName} onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-3 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="Dupont" />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />{t('user.email')}
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleInputChange}
                className={`appearance-none block w-full px-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                placeholder="jean.dupont@email.com" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-400" />{t('user.newPassword')}
              </label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                  value={formData.password} onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-3 pr-10 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="••••••••" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              {formData.password && (
                <>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-300 bg-${passwordStrength.color}-500`} style={{ width: `${(passwordStrength.score / 5) * 100}%` }} />
                    </div>
                    <span className={`text-sm font-medium text-${passwordStrength.color}-600`}>{passwordStrength.feedback}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    {passwordCriteria.map((c, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <FontAwesomeIcon icon={c.test(formData.password) ? faCheck : faTimes} className={`mr-2 ${c.test(formData.password) ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={c.test(formData.password) ? 'text-green-700' : 'text-gray-500'}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-400" />{t('user.confirmPassword')}
              </label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" required
                  value={formData.confirmPassword} onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-3 pr-10 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="••••••••" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <FontAwesomeIcon icon={faCheck} className="mr-1" />
                  {t('validation.passwordsMatch', 'Les mots de passe correspondent')}
                </div>
              )}
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                  <FontAwesomeIcon icon={faUser} className="mr-2" />{t('auth.createAccount')}
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
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to={ROUTES.PUBLIC.AUTH.LOGIN} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              {t('auth.loginToAccount')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;