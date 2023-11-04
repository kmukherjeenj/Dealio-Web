import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const DEAL_NAME = [
    'Popular Brands',
    'Artificial Satellites',
    'Bitcoin Investment',
    'Medicine Investment',
    'Nike ZoomX SuperRep Surge',
    'Zoom Freak 2',
    'Nike Air Max Zephyr',
    'Jordan Delta',
    'Air Jordan XXXV PF',
    'Nike Waffle Racer Crater',
    'Kyrie 7 EP Sisterhood',
    'Space like SpaceX',
    'Nike Air Force 1 07 LX',
    'Nike Air Force 1 Shadow SE',
    'Bitcoin Investment',
    'Nike DBreak-Type',
    'VR Investor',
    'Nike Air Max 270 React ENG',
    'NikeCourt Royale',
    'Crypto Development',
    'Nike Air Zoom SuperRep',
    'Equipment developing',
    'Nike React Art3mis',
    'Work with Tesla',
];
const DEAL_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

export const INVESTMENT_STAGES = [
    'Pre-Seed',
    'Seed',
    'Seed Extension',
    'Series A',
    'Series B',
    'Series C',
    'Series D',
    'Series E',
    'Series F',
    'Series H+',
    'Token Sale (SAFT)',
    'Toke Sale',
    'Secondary Equity',
    'Secondary SAFT',
    'VC Fund',
    'Other',
];

export const INVESTMENT_SIZE = ['0-$10K', '$10k-$25K', '$25K-$50K', '$50K-$100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M+'];

// ----------------------------------------------------------------------

export const deals = [...Array(14)].map((_, index) => {
    const setIndex = index + 1;

    return {
        id: faker.string.uuid(),
        cover: `/assets/images/deals/sign_doc.jpg`,
        name: DEAL_NAME[index],
        summary: 'This is test summary for mock data investment.',
        investmentType: INVESTMENT_STAGES[index],
        investmentSize: INVESTMENT_SIZE[index % INVESTMENT_SIZE.length],
        attribute: ['AR/VR', 'Medicine', 'Shopping', 'AR/VR', 'Medicine', 'Shopping', 'AR/VR', 'Medicine', 'Shopping'],
        ownerName: 'James William',
        primaryContact: '+1-2018971232',
        address: 'Harlem, Manhattan, New York, NY',
        attachments: {
            executiveSummery: 'https://example.com/executive-summery',
            projection: 'https://example.com/projection',
            misc: 'https://example.com/misc',
        },
        price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
        priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
        colors:
            (setIndex === 1 && DEAL_COLOR.slice(0, 2)) ||
            (setIndex === 2 && DEAL_COLOR.slice(1, 3)) ||
            (setIndex === 3 && DEAL_COLOR.slice(2, 4)) ||
            (setIndex === 4 && DEAL_COLOR.slice(3, 6)) ||
            (setIndex === 23 && DEAL_COLOR.slice(4, 6)) ||
            (setIndex === 24 && DEAL_COLOR.slice(5, 6)) ||
            DEAL_COLOR,
        status: sample(['sale', 'new', '', '']),
    };
});
