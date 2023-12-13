import { Helmet } from 'react-helmet-async';

import { DealView } from 'src/sections/deal/view';

// ----------------------------------------------------------------------

export default function DealPage() {
    return (
        <>
            <Helmet>
                <title> Deals | Deelio </title>
            </Helmet>

            <DealView />
        </>
    );
}
