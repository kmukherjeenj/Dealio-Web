import { Helmet } from 'react-helmet-async';

import { EditAccountView } from 'src/sections/edit-account';

// ----------------------------------------------------------------------

export default function EditAccountpage() {
    return (
        <>
            <Helmet>
                <title> Edit Account | Deelio </title>
            </Helmet>

            <EditAccountView />
        </>
    );
}
