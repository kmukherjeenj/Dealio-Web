/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { HTTPS } from 'src/api/constant';
import { bgGradient } from 'src/theme/css';
import { sendOTP, verifyOTP } from 'src/api/server';
import { SET_USER, SET_TOKEN, SET_AUTHED } from 'src/redux/types';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function VerifyView() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.email);

    const [code, setCode] = useState('');

    const router = useRouter();

    const handleClick = () => {
        verifyOTP(dispatch, { email, otp: code })
            .then((res) => {
                if (res.success) {
                    if (res.data) {
                        dispatch({
                            type: SET_USER,
                            payload: res.data,
                        });
                        dispatch({
                            type: SET_AUTHED,
                            payload: true,
                        });
                        dispatch({
                            type: SET_TOKEN,
                            payload: res.token,
                        });
                        HTTPS.defaults.headers.common.Authorization = `Bearer ${res.token}`;
                        router.push('/');
                    } else {
                        router.push('/edit-account');
                    }
                } else {
                    toast(res.message, { type: 'error' });
                }
            })
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    };

    const handleResend = () => {
        sendOTP(dispatch, { email })
            .then((res) => {
                if (!res.success) {
                    toast(res.message, { type: 'error' });
                }
            })
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    };

    const renderForm = (
        <>
            <Stack spacing={3} mb={4}>
                <TextField name="pin" label="PIN" placeholder="0000" value={code} onChange={(e) => setCode(e.target.value)} />
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={code.length !== 4} color="inherit" onClick={handleClick}>
                Sign In
            </LoadingButton>
            <Button
                fullWidth
                size="large"
                color="inherit"
                variant="text"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), mt: 2 }}
                onClick={handleResend}
            >
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
                        We have sent a pin to {email}
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
