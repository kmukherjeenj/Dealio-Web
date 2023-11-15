import { useState } from 'react';
// ----------------------------------------------------------------------

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import GooglePlacesAutocomplete from '@dylmye/mui-google-places-autocomplete';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { register } from 'src/api/server';
import { bgGradient } from 'src/theme/css';
import { INVESTOR_TYPE } from 'src/_mock/products';

import Logo from 'src/components/logo';

export default function EditAccountView() {
    const theme = useTheme();

    const router = useRouter();
    const dispatch = useDispatch();

    const email = useSelector((state) => state.email);
    const loading = useSelector((state) => state.loading);

    const [firstName, setFirstName] = useState('');
    const [errFirstName, setErrFirstName] = useState(false);
    const [lastName, setLastName] = useState('');
    const [errLastName, setErrLastName] = useState(false);
    const [address, setAddress] = useState('');
    const [errAddress, setErrAddress] = useState(false);
    const [phone, setPhone] = useState('');
    const [errPhone, setErrPhone] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [errCompanyName, setErrCompanyName] = useState(false);
    const [investorType, setInvestorType] = useState([]);
    const [errInvestorType, setErrInvestorType] = useState(false);

    const onSubmit = () => {
        if (!firstName) setErrFirstName(true);
        else setErrFirstName(false);
        if (!lastName) setErrLastName(true);
        else setErrLastName(false);
        if (!address) setErrAddress(true);
        else setErrAddress(false);
        if (!phone) setErrPhone(true);
        else setErrPhone(false);
        if (!companyName) setErrCompanyName(true);
        else setErrCompanyName(false);
        if (investorType.length === 0) setErrInvestorType(true);
        else setErrInvestorType(false);

        if (!firstName || !lastName || !address || !phone || !companyName || investorType === 0) {
            toast('Please fill all required fields', { type: 'error' });
        } else {
            const data = {
                firstName,
                lastName,
                address,
                phone,
                companyName,
                investorType,
                email,
            };
            register(dispatch, data)
                .then((res) => {
                    router.push('/dashboard');
                })
                .catch((err) => {
                    toast(err, { type: 'error' });
                });
        }
    };

    const renderForm = (
        <>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2, mb: 3 }}>
                Account details are used for approving investors to events and effective matchmaking with co-investors, deals, requests and offers
            </Typography>

            <Stack spacing={3} mb={4}>
                <TextField name="email" label="Email" required value={email} disabled placeholder="example@mail.com" />
                <TextField
                    name="firstName"
                    label="First name"
                    required
                    value={firstName}
                    error={errFirstName}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    name="lastName"
                    label="Last name"
                    required
                    value={lastName}
                    error={errLastName}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    name="whatsapp"
                    label="WhatsApp / Mobile"
                    required
                    value={phone}
                    error={errPhone}
                    placeholder=""
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    name="companyName"
                    label="Company name"
                    required
                    value={companyName}
                    error={errCompanyName}
                    placeholder=""
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <GooglePlacesAutocomplete
                    apiKey="AIzaSyDLs8yb_ANP72I7nKNkiYd51P6zh_R5_4Q"
                    apiOptions={{
                        region: 'US',
                        libraries: ['places'],
                    }}
                    inputProps={{
                        error: errAddress,
                        placeholder: 'Address',
                    }}
                    inputValue={address}
                    setInputValue={(addr) => setAddress(addr)}
                />
                <Typography variant="subtitle2">Investor type*</Typography>
                {errInvestorType && (
                    <Typography variant="caption" color={theme.palette.error.main} sx={{ marginTop: '4px !important' }}>
                        Investor type is required
                    </Typography>
                )}
                <FormGroup>
                    {INVESTOR_TYPE.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            sx={{
                                alignItems: 'flex-start',
                            }}
                            control={
                                <Checkbox
                                    checked={investorType.includes(item.key)}
                                    onClick={() => {
                                        if (investorType.includes(item.key)) {
                                            setInvestorType(investorType.filter((i) => i !== item.key));
                                        } else {
                                            setInvestorType([...investorType, item.key]);
                                        }
                                    }}
                                />
                            }
                            label={
                                <Typography variant="inherit" pt={1}>
                                    {item.value}
                                </Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </Stack>

            <LoadingButton fullWidth loading={loading} size="large" sx={{ mb: 4 }} type="submit" variant="contained" color="inherit" onClick={onSubmit}>
                Submit
            </LoadingButton>
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
                        width: 1,
                        maxWidth: 420,
                        maxHeight: 600,
                        py: 3,
                    }}
                >
                    <Typography variant="h4" align="center" py={1}>
                        Edit account
                    </Typography>

                    <CardContent sx={{ overflow: 'scroll', height: 1 }}>{renderForm}</CardContent>
                </Card>
            </Stack>
        </Box>
    );
}
