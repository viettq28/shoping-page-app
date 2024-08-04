/* eslint-disable react/prop-types */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CartContextProvider } from './contexts/CartContextProvider';
import { ServerContextProvider } from './contexts/SeverContextProvider';
import ProtectedRoute from './utilComponents/ProtectedRoute';
import PreventAuth from './utilComponents/PreventAuth';
import Layout from './pages/Layout';
import Spinner from './UI/Spinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const DashboardMain = lazy(() =>
  import('./components/Dashboard/DashboardMain')
);

// import HomePage from './pages/HomePage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import DetailPage from './pages/DetailPage';
// import ShopPage from './pages/ShopPage';
// import LoginPage, { action as loginAction } from './pages/LoginPage';
// import RegisterPage, { action as registerAction } from './pages/RegisterPage';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnection: false,
    },
  },
});
const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <Layout />
      </Suspense>
    ),
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/shop/:category', element: <ShopPage /> },
      { path: '/detail/:productId', element: <DetailPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/cart',
            element: <CartPage />,
          },
          {
            path: '/checkout',
            element: <CheckoutPage />,
          },
          {
            path: '/history',
            element: <HistoryPage />,
          },
          {
            path: '/history/:orderId',
            element: <OrderDetail />,
          },
        ],
      },
      {
        element: <PreventAuth />,
        children: [
          { path: '/login', element: <LoginPage /> },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <ProtectedRoute authorities={['consultant', 'admin']} />
      </Suspense>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
        children: [
          { path: 'chat', element: <DashboardMain /> },
          {
            element: <ProtectedRoute authorities={['admin']} />,
            children: [
              { path: 'history/:orderId', element: <OrderDetail /> },
              { path: ':section', element: <DashboardMain /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <ServerContextProvider>
          <RouterProvider router={router}>{children}</RouterProvider>
        </ServerContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
