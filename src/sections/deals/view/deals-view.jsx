import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { deals } from 'src/_mock/deals';

import DealCard from '../deal-card';
import DealSort from '../deal-sort';
import DealFilters from '../deal-filters';

// ----------------------------------------------------------------------

export default function DealsView() {
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Deals
            </Typography>

            <Stack direction="row" alignItems="center" flexWrap="wrap-reverse" justifyContent="flex-end" sx={{ mb: 5 }}>
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <DealFilters openFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />

                    <DealSort />
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {deals.map((deal) => (
                    <Grid key={deal.id} xs={12} sm={6} md={3}>
                        <DealCard deal={deal} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
