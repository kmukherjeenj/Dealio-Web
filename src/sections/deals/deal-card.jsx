import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export default function DealCard({ deal }) {
    const renderStatus = (
        <Label
            variant="filled"
            color={(deal.status === 'sale' && 'error') || 'info'}
            sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
            }}
        >
            {deal.status}
        </Label>
    );

    const renderImg = (
        <Box
            component="img"
            alt={deal.name}
            src={deal.cover}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'contain',
                position: 'absolute',
                background: 'gray',
            }}
        />
    );

    const renderPrice = (
        <Stack direction="column">
            <Typography
                component="span"
                variant="body1"
                textAlign="center"
                sx={{
                    color: 'white',
                    background: 'gray',
                    padding: '4px',
                    fontSize: 10,
                }}
            >
                {deal.investmentType}
            </Typography>
            <Typography variant="subtitle1">
                &nbsp;
                {deal.investmentSize}
            </Typography>
        </Stack>
    );

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {deal.status && renderStatus}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {deal.name}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <ColorPreview colors={deal.colors} />
                    {renderPrice}
                </Stack>
            </Stack>
        </Card>
    );
}

DealCard.propTypes = {
    deal: PropTypes.object,
};
