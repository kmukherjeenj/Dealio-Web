import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const teamMembers = [...Array(5)].map((_) => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    position: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    background: faker.person.bio(),
}));

export const companies = [...Array(24)].map((_) => ({
    id: faker.string.uuid(),
    label: faker.company.name(),
    industry: ['AR/VR', 'Medicine', 'Shopping', 'AR/VR', 'Medicine', 'Shopping', 'AR/VR', 'Medicine', 'Shopping'],
    location: {
        address: `${faker.location.buildingNumber()}, ${faker.location.street()}, ${faker.location.city()}`,
        coordinates: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
        },
    },
    fundingDate: faker.date.recent(),
    teamMembers,
}));
