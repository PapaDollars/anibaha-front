import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { deconnexion } from '@/store/slices/authSlice';
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

    // ✅ cart pas encore dans le store → valeur par défaut 0
    const cartCount = useSelector((state: RootState) =>
        (state as any).cart?.items?.length ?? 0
    );

    const handleLogin = () => navigate(ROUTES.PUBLIC.AUTH.LOGIN);

    const handleLogout = async () => {
        try {
            await dispatch(deconnexion());
            toast.success(t('auth.logoutSuccess', 'Déconnexion réussie'));
            navigate(ROUTES.PUBLIC.HOME);
        } catch {
            toast.error(t('auth.logoutError', 'Erreur lors de la déconnexion'));
        }
    };

    const handleSearch = (query: string) => {
        const params = new URLSearchParams();
        params.set('search', query);
        navigate(`${ROUTES.PUBLIC.CATALOG.PRODUCTS}?${params.toString()}`);
    };

    const handleVoiceSearch = () => {
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
            recognition.onerror = () => toast.error(t('search.voiceError', 'Erreur recherche vocale'));
            recognition.start();
        } else {
            toast.error(t('search.voiceNotSupported', 'Recherche vocale non supportée'));
        }
    };

    const handleImageSearch = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                toast(t('search.imageProcessing', "Traitement de l'image en cours..."));
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
            <ClientNavbar
                user={user as any}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onSearch={handleSearch}
                onVoiceSearch={handleVoiceSearch}
                onImageSearch={handleImageSearch}
                cartItems={cartCount}
                notifications={0} 
            />
            <main className="pt-20 lg:pt-24">
                <div className="min-h-screen">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <Copyright />
            <WhatsAppChatSystem />
            <ScrollToTop />
        </div>
    );
};

export default ClientLayout;