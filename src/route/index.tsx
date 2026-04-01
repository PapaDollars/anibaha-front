import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, toRelative, BASE_COMPANY, BASE_SUPER_ADMIN } from '@/utils/url/url_frontend';

const PageLoader: React.FC<{ message?: string }> = ({ message = "Chargement..." }) => (
  <div className="flex justify-center items-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  </div>
);
// Layouts - Chargement immédiat (critiques)
import ClientLayout from '@/components/Layout/ClientLayout';
import AdminLayout from '@/components/Layout/CompanyLayout';
import SuperAdminLayout from '@/components/Layout/SuperAdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute/index';
// Page d'accueil - Chargement immédiat
import HomePage from '@/pages/HomePage';
// Pages Auth - Lazy load
const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword'));
// Pages Client - Lazy load
const Products = lazy(() => import('@/pages/Client/Products'));
const ProductDetails = lazy(() => import('@/pages/Client/ProductDetail'));
const Categories = lazy(() => import('@/pages/Client/Categories'));
const CategoriesDetail = lazy(() => import('@/pages/Client/CategoriesDetail'));
const Brands = lazy(() => import('@/pages/Client/Brands'));
const BrandsDetail = lazy(() => import('@/pages/Client/BrandsDetail'));
const Cart = lazy(() => import('@/pages/Client/Cart'));
const Checkout = lazy(() => import('@/pages/Client/Checkout'));
const Orders = lazy(() => import('@/pages/Client/Orders'));
const OrderDetails = lazy(() => import('@/pages/Client/OrderDetail'));
const Profile = lazy(() => import('@/pages/Client/Profile'));
const Wishlist = lazy(() => import('@/pages/Client/Wishlist'));
const CheckoutSuccess = lazy(() => import('@/pages/Client/Checkout/CheckoutSuccess'));
// Pages Companies - Lazy load
const AdminDashboard = lazy(() => import('@/pages/Company/Dashboard'));
const AdminProducts = lazy(() => import('@/pages/Company/Products'));
const AdminOrders = lazy(() => import('@/pages/Company/Orders'));
const AdminBrands = lazy(() => import('@/pages/Company/Brands'));
const AdminSettings = lazy(() => import('@/pages/Company/Settings'));
// Pages SuperAdmin - Lazy load
const SuperAdminDashboard = lazy(() => import('@/pages/SuperAdmin/Dashboard'));
const SuperAdminBrands = lazy(() => import('@/pages/SuperAdmin/Brands'));
const SuperAdminUsers = lazy(() => import('@/pages/SuperAdmin/Users'));
const SuperAdminSettings = lazy(() => import('@/pages/SuperAdmin/Settings'));
// Error Pages
const ErrorDisplay = lazy(() => import('@/components/common/error/error-display'));
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques d'authentification */}
      <Route 
        path={ROUTES.PUBLIC.AUTH.LOGIN} 
        element={
          <Suspense fallback={<PageLoader message="Chargement de la connexion..." />}>
            <Login />
          </Suspense>
        }
      />
      <Route 
        path={ROUTES.PUBLIC.AUTH.REGISTER} 
        element={
          <Suspense fallback={<PageLoader message="Chargement de l'inscription..." />}>
            <Register />
          </Suspense>
        }
      />
      <Route 
        path={ROUTES.PUBLIC.AUTH.FORGOT_PASSWORD} 
        element={
          <Suspense fallback={<PageLoader message="Chargement..." />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route 
        path={ROUTES.PUBLIC.AUTH.RESET_PASSWORD} 
        element={
          <Suspense fallback={<PageLoader message="Chargement..." />}>
            <ResetPassword />
          </Suspense>
        }
      />
      {/* Routes client avec layout */}
      <Route path={ROUTES.PUBLIC.HOME} element={<ClientLayout />}>
        {/* Page d'accueil - chargement immédiat */}
        <Route index element={<HomePage />} />
        
        {/* Pages catalogue - lazy load */}
        <Route 
          path={ROUTES.PUBLIC.CATALOG.PRODUCTS} 
          element={
            <Suspense fallback={<PageLoader message="Chargement des produits..." />}>
              <Products />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.PUBLIC.CATALOG.PRODUCT_DETAILS} 
          element={
            <Suspense fallback={<PageLoader message="Chargement du produit..." />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.PUBLIC.CATALOG.CATEGORIES} 
          element={
            <Suspense fallback={<PageLoader message="Chargement des catégories..." />}>
              <Categories />
            </Suspense>
          }
        />
        <Route
          path="categories/:id"
          element={
            <Suspense fallback={<PageLoader message="Chargement de la catégorie..." />}>
              <CategoriesDetail />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.PUBLIC.CATALOG.BRANDS} 
          element={
            <Suspense fallback={<PageLoader message="Chargement des marques..." />}>
              <Brands />
            </Suspense>
          }
        />
        <Route
          path="companies/:id"
          element={
            <Suspense fallback={<PageLoader message="Chargement de l'entreprise..." />}>
              <BrandsDetail />
            </Suspense>
          }
        />
        
        {/* Pages shopping - lazy load */}
        <Route 
          path={ROUTES.PUBLIC.CATALOG.CART} 
          element={
            <Suspense fallback={<PageLoader message="Chargement du panier..." />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.USER.SHOPPING.CHECKOUT}
          element={
            <Suspense fallback={<PageLoader message="Chargement de la commande..." />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.USER.SHOPPING.PAYMENT_SUCCESS}
          element={
            <Suspense fallback={<PageLoader message="Chargement..." />}>
              <CheckoutSuccess />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.USER.SHOPPING.WISHLIST} 
          element={
            <Suspense fallback={<PageLoader message="Chargement de la liste de souhaits..." />}>
              <Wishlist />
            </Suspense>
          }
        />
        
        {/* Pages utilisateur - lazy load */}
        <Route 
          path={ROUTES.USER.ORDERS.LIST} 
          element={
            <Suspense fallback={<PageLoader message="Chargement des commandes..." />}>
              <Orders />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.USER.ORDERS.DETAILS} 
          element={
            <Suspense fallback={<PageLoader message="Chargement de la commande..." />}>
              <OrderDetails />
            </Suspense>
          }
        />
        <Route 
          path={ROUTES.USER.PROFILE.BASE} 
          element={
            <Suspense fallback={<PageLoader message="Chargement du profil..." />}>
              <Profile />
            </Suspense>
          }
        />
      </Route>
      {/* Routes company avec protection */}
      <Route path={BASE_COMPANY} element={<AdminLayout />}>
  <Route index element={<Navigate to={toRelative(ROUTES.COMPANY.DASHBOARD.BASE, BASE_COMPANY)} replace />} />

  <Route
    path={toRelative(ROUTES.COMPANY.DASHBOARD.BASE, BASE_COMPANY)}
    element={
      <ProtectedRoute requireCompany>
        <Suspense fallback={<PageLoader message="Chargement du tableau de bord..." />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    }
  />

  <Route
    path={toRelative(ROUTES.COMPANY.PRODUCTS.LIST, BASE_COMPANY)}  
    element={
      <ProtectedRoute requireCompany>
        <Suspense fallback={<PageLoader message="Chargement des produits..." />}>
          <AdminProducts />
        </Suspense>
      </ProtectedRoute>
    }
  />

  <Route
    path={toRelative(ROUTES.COMPANY.ORDERS.LIST, BASE_COMPANY)}    
    element={
      <ProtectedRoute requireCompany>
        <Suspense fallback={<PageLoader message="Chargement des commandes..." />}>
          <AdminOrders />
        </Suspense>
      </ProtectedRoute>
    }
  />

  <Route
    path={toRelative(ROUTES.COMPANY.SETTINGS.GENERAL, BASE_COMPANY)} 
    element={
      <ProtectedRoute requireCompany>
        <Suspense fallback={<PageLoader message="Chargement des paramètres..." />}>
          <AdminSettings />
        </Suspense>
      </ProtectedRoute>
    }
  />
</Route>
      {/* Routes superAdmin avec protection */}
      <Route path={toRelative(ROUTES.SUPER_ADMIN.DASHBOARD.BASE, BASE_SUPER_ADMIN)} element={<SuperAdminLayout />}>
        <Route index element={<Navigate to={toRelative(ROUTES.SUPER_ADMIN.DASHBOARD.BASE, BASE_SUPER_ADMIN)} replace />} />
        
        <Route 
          path={toRelative(ROUTES.SUPER_ADMIN.DASHBOARD.BASE, BASE_SUPER_ADMIN)} 
          element={
            <ProtectedRoute requireSuperAdmin>
              <Suspense fallback={<PageLoader message="Chargement du tableau de bord admin..." />}>
                <SuperAdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path={toRelative(ROUTES.SUPER_ADMIN.COMPANIES.LIST, BASE_SUPER_ADMIN)} 
          element={
            <ProtectedRoute requireSuperAdmin>
              <Suspense fallback={<PageLoader message="Chargement des entreprises..." />}>
                <SuperAdminBrands />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path={toRelative(ROUTES.SUPER_ADMIN.USERS.LIST, BASE_SUPER_ADMIN)} 
          element={
            <ProtectedRoute requireSuperAdmin>
              <Suspense fallback={<PageLoader message="Chargement des utilisateurs..." />}>
                <SuperAdminUsers />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path={toRelative(ROUTES.SUPER_ADMIN.SYSTEM.SETTINGS, BASE_SUPER_ADMIN)} 
          element={
            <ProtectedRoute requireSuperAdmin>
              <Suspense fallback={<PageLoader message="Chargement des paramètres système..." />}>
                <SuperAdminSettings />
              </Suspense>
            </ProtectedRoute>
          } 
        />
      </Route>
      {/* Route 404 */}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<PageLoader message="Chargement de la page d'erreur..." />}>
            {/* <ErrorDisplay /> */}
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;