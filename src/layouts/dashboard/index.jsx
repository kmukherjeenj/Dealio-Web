import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [loading]);

    return (
        <>
            <div
                style={{
                    zIndex: 10000,
                    position: 'fixed',
                    bottom: 0,
                    top: 0,
                    left: 0,
                    right: 0,
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
