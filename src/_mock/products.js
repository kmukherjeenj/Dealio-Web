import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
    'Nike Air Force 1 NDESTRUKT',
    'Nike Space Hippie 04',
    'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
    'Nike Blazer Low 77 Vintage',
    'Nike ZoomX SuperRep Surge',
    'Zoom Freak 2',
    'Nike Air Max Zephyr',
    'Jordan Delta',
    'Air Jordan XXXV PF',
    'Nike Waffle Racer Crater',
    'Kyrie 7 EP Sisterhood',
    'Nike Air Zoom BB NXT',
    'Nike Air Force 1 07 LX',
    'Nike Air Force 1 Shadow SE',
    'Nike Air Zoom Tempo NEXT%',
    'Nike DBreak-Type',
    'Nike Air Max Up',
    'Nike Air Max 270 React ENG',
    'NikeCourt Royale',
    'Nike Air Zoom Pegasus 37 Premium',
    'Nike Air Zoom SuperRep',
    'NikeCourt Royale',
    'Nike React Art3mis',
    'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => {
    const setIndex = index + 1;

    return {
        id: faker.string.uuid(),
        cover: `/assets/images/products/product_${setIndex}.jpg`,
        name: PRODUCT_NAME[index],
        price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
        priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
        colors:
            (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
            (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
            (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
            (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
            (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
            (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
            PRODUCT_COLOR,
        status: sample(['sale', 'new', '', '']),
    };
});

export const INVESTOR_TYPE = [
    {
        id: 1,
        key: 'business_angle',
        value: "Business Angel (investing my own capital into startups' equity)",
    },
    {
        id: 2,
        key: 'corporate_vc',
        value: 'Corporate VC - General Partner or Managing Partner or Partner (investing corporate capital)',
    },
    {
        id: 3,
        key: 'crypto_fund',
        value: 'Crypto Fund - General Partner or Managing Partner or Partner (investing LP capital)',
    },
    {
        id: 4,
        key: 'family_office',
        value: 'Family Office Investment Manager (investing FO capital)',
    },
    {
        id: 5,
        key: 'hedge_fund',
        value: 'Hedge Fund - General Partner or Managing Partner or Partner (investing LP capital)',
    },
    {
        id: 6,
        key: 'institutional_investor',
        value: 'Institutional Investor - Investment Manager',
    },
    {
        id: 7,
        key: 'limited_partner',
        value: 'Limited partner (investing my own capital into funds)',
    },
    {
        id: 8,
        key: 'sovereign_wealth',
        value: 'Sovereign Wealth - Investment Manager',
    },
    {
        id: 9,
        key: 'sponsor',
        value: 'Sponsor (company interested to offer services to investors or their portfolio companies)',
    },
    {
        id: 10,
        key: 'vc_fund',
        value: 'VC Fund - General partner or Managing Partner or Partner (investing LP capital)',
    },
];
