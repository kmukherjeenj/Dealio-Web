import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const DealsPage = lazy(() => import('src/pages/deals'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const VerifyPage = lazy(() => import('src/pages/verify'));
export const EditAccountPage = lazy(() => import('src/pages/edit-account'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { element: <IndexPage />, index: true },
                { path: 'dashboard', element: <IndexPage /> },
                { path: 'deals', element: <DealsPage /> },
                { path: 'user', element: <UserPage /> },
                { path: 'products', element: <ProductsPage /> },
                { path: 'blog', element: <BlogPage /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: 'verify',
            element: <VerifyPage />,
        },
        {
            path: 'edit-account',
            element: <EditAccountPage />,
        },
        {
            path: '404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
