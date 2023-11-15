import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Triangle } from 'react-loader-spinner';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
    const loading = useSelector((state) => state.loading);
    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <div
                style={{
                    zIndex: 10000,
                    width: '100%',
                    height: '100vh',
                    position: 'absolute',
                    background: '#00000070',
                    display: loading ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Triangle height={140} width={140} radius={7} color="#1FC8BE" ariaLabel="triangle-loading" wrapperClass={{}} wrapperStyle="" visible />
            </div>
            <Header onOpenNav={() => setOpenNav(true)} />

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

                <Main>{children}</Main>
            </Box>
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
