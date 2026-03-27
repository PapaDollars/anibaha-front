import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faArrowLeft, 
  faShoppingCart,
  faCheck,
  faPaperPlane,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

import { RootState } from '@/store/store';
import { forgotPassword } from '@/store/slices-test/authSlice';
import { ROUTES } from '@/utils/url/url_frontend';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [countdown, setCountdown] = useState(0);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateEmail = (email: string) => {
    if (!email) {
      return t('validation.emailRequired');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return t('validation.emailInvalid');
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateEmail(email);
    if (validation) {
      setEmailError(validation);
      return;
    }

    setEmailError('');

    try {
      const result = await (dispatch as any)(forgotPassword(email.toLowerCase().trim()));
      if (forgotPassword.fulfilled.match(result)) {
        setSuccess(true);
        setCountdown(60); // 60 seconds countdown before allowing resend
      }
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation:', error);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    try {
      await (dispatch as any)(forgotPassword(email.toLowerCase().trim()));
      setCountdown(60);
    } catch (error) {
      console.error('Erreur lors du renvoi:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon 
              icon={faShoppingCart} 
              className="text-3xl text-primary-600" 
            />
            <span className="text-2xl font-bold text-gray-900">ShopStore</span>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t('auth.passwordReset.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.passwordReset.subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl border border-gray-100 sm:px-10">
          {success ? (
            // Success State
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <FontAwesomeIcon icon={faCheck} className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('auth.passwordReset.emailSent')}
              </h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5 text-green-400 mt-0.5 mr-3" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">{t('auth.passwordReset.emailSentTo')} :</p>
                    <p className="font-mono text-green-900 bg-green-100 px-2 py-1 rounded">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">📧 {t('auth.passwordReset.nextSteps')} :</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>{t('auth.passwordReset.step1')}</li>
                    <li>{t('auth.passwordReset.step2')}</li>
                    <li>{t('auth.passwordReset.step3')}</li>
                  </ol>
                  <p className="mt-3 text-xs text-blue-600">
                    💡 {t('auth.passwordReset.checkSpam')}
                  </p>
                </div>
              </div>

              {/* Resend Button */}
              <div className="mb-6">
                <button
                  onClick={handleResend}
                  disabled={countdown > 0 || loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FontAwesomeIcon icon={faRedo} className="mr-2" />
                  {countdown > 0 
                    ? t('auth.passwordReset.resendIn', { seconds: countdown })
                    : loading 
                      ? t('common.processing')
                      : t('auth.passwordReset.resendEmail')
                  }
                </button>
              </div>

              {/* Back to Login */}
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                {t('auth.backToLogin')}
              </Link>
            </div>
          ) : (
            // Form State
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Global Error */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                  <div className="text-sm text-blue-800">
                    <p>{t('auth.passwordReset.instructions')}</p>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                  {t('user.email')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={`appearance-none block w-full px-3 py-3 border ${
                      emailError ? 'border-red-300 ring-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                    placeholder="votre@email.com"
                  />
                </div>
                {emailError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t('common.processing')}
                    </div>
                  ) : (
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      {t('auth.passwordReset.sendResetLink')}
                    </span>
                  )}
                </button>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  to={ROUTES.PUBLIC.AUTH.LOGIN}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  {t('auth.backToLogin')}
                </Link>
              </div>
            </form>
          )}

          {/* Security notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 {t('auth.security.secureProcess')} - {t('auth.passwordReset.linkExpires')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;