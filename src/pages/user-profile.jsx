import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
    return (
        <>
            <Helmet>
                <title> User | Deelio </title>
            </Helmet>

            <UserProfileView />
        </>
    );
}
