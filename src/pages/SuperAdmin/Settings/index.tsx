import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell, faShieldAlt, faPalette, faUsers } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState } from '@/store';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin' | 'superAdmin';
  isActive: boolean;
}

const SuperAdminSettings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('general');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: 'E-commerce',
    siteDescription: 'Plateforme e-commerce',
    defaultLanguage: 'fr',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  });

  useEffect(() => {
    // TODO: Charger la liste des utilisateurs depuis l'API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        const mockUsers: User[] = [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'admin',
            isActive: true
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            role: 'user',
            isActive: true
          }
        ];
        setUsers(mockUsers);
      } catch (error) {
        toast.error(t('errors.loadUsers', 'Erreur lors du chargement des utilisateurs'));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [t]);

  if (!user || user.role !== 'superAdmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t('errors.unauthorized', 'Accès non autorisé')}
          </h1>
          <p className="text-gray-600">
            {t('errors.unauthorizedMessage', 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.')}
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de sauvegarde des paramètres
    toast.success(t('settings.saveSuccess', 'Paramètres sauvegardés avec succès'));
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      // TODO: Implémenter l'appel API pour changer le rôle
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, role: newRole, isActive: newRole === 'admin' } 
          : u
      ));
      toast.success(t('settings.roleChangeSuccess', 'Rôle modifié avec succès'));
    } catch (error) {
      toast.error(t('errors.roleChange', 'Erreur lors de la modification du rôle'));
    }
  };

  const handleToggleAdminStatus = async (userId: string) => {
    try {
      // TODO: Implémenter l'appel API pour activer/désactiver l'admin
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, isActive: !u.isActive } 
          : u
      ));
      toast.success(t('settings.adminStatusChangeSuccess', 'Statut de l\'administrateur modifié avec succès'));
    } catch (error) {
      toast.error(t('errors.adminStatusChange', 'Erreur lors de la modification du statut'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {t('settings.title', 'Paramètres')}
            </h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`${
                    activeTab === 'general'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  {t('settings.general', 'Général')}
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`${
                    activeTab === 'appearance'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <FontAwesomeIcon icon={faPalette} className="mr-2" />
                  {t('settings.appearance', 'Apparence')}
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  {t('settings.notifications', 'Notifications')}
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`${
                    activeTab === 'security'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                  {t('settings.security', 'Sécurité')}
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  {t('settings.users', 'Gestion des utilisateurs')}
                </button>
              </nav>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                      {t('settings.siteName', 'Nom du site')}
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      value={formData.siteName}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                      {t('settings.siteDescription', 'Description du site')}
                    </label>
                    <textarea
                      id="siteDescription"
                      value={formData.siteDescription}
                      onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
                      {t('settings.defaultLanguage', 'Langue par défaut')}
                    </label>
                    <select
                      id="defaultLanguage"
                      value={formData.defaultLanguage}
                      onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                      {t('settings.theme', 'Thème')}
                    </label>
                    <select
                      id="theme"
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="light">{t('settings.lightTheme', 'Clair')}</option>
                      <option value="dark">{t('settings.darkTheme', 'Sombre')}</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={formData.notifications.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, email: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                      {t('settings.emailNotifications', 'Notifications par email')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      checked={formData.notifications.push}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, push: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-900">
                      {t('settings.pushNotifications', 'Notifications push')}
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="twoFactor"
                      checked={formData.security.twoFactor}
                      onChange={(e) => setFormData({
                        ...formData,
                        security: { ...formData.security, twoFactor: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-900">
                      {t('settings.twoFactor', 'Authentification à deux facteurs')}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                      {t('settings.sessionTimeout', 'Délai d\'expiration de session (minutes)')}
                    </label>
                    <input
                      type="number"
                      id="sessionTimeout"
                      value={formData.security.sessionTimeout}
                      onChange={(e) => setFormData({
                        ...formData,
                        security: { ...formData.security, sessionTimeout: parseInt(e.target.value) }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('settings.userName', 'Nom')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('settings.userEmail', 'Email')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('settings.userRole', 'Rôle')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('settings.userStatus', 'Statut')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('settings.actions', 'Actions')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value as 'user' | 'admin')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="user">{t('settings.roleUser', 'Client')}</option>
                                <option value="admin">{t('settings.roleAdmin', 'Administrateur')}</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.isActive ? t('settings.active', 'Actif') : t('settings.inactive', 'Inactif')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {user.role === 'admin' && (
                                <button
                                  onClick={() => handleToggleAdminStatus(user.id)}
                                  className={`${
                                    user.isActive
                                      ? 'text-red-600 hover:text-red-900'
                                      : 'text-green-600 hover:text-green-900'
                                  }`}
                                >
                                  {user.isActive
                                    ? t('settings.deactivate', 'Désactiver')
                                    : t('settings.activate', 'Activer')}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t('settings.save', 'Enregistrer les modifications')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSettings; 