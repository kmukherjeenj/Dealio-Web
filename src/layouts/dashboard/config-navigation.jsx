import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navAdminConfig = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: icon('ic_analytics'),
    },
    // {
    //     title: 'deals',
    //     path: '/deals',
    //     icon: icon('ic_agreement'),
    // },
    {
        title: 'deals',
        path: '/deal',
        icon: icon('ic_agreement'),
    },
    {
        title: 'users',
        path: '/user',
        icon: icon('ic_user'),
    },
    // {
    //     title: 'product',
    //     path: '/products',
    //     icon: icon('ic_cart'),
    // },
    // {
    //     title: 'blog',
    //     path: '/blog',
    //     icon: icon('ic_blog'),
    // },
    // {
    //     title: 'login',
    //     path: '/login',
    //     icon: icon('ic_lock'),
    // },
    // {
    //     title: 'Not found',
    //     path: '/404',
    //     icon: icon('ic_disabled'),
    // },
];

export const navInvestorConfig = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: icon('ic_analytics'),
    },
];
