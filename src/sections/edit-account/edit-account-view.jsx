import { useState } from 'react';

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

import { bgGradient } from 'src/theme/css';
import { DEAL_SIZE, GEOGRAPHIES, INVESTMENT_SIZE, INVESTMENT_STAGES, INVESTMENT_SECTORS } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Selector from 'src/components/selector';
// ----------------------------------------------------------------------

export default function EditAccountView() {
    const theme = useTheme();

    const router = useRouter();

    const [accredited, setAccredited] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [deals, setDeals] = useState([]);
    const [investmentSize, setInvestmentSize] = useState([]);
    const [investmentStages, setInvestmentStages] = useState([]);
    const [geographies, setGeographies] = useState([]);

    const onAddAccredited = (item) => {
        setAccredited([item]);
    };

    const onAddSectors = (item) => {
        if (sectors.includes(item)) {
            setSectors(sectors.filter((el) => el !== item));
        } else {
            setSectors([...sectors, item]);
        }
    };

    const onAddDeals = (item) => {
        setDeals([item]);
    };

    const onAddInvestmentSize = (item) => {
        setInvestmentSize([item]);
    };

    const onAddInvestmentStages = (item) => {
        if (investmentStages.includes(item)) {
            setInvestmentStages(investmentStages.filter((el) => el !== item));
        } else {
            setInvestmentStages([...investmentStages, item]);
        }
    };

    const onAddGeographies = (item) => {
        if (geographies.includes(item)) {
            setGeographies(geographies.filter((el) => el !== item));
        } else {
            setGeographies([...geographies, item]);
        }
    };

    const handleClick = () => {
        router.push('/dashboard');
    };

    const renderForm = (
        <>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2, mb: 3 }}>
                Account details are used for approving investors to events and effective matchmaking with co-investors, deals, requests and offers
            </Typography>

            <Stack spacing={3} mb={4}>
                <TextField name="email" label="Email" required placeholder="example@mail.com" />
                <TextField name="firstName" label="First name" required placeholder="First name" />
                <TextField name="lastName" label="Last name" required placeholder="Last name" />
                <TextField name="whatsapp" label="WhatsApp / Mobile(+country-phone)" required placeholder="+country-phone" />
                <TextField name="telegram" label="Telegram" required placeholder="@nickname" />
                <Typography variant="caption" color="InactiveCaptionText">
                    (N/A if not available), we use Telegram for community groups
                </Typography>
                <TextField name="linkedin" label="LinkedIn URL" required placeholder="Copy LinkedIn full URL" />
                <TextField name="companyName" label="Company name" required placeholder="" />
                <TextField name="jobTitle" label="Job title" placeholder="" />
                <TextField
                    name="shortBio"
                    label="Short Bio"
                    multiline
                    rows={4}
                    placeholder="Your bio will be presented on your Investor Profile so other members could learn more about you and reach out"
                />
                <TextField name="cityResidency" label="City of residency" required placeholder="" />
                <TextField name="countryResidency" label="Country of residency" required placeholder="" />
                <TextField name="visitedcities" label="What are your frequently visited cities?" placeholder="We can support you with introductions in these" />
                <Typography variant="subtitle2">Investor type*</Typography>
                <FormGroup>
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                {`Business Angel (investing my own capital into startups' equity)`}
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Corporate VC - General Partner or Managing Partner or Partner (investing corporate capital)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Crypto Fund - General Partner or Managing Partner or Partner (investing corporate capital)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Family Office Investment manager (investing FO capital)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Hedge Fund - General Partner or Managing Partner or Partner (investing LP capital)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Institutional Investor - Investment Manager
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Limited Partner (investing my own capital into funds)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Real Estate Investor or Real Estate Fund Manager
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Sovereign Wealth - Investment Manager
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                Sponsor (company interested to offer services to investors or their portfolio companies)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        sx={{
                            alignItems: 'flex-start',
                        }}
                        control={<Checkbox />}
                        label={
                            <Typography variant="inherit" pt={1}>
                                VC Fund - General Partner or Managing Partner or Partner (investing LP capital)
                            </Typography>
                        }
                    />
                </FormGroup>
                <Typography variant="subtitle2">Accredited investor*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={['Yes', 'No', 'Not Sure']} selectedItems={accredited} onAdd={onAddAccredited} />
                </Stack>
                <Typography variant="subtitle2">Investment sectors*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={INVESTMENT_SECTORS} selectedItems={sectors} onAdd={onAddSectors} />
                </Stack>
                <TextField name="pastInvestSize" label="Past investment size" required placeholder="" />
                <Typography variant="caption" color="InactiveCaptionText" sx={{ marginTop: '4px !important' }}>
                    How many investments have you made so far?(Type number)
                </Typography>
                <TextField
                    name="portfolioCompanies"
                    label="Portfolio companies"
                    multiline
                    rows={3}
                    required
                    placeholder="Share names of portfolio companies (bullets or comma separated)"
                />
                <TextField name="aum" label="Your AUM $ value" required placeholder="" />
                <Typography variant="caption" color="InactiveCaptionText" sx={{ marginTop: '4px !important' }}>
                    What is your AUM $ value (Assets Under management in USD)?
                </Typography>
                <Typography variant="subtitle2">How many deals do you plan to make in the next 12 months?*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={DEAL_SIZE} selectedItems={deals} onAdd={onAddDeals} />
                </Stack>
                <Typography variant="subtitle2">Average investment size per company?*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={INVESTMENT_SIZE} selectedItems={investmentSize} onAdd={onAddInvestmentSize} />
                </Stack>
                <Typography variant="subtitle2">Investment stages*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={INVESTMENT_STAGES} selectedItems={investmentStages} onAdd={onAddInvestmentStages} />
                </Stack>
                <Typography variant="subtitle2">Geographies*</Typography>
                <Stack flexWrap="wrap">
                    <Selector data={GEOGRAPHIES} selectedItems={geographies} onAdd={onAddGeographies} />
                </Stack>
                <TextField
                    name="hobbies"
                    label="Hobbies and interests"
                    rows={3}
                    multiline
                    required
                    placeholder="Share your hobbies and interests to get match to others"
                />
                <TextField
                    name="didHear"
                    label="How did you hear about Deelio"
                    rows={3}
                    multiline
                    required
                    placeholder="Were you referred by anyone? Please provide their name"
                />
                <TextField name="goal" label="Your goals" rows={3} multiline required placeholder="Our mission is to help you grow and achieve your goals" />
                <Typography variant="caption" color="InactiveCaptionText" sx={{ marginTop: '4px !important' }}>
                    Why are you interested in joining Deelio? What are you goals?
                </Typography>
                <TextField name="profilePhoto" label="" type="file" required placeholder="Choose an image..." />
                <Typography variant="caption" color="InactiveCaptionText" sx={{ marginTop: '4px !important' }}>
                    Upload your profile photo
                </Typography>
            </Stack>

            <LoadingButton fullWidth size="large" sx={{ mb: 4 }} type="submit" variant="contained" color="inherit" onClick={handleClick}>
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
