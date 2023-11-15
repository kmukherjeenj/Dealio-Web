import { Helmet } from 'react-helmet-async';

import { DealsView } from 'src/sections/deals/view';

// ----------------------------------------------------------------------

export default function DealsPage() {
    return (
        <>
            <Helmet>
                <title> Deals | Deelio </title>
            </Helmet>

            <DealsView />
        </>
    );
}
