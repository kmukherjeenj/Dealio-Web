import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from '@dylmye/mui-google-places-autocomplete';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid, Avatar, useTheme, Checkbox, Container, FormGroup, FormControlLabel } from '@mui/material';

import { validateEmail } from 'src/utils/validate';

import { INVESTOR_TYPE } from 'src/_mock/products';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function ProfileView() {
    const theme = useTheme();
    const user = useSelector((state) => state.user);

    const [editable, setEditable] = useState(false);

    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState(false);
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

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setAddress(user.address);
            setInvestorType(user.investorType);
            setCompanyName(user.companyName);
            setPhone(user.phone);
        }
    }, [user]);

    const onSubmit = () => {
        if (!email || !validateEmail(email)) setErrEmail(true);
        else setErrEmail(false);
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
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Profile</Typography>

                <Button
                    variant="contained"
                    color={editable ? 'success' : 'inherit'}
                    startIcon={editable ? <Iconify icon="eva:checkmark-fill" /> : <Iconify icon="eva:edit-fill" />}
                    onClick={() => {
                        if (editable) {
                            setEditable(false);
                            onSubmit();
                        } else {
                            setEditable(true);
                        }
                    }}
                >
                    {editable ? 'Update' : 'Edit'}
                </Button>
            </Stack>
            <Grid container spacing={2}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{ p: 4 }}>
                        <Stack direction="column" alignItems="center">
                            <Avatar alt="profile" src="./sdf/sdf.png" sx={{ width: 100, height: 100 }}>
                                <Typography variant="h2" noWrap>
                                    {user.firstName.charAt(0).toUpperCase()}
                                </Typography>
                            </Avatar>
                            <Typography variant="h5" noWrap mt={2}>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="subtitle1" color="ActiveBorder" mt={1}>
                                {user.companyName}
                            </Typography>
                            <Typography variant="subtitle2" color="GrayText">
                                {user.address}
                            </Typography>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item lg={8} xs={12}>
                    <Card sx={{ p: 4 }}>
                        <Stack direction="column" mt={2} spacing={3}>
                            <TextField
                                name="email"
                                label="Email"
                                required
                                disabled={!editable}
                                value={email}
                                error={errEmail}
                                placeholder="example@mail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                name="firstName"
                                label="First name"
                                required
                                disabled={!editable}
                                value={firstName}
                                error={errFirstName}
                                placeholder="First name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                name="lastName"
                                label="Last name"
                                required
                                disabled={!editable}
                                value={lastName}
                                error={errLastName}
                                placeholder="Last name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                name="whatsapp"
                                label="WhatsApp / Mobile"
                                required
                                disabled={!editable}
                                value={phone}
                                error={errPhone}
                                placeholder=""
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                name="companyName"
                                label="Company name"
                                required
                                disabled={!editable}
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
                                disabled={!editable}
                                value={address}
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
                                                disabled={!editable}
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
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
