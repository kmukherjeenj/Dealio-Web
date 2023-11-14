import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { getUsers } from 'src/api/server';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers(dispatch)
            .then((res) => {})
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title> User | Minimal UI </title>
            </Helmet>

            <UserView />
        </>
    );
}
