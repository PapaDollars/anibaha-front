import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faEye,
  faEyeSlash,
  faCheckCircle,
  faArrowLeft,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { resetPassword } from '@/store/slices/authSlice';
import { ROUTES } from '@/utils/url/url_frontend';

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const token = searchParams.get('token') || '';

  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [success, setSuccess]                 = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!token) {
      toast.error(t('auth.resetPassword.invalidLink', 'Lien de réinitialisation invalide ou expiré'));
    }
  }, [token, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (password.length < 6) {
      setValidationError(t('auth.resetPassword.passwordTooShort', 'Le mot de passe doit contenir au moins 6 caractères'));
      return;
    }
    if (password !== confirmPassword) {
      setValidationError(t('auth.resetPassword.errorMismatch', 'Les mots de passe ne correspondent pas'));
      return;
    }
    if (!token) {
      setValidationError(t('auth.resetPassword.invalidToken', 'Token invalide'));
      return;
    }

    try {
      await dispatch(resetPassword({ token, password, confirmPassword })).unwrap();
      setSuccess(true);
      toast.success(t('auth.resetPassword.success', 'Mot de passe réinitialisé avec succès'));
      setTimeout(() => navigate(ROUTES.PUBLIC.AUTH.LOGIN), 3000);
    } catch (err: unknown) {
      toast.error((err as string) || t('auth.resetPassword.error', 'Erreur lors de la réinitialisation'));
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.resetPassword.invalidLink', 'Lien invalide')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('auth.resetPassword.invalidLinkDesc', 'Ce lien de réinitialisation est invalide ou a expiré.')}
          </p>
          <Link to={ROUTES.PUBLIC.AUTH.FORGOT_PASSWORD}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.resetPassword.successTitle', 'Mot de passe mis à jour !')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('auth.resetPassword.successDesc', 'Vous allez être redirigé vers la page de connexion...')}
          </p>
          <Link to={ROUTES.PUBLIC.AUTH.LOGIN}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Se connecter maintenant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faLock} className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('auth.resetPassword.title', 'Nouveau mot de passe')}
            </h2>
            <p className="text-gray-600 mt-2">
              {t('auth.resetPassword.subtitle', 'Choisissez un mot de passe sécurisé')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.resetPassword.newPassword', 'Nouveau mot de passe')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimum 6 caractères"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.resetPassword.confirmPassword', 'Confirmer le mot de passe')}
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Répéter le mot de passe"
                  required
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Erreurs */}
            {(validationError || error) && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                {validationError || error}
              </div>
            )}

            {/* Bouton submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200">
              {loading ? t('common.loading', 'Chargement...') : t('auth.resetPassword.submit', 'Réinitialiser le mot de passe')}
            </button>

            <div className="text-center">
              <Link to={ROUTES.PUBLIC.AUTH.LOGIN}
                className="flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>{t('auth.backToLogin', 'Retour à la connexion')}</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
