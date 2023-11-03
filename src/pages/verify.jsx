import { Helmet } from 'react-helmet-async';

import { VerifyView } from 'src/sections/verify';

// ----------------------------------------------------------------------

export default function VerifyPage() {
    return (
        <>
            <Helmet>
                <title> Verify | Deelio </title>
            </Helmet>

            <VerifyView />
        </>
    );
}
