import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();
    const [selected, setSelected] = useState(false);

    const router = useRouter();

    const handleClick = () => {
        router.push('/verify');
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address" />
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
                <Checkbox
                    disableRipple
                    checked={selected}
                    onChange={() => {
                        setSelected((prev) => !prev);
                    }}
                />
                <Typography variant="body2" sx={{ mr: 0.5 }}>
                    I agree to the
                </Typography>
                <Link variant="body2" underline="hover" style={{ cursor: 'pointer' }}>
                    Terms of Use & Privacy Policy
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit" onClick={handleClick}>
                Login
            </LoadingButton>
            <Divider sx={{ my: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                </Typography>
            </Divider>
            <Button fullWidth size="large" color="inherit" variant="outlined" sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}>
                <Iconify icon="eva:google-fill" color="#DF3E30" />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                    Continue with Google
                </Typography>
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
                        Log in / Sign up
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Enter your email to receive a Login PIN. Then log in to set up an account or use your existing account.
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
