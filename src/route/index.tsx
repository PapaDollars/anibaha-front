import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from '@/utils/url/url_frontend';
import ClientLayout     from '@/components/Layout/ClientLayout';
import AdminLayout      from '@/components/Layout/CompanyLayout';
import SuperAdminLayout from '@/components/Layout/SuperAdminLayout';
import ProtectedRoute   from '@/components/ProtectedRoute/index';
import HomePage         from '@/pages/HomePage';

const PageLoader: React.FC<{ message?: string }> = ({ message = "Chargement..." }) => (
  <div className="flex justify-center items-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  </div>
);

// Auth
const Login          = lazy(() => import('@/pages/Auth/Login'));
const Register       = lazy(() => import('@/pages/Auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
const ResetPassword  = lazy(() => import('@/pages/Auth/ResetPassword'));

// Client
const Products       = lazy(() => import('@/pages/Client/Products'));
const ProductDetails = lazy(() => import('@/pages/Client/ProductDetail'));
const Categories     = lazy(() => import('@/pages/Client/Categories'));
const CategoriesDetail = lazy(() => import('@/pages/Client/CategoriesDetail'));
const Brands         = lazy(() => import('@/pages/Client/Brands'));
const BrandsDetail   = lazy(() => import('@/pages/Client/BrandsDetail'));
const Cart           = lazy(() => import('@/pages/Client/Cart'));
const Checkout       = lazy(() => import('@/pages/Client/Checkout'));
const Orders         = lazy(() => import('@/pages/Client/Orders'));
const OrderDetails   = lazy(() => import('@/pages/Client/OrderDetail'));
const Profile        = lazy(() => import('@/pages/Client/Profile'));
const Wishlist       = lazy(() => import('@/pages/Client/Wishlist'));

// Company
const AdminDashboard = lazy(() => import('@/pages/Company/Dashboard'));
const AdminProducts  = lazy(() => import('@/pages/Company/Products'));
const AdminOrders    = lazy(() => import('@/pages/Company/Orders'));
const AdminSettings  = lazy(() => import('@/pages/Company/Settings'));

// SuperAdmin
const SuperAdminDashboard = lazy(() => import('@/pages/SuperAdmin/Dashboard'));
const SuperAdminBrands    = lazy(() => import('@/pages/SuperAdmin/Brands'));
const SuperAdminUsers     = lazy(() => import('@/pages/SuperAdmin/Users'));
const SuperAdminSettings  = lazy(() => import('@/pages/SuperAdmin/Settings'));

const S = (C: React.LazyExoticComponent<any>, msg?: string) => (
  <Suspense fallback={<PageLoader message={msg} />}><C /></Suspense>
);

const AppRoutes: React.FC = () => (
  <Routes>

    {/* ── Auth ──────────────────────────────────────────────── */}
    <Route path={ROUTES.PUBLIC.AUTH.LOGIN}           element={S(Login,          'Connexion...')} />
    <Route path={ROUTES.PUBLIC.AUTH.REGISTER}        element={S(Register,       'Inscription...')} />
    <Route path={ROUTES.PUBLIC.AUTH.FORGOT_PASSWORD} element={S(ForgotPassword, 'Chargement...')} />
    <Route path={ROUTES.PUBLIC.AUTH.RESET_PASSWORD}  element={S(ResetPassword,  'Chargement...')} />

    {/* ── Client (layout public) ────────────────────────────── */}
    <Route path="/" element={<ClientLayout />}>
      <Route index element={<HomePage />} />
      <Route path="products"        element={S(Products,        'Produits...')} />
      <Route path="products/:id"    element={S(ProductDetails,  'Produit...')} />
      <Route path="app/categories"  element={S(Categories,      'Catégories...')} />
      <Route path="categories/:id"  element={S(CategoriesDetail,'Catégorie...')} />
      <Route path="app/brands"      element={S(Brands,          'Marques...')} />
      <Route path="companies/:id"   element={S(BrandsDetail,    'Entreprise...')} />
      <Route path="app/cart"        element={S(Cart,            'Panier...')} />
      <Route path="checkout"        element={S(Checkout,        'Commande...')} />
      <Route path="user/wishlist"   element={S(Wishlist,        'Favoris...')} />
      <Route path="user/orders"     element={S(Orders,          'Commandes...')} />
      <Route path="user/orders/:id" element={S(OrderDetails,    'Commande...')} />
      <Route path="user/profile"    element={S(Profile,         'Profil...')} />
    </Route>

    {/* ── Company (layout protégé) ──────────────────────────── */}
    {/* ✅ Parent = /company  (pas /company/dashboard) */}
    <Route path="/company" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={
        <ProtectedRoute requireCompany>{S(AdminDashboard, 'Dashboard...')}</ProtectedRoute>
      } />
      <Route path="products" element={
        <ProtectedRoute requireCompany>{S(AdminProducts, 'Produits...')}</ProtectedRoute>
      } />
      <Route path="orders" element={
        <ProtectedRoute requireCompany>{S(AdminOrders, 'Commandes...')}</ProtectedRoute>
      } />
      <Route path="settings/general" element={
        <ProtectedRoute requireCompany>{S(AdminSettings, 'Paramètres...')}</ProtectedRoute>
      } />
    </Route>

    {/* ── SuperAdmin (layout protégé) ───────────────────────── */}
    {/* ✅ Parent = /super-admin  (pas /super-admin/dashboard) */}
    <Route path="/super-admin" element={<SuperAdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={
        <ProtectedRoute requireSuperAdmin>{S(SuperAdminDashboard, 'Dashboard admin...')}</ProtectedRoute>
      } />
      <Route path="companies" element={
        <ProtectedRoute requireSuperAdmin>{S(SuperAdminBrands, 'Entreprises...')}</ProtectedRoute>
      } />
      <Route path="users" element={
        <ProtectedRoute requireSuperAdmin>{S(SuperAdminUsers, 'Utilisateurs...')}</ProtectedRoute>
      } />
      <Route path="system/settings" element={
        <ProtectedRoute requireSuperAdmin>{S(SuperAdminSettings, 'Paramètres...')}</ProtectedRoute>
      } />
    </Route>

    {/* ── 404 ───────────────────────────────────────────────── */}
    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
);

export default AppRoutes;