import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function VerifyView() {
    const theme = useTheme();

    const router = useRouter();

    const handleClick = () => {
        router.push('/edit-account');
    };

    const renderForm = (
        <>
            <Stack spacing={3} mb={4}>
                <TextField name="pin" label="PIN" placeholder="00000" />
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit" onClick={handleClick}>
                Sign In
            </LoadingButton>
            <Button fullWidth size="large" color="inherit" variant="text" sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), mt: 2 }}>
                I need another pin
            </Button>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Box sx={{ width: 164, height: 64 }} margin="auto">
                        <img alt="icon" src="/assets/images/appname.png" />
                    </Box>
                    <Typography variant="h4" align="center">
                        Check your email
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
                        We have sent a pin to apexcup199096@gmail.com
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
