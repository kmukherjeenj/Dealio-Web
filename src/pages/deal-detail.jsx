import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadStripe } from '@stripe/stripe-js';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { Elements } from '@stripe/react-stripe-js';

import { DealDetailView } from 'src/sections/deal-detail';
// ----------------------------------------------------------------------

const stripePromise = loadStripe('pk_test_51OL4KnDCoNs0A945iVRJLKqvrB75nAaDoiNp76NX7I0J6zTxmXlbdmehBZ62Aoa7hfWmjkixcOqu2frKviAhDXyf00EhOAk3hm');

const options = {
    mode: 'payment',
    amount: 100,
    currency: 'usd',
};

export default function DealDetailPage() {
    return (
        <>
            <Helmet>
                <title> Deal | Deelio </title>
            </Helmet>
            <Elements stripe={stripePromise} options={options}>
                <DealDetailView />
            </Elements>
        </>
    );
}
