import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices-test/authSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import ClientNavbar from '@/components/Navbar/ClientNavbar';
import Copyright from '@/components/common/copyright';
import Footer from '@/components/common/footer';
import ScrollToTop from '../common/ScrollToTop';
import WhatsAppChatSystem from '../common/chat/WhatsAppChatSystem';

const ClientLayout: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { items: cartItems = [] } = useSelector((state: RootState) => state.cart || {});

    const handleLogin = () => {
        navigate(ROUTES.PUBLIC.AUTH.LOGIN);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            toast.success(t('auth.logoutSuccess', 'Déconnexion réussie'));
            navigate(ROUTES.PUBLIC.HOME);
        } catch (error) {
            toast.error(t('auth.logoutError', 'Erreur lors de la déconnexion'));
        }
    };

    const handleSearch = (query: string) => {
        const params = new URLSearchParams();
        params.set('search', query);
        navigate(`${ROUTES.PUBLIC.CATALOG.PRODUCTS}?${params.toString()}`);
    };

    const handleVoiceSearch = () => {
        // Implémentation de la recherche vocale
        const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognitionClass) {
            const recognition = new SpeechRecognitionClass();

            recognition.lang = 'fr-FR';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleSearch(transcript);
                toast.success(`Recherche vocale: "${transcript}"`);
            };

            recognition.onerror = () => {
                toast.error(t('search.voiceError', 'Erreur lors de la recherche vocale'));
            };

            recognition.start();
        } else {
            toast.error(t('search.voiceNotSupported', 'Recherche vocale non supportée'));
        }
    };

    const handleImageSearch = () => {
        // Implémentation de la recherche par image
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                // Ici vous pouvez implémenter l'upload et la recherche par image
                toast(t('search.imageProcessing', 'Traitement de l\'image en cours...'));

                // Simulation d'une recherche par image
                setTimeout(() => {
                    navigate(ROUTES.PUBLIC.CATALOG.PRODUCTS);
                    toast.success(t('search.imageSuccess', 'Recherche par image effectuée'));
                }, 2000);
            }
        };

        input.click();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <ClientNavbar
                user={user ?? undefined}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onSearch={handleSearch}
                onVoiceSearch={handleVoiceSearch}
                onImageSearch={handleImageSearch}
                cartItems={cartItems.length || 0}
                notifications={user?.notifications?.length || 0}
            />

            {/* Main Content */}
            <main className="pt-20 lg:pt-24">
                <div className="min-h-screen">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />

            <Copyright />

            <WhatsAppChatSystem />

            <ScrollToTop />
        </div>
    );
};

export default ClientLayout;