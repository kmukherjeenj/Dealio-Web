import { Helmet } from 'react-helmet-async';

import { DealDetailView } from 'src/sections/deal-detail';

// ----------------------------------------------------------------------

export default function DealDetailPage() {
    return (
        <>
            <Helmet>
                <title> Deal | Deelio </title>
            </Helmet>

            <DealDetailView />
        </>
    );
}
