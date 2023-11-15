/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { getDeals } from 'src/api/server';

import { DealView } from 'src/sections/deal/view';

// ----------------------------------------------------------------------

export default function DealPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        getDeals(dispatch)
            .then((res) => {})
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title> User | Deelio </title>
            </Helmet>

            <DealView />
        </>
    );
}
