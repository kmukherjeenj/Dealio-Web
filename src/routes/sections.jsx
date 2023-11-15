/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Outlet, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { HTTPS } from 'src/api/constant';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const DealsPage = lazy(() => import('src/pages/deals'));
export const DealPage = lazy(() => import('src/pages/deal'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const UserProfilePage = lazy(() => import('src/pages/user-profile'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const VerifyPage = lazy(() => import('src/pages/verify'));
export const EditAccountPage = lazy(() => import('src/pages/edit-account'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const DashLayout = () => {
    const authed = useSelector((state) => state.authed);

    if (!authed) {
        return <Navigate to="/login" replace />;
    }
    return (
        <DashboardLayout>
            <Suspense>
                <Outlet />
            </Suspense>
        </DashboardLayout>
    );
};

export default function Router() {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            HTTPS.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
    }, [token]);

    return (
        <Suspense>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/" element={<DashLayout />}>
                        <Route path="/dashboard" element={<IndexPage />} />
                        {/* <Route path="/deals" element={<DealsPage />} /> */}
                        {user && user.role === 'admin' && (
                            <>
                                <Route path="/deal" element={<DealPage />} />
                                <Route path="/user" element={<UserPage />} />
                                <Route path="/user/:id" element={<UserProfilePage />} />
                            </>
                        )}
                        <Route path="/profile" element={<ProfilePage />} />
                        {/* <Route path="/products" element={<ProductsPage />} /> */}
                        {/* <Route path="/blog" element={<BlogPage />} /> */}
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="verify" element={<VerifyPage />} />
                    <Route path="edit-account" element={<EditAccountPage />} />
                    <Route path="*" element={<Page404 />} />
                    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
