/* eslint-disable no-unsafe-optional-chaining */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-chat-elements/dist/main.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import GoogleMapReact from 'google-map-react';
import { useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
// eslint-disable-next-line import/no-extraneous-dependencies
import Carousel from 'react-material-ui-carousel';
import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-named-imports
import { Input, SystemMessage, MessageBox } from 'react-chat-elements';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Card, Modal, Rating, useTheme, Container, TextField, IconButton, CardHeader, CardContent, CardActions } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgBlur } from 'src/theme/css';
import { getChat, updateDeal } from 'src/api/server';
// eslint-disable-next-line import/no-unresolved

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { LoadingButton } from '@mui/lab';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '96%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export default function DealDetailView() {
    const { state } = useLocation();
    const dealParam = state;
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const inputReferance = useRef(null);

    const [dealData, setDealData] = useState(null);

    const [title, setTitle] = useState('');
    const [errTitle, setErrTitle] = useState(false);
    const [description, setDescription] = useState('');
    const [errDesc, setErrDesc] = useState(false);
    const [businessPlan, setBusinessPlan] = useState('');
    const [errBusinessPlan, setErrBusinessPlan] = useState(false);
    const [fundingGoal, setFundingGoal] = useState('');
    const [errFundingGoal, setErrFundingGoal] = useState(false);
    const [valuation, setValuation] = useState('');
    const [errValuatin, setErrValuatin] = useState(false);
    const [revenue, setRevenue] = useState('');
    const [financialProjections, setFinancialProjections] = useState('');
    const [investmentType, setInvestmentType] = useState('');
    const [errInvestmentType, setErrInvestmentType] = useState(false);
    const [investmentTerms, setInvestmentTerms] = useState('');
    const [errInvestmentTerms, setErrInvestmentTerms] = useState(false);
    const [ownershipPercentageOffered, setOwnershipPercentageOffered] = useState('');
    const [errOwnershipPercentageOffered, setErrOwnershipPercentageOffered] = useState(false);
    const [useOfFunds, setUseOfFunds] = useState('');
    const [transactionAndMiletones, setTransactionAndMiletones] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [errTermsAndConditions, setErrTermsAndConditions] = useState(false);
    const [securitiesFilings, setSecuritiesFilings] = useState('');
    const [errSecuritiesFilings, setErrSecuritiesFilings] = useState(false);
    const [regulatoryComplianceDetailss, setRegulatoryComplianceDetails] = useState('');
    const [errRegulatoryComplianceDetails, setErrRegulatoryComplianceDetails] = useState(false);
    const [risksAndDisclaimers, setRisksAndDisclaimerss] = useState('');
    const [errRisksAndDisclaimers, setErrRisksAndDisclaimers] = useState(false);
    const [dueDiligenceMaterials, setDueDiligenceMaterials] = useState('');
    const [errDueDiligenceMaterials, setErrDueDiligenceMaterials] = useState(false);
    const [investorEligibilitys, setInvestorEligibilitys] = useState('');
    const [errInvestorEligibilitys, setErrInvestorEligibilitys] = useState(false);
    const [minInvestmentAmount, setMinInvestmentAmount] = useState('');
    const [errMinInvestmentAmount, setErrMinInvestmentAmount] = useState(false);
    const [maxInvestmentAmount, setMaxInvestmentAmount] = useState('');
    const [errMaxInvestmentAmount, setErrMaxInvestmentAmount] = useState(false);
    const [dealsDuration, setDealDuration] = useState('');
    const [errDealDuration, setErrDealDuration] = useState(false);

    const [editable, setEditable] = useState(false);
    const [docID, setDocID] = useState(null);
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [fragment, setFragment] = useState(null);
    const [sticky, setSticky] = useState(false);
    const [messages, setMessages] = useState([
        {
            position: 'left',
            type: 'text',
            text: 'Please choose a document you want to ask.',
            date: new Date(),
            title: 'AI Bot',
        },
    ]);
    const [typing, setTyping] = useState(false);
    const [systemError, setSystemError] = useState('');

    useEffect(() => {
        if (dealParam) {
            setDealData(dealParam);
            setTitle(dealParam.title);
            setDescription(dealParam.description);
            setBusinessPlan(dealParam.businessPlan);
            setFundingGoal(dealParam.financial.fundingGoal);
            setValuation(dealParam.financial.valuation);
            setRevenue(dealParam.financial.profit);
            setFinancialProjections(dealParam.financial.projections);
            setInvestmentType(dealParam.dealStructure.type.join(','));
            setInvestmentTerms(dealParam.dealStructure.terms);
            setOwnershipPercentageOffered(dealParam.dealStructure.ownershipPercentageOffered);
            setUseOfFunds(dealParam.useOfFunds);
            setTermsAndConditions(dealParam.legalAndCompliance.termsAndConditions);
            setSecuritiesFilings(dealParam.legalAndCompliance.securities);
            setRegulatoryComplianceDetails(dealParam.legalAndCompliance.complianceDetails);
            setRisksAndDisclaimerss(dealParam.legalAndCompliance.risksAndDisclaimers);
            setDueDiligenceMaterials(dealParam.legalAndCompliance.diligenceMaterials);
            setInvestorEligibilitys(dealParam.investorEligibilitys ? 'Yes' : 'No');
            setMinInvestmentAmount(dealParam.minMaxInvestmentAmount.min);
            setMaxInvestmentAmount(dealParam.minMaxInvestmentAmount.max);
            setDealDuration(dealParam.dealDuration);
        }
    }, [dealParam]);

    const handleOpen = () => setEditable(true);
    const handleClose = () => setEditable(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position && position > 625) {
            setSticky(true);
        } else {
            setSticky(false);
        }

        const deelioEl = document.getElementById('deelio');
        const documentEl = document.getElementById('documents');
        const locationEl = document.getElementById('location');
        const projectsEl = document.getElementById('projects');

        if (position >= deelioEl?.offsetTop && position < documentEl?.offsetTop - 200) {
            setFragment('deelio');
        } else if (position >= documentEl?.offsetTop - 200 && position < locationEl?.offsetTop - 200) {
            setFragment('documents');
        } else if (position >= locationEl?.offsetTop - 200 && position < projectsEl?.offsetTop - 400) {
            setFragment('location');
        } else if (position >= projectsEl?.offsetTop - 400) {
            setFragment('projects');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const objDiv = document.getElementById('chat-content');
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages]);

    const scrollTo = (id) => {
        if (id) {
            const elementToScroll = document.getElementById(id);
            if (!elementToScroll) return;
            window.scrollTo({
                top: elementToScroll.offsetTop - 190,
                behavior: 'smooth',
            });
        }
    };

    const chooseDocument = (name, id) => {
        setDocID(id);
        setMessages((prev) => [
            ...prev,
            {
                position: 'right',
                type: 'text',
                text: name,
                date: new Date(),
            },
            {
                position: 'left',
                type: 'text',
                text: 'Thanks, Please ask anything about this document.',
                date: new Date(),
                title: 'AI Bot',
            },
        ]);
    };

    const sendMessage = () => {
        if (message) {
            const tempMsg = message;
            setMessages((prev) => [
                ...prev,
                {
                    position: 'right',
                    type: 'text',
                    text: tempMsg,
                    date: new Date(),
                },
            ]);
            setMessage('');
            setSystemError('');
            setTyping(true);
            getChat(docID, [
                {
                    sender: 'User',
                    message: tempMsg,
                },
            ])
                .then((res) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            position: 'left',
                            type: 'text',
                            text: res.answer.message,
                            date: new Date(),
                            title: 'AI Bot',
                        },
                    ]);
                    setTyping(false);
                })
                .catch((err) => {
                    setTyping(false);
                    setSystemError('Failed to send a message');
                });
        }
    };

    const handleInvestmentAmount = (e, name) => {
        if (name === 'min') {
            if (e.target.value?.includes('$')) {
                if (!Number.isNaN(e.target.value?.substring(1))) {
                    setMinInvestmentAmount(Number(e.target.value.substring(1)));
                }
            } else if (!Number.isNaN(e.target.value)) {
                setMinInvestmentAmount(Number(e.target.value));
            }
        } else if (e.target.value?.includes('$')) {
            if (!Number.isNaN(e.target.value?.substring(1))) {
                setMaxInvestmentAmount(Number(e.target.value.substring(1)));
            }
        } else if (!Number.isNaN(e.target.value)) {
            setMaxInvestmentAmount(Number(e.target.value));
        }
    };

    const onSubmit = () => {
        if (!title) setErrTitle(true);
        else setErrTitle(false);
        if (!description) setErrDesc(true);
        else setErrDesc(false);
        if (!businessPlan) setErrBusinessPlan(true);
        else setErrBusinessPlan(false);
        if (!fundingGoal) setErrFundingGoal(true);
        else setErrFundingGoal(false);
        if (!valuation) setErrValuatin(true);
        else setErrValuatin(false);
        if (!investmentType) setErrInvestmentType(true);
        else setErrInvestmentType(false);
        if (!investmentTerms) setErrInvestmentTerms(true);
        else setErrInvestmentTerms(false);
        if (!ownershipPercentageOffered) setErrOwnershipPercentageOffered(true);
        else setErrOwnershipPercentageOffered(false);
        if (!termsAndConditions) setErrTermsAndConditions(true);
        else setErrTermsAndConditions(false);
        if (!securitiesFilings) setErrSecuritiesFilings(true);
        else setErrSecuritiesFilings(false);
        if (!regulatoryComplianceDetailss) setErrRegulatoryComplianceDetails(true);
        else setErrRegulatoryComplianceDetails(false);
        if (!risksAndDisclaimers) setErrRisksAndDisclaimers(true);
        else setErrRisksAndDisclaimers(false);
        if (!dueDiligenceMaterials) setErrDueDiligenceMaterials(true);
        else setErrDueDiligenceMaterials(false);
        if (!investorEligibilitys || (investorEligibilitys.toLowerCase() !== 'yes' && investorEligibilitys.toLowerCase() !== 'no'))
            setErrInvestorEligibilitys(true);
        else setErrInvestorEligibilitys(false);
        if (!minInvestmentAmount || Number(minInvestmentAmount) < 0) setErrMinInvestmentAmount(true);
        else setErrMinInvestmentAmount(false);
        if (!maxInvestmentAmount || Number(maxInvestmentAmount) < 0 || minInvestmentAmount > maxInvestmentAmount) setErrMaxInvestmentAmount(true);
        else setErrMaxInvestmentAmount(false);
        if (!dealsDuration) setErrDealDuration(true);
        else setErrDealDuration(false);

        if (
            !title ||
            !description ||
            !businessPlan ||
            !fundingGoal ||
            !valuation ||
            !investmentType ||
            !investmentTerms ||
            !ownershipPercentageOffered ||
            !termsAndConditions ||
            !securitiesFilings ||
            !regulatoryComplianceDetailss ||
            !risksAndDisclaimers ||
            !dueDiligenceMaterials ||
            !investorEligibilitys ||
            !minInvestmentAmount ||
            !maxInvestmentAmount ||
            !dealsDuration
        ) {
            toast('Please fill all required fields', { type: 'error' });
        } else {
            const request = {
                title,
                description,
                businessPlan,
                company: '654a87cbfe56fb2f739aafba',
                mainImage: dealData.mainImage,
                financial: {
                    fundingGoal,
                    valuation,
                    profit: revenue,
                    projections: financialProjections,
                },
                dealStructure: {
                    type: investmentType.split(','),
                    terms: investmentTerms,
                    ownershipPercentageOffered: Number(ownershipPercentageOffered),
                },
                useOfFunds,
                milestones: transactionAndMiletones,
                legalAndCompliance: {
                    termsAndConditions,
                    securities: securitiesFilings,
                    complianceDetails: regulatoryComplianceDetailss,
                    attachments: dealData.legalAndCompliance.attachments,
                    risksAndDisclaimers,
                    diligenceMaterials: dueDiligenceMaterials,
                },
                investorEligibilty: investorEligibilitys.toLowerCase() === 'yes',
                minMaxInvestmentAmount: {
                    min: Number(minInvestmentAmount),
                    max: Number(maxInvestmentAmount),
                },
                dealDuration: dealsDuration,
                pastProjects: dealData.pastProjects,
            };

            updateDeal(dispatch, dealData.id, request)
                .then((res) => {
                    handleClose();
                    toast('Successfully updated!', { type: 'success' });
                })
                .catch((err) => {
                    toast(err, { type: 'error' });
                });
        }
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:corner-up-left-fill" />}
                    onClick={() => {
                        router.back();
                    }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color={editable ? 'success' : 'inherit'}
                    startIcon={editable ? <Iconify icon="eva:checkmark-fill" /> : <Iconify icon="eva:edit-fill" />}
                    onClick={handleOpen}
                >
                    {editable ? 'Update' : 'Edit'}
                </Button>
            </Stack>
            <Stack direction="column" position="relative" alignItems="center">
                <img alt="cover" src={dealData?.mainImage} style={{ width: '100%', height: 540, objectFit: 'cover' }} />
                <Stack position="absolute" width="100%" height={230} bgcolor="#010101C0" bottom={0} padding={3}>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h3" color="white">
                                {dealData?.title}
                            </Typography>
                            <Typography variant="h4" color={theme.palette.primary.main}>
                                {dealData?.dealStructure?.ownershipPercentageOffered}% Retrun
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Rating name="read-only" value={5} readOnly />
                            <Typography variant="h6" color={theme.palette.primary.main} sx={{ ml: 1 }}>
                                5.0
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack mt={2} direction="column">
                        <Stack direction="row">
                            <Stack direction="column">
                                <Typography color="white">Investment Range:</Typography>
                                <Typography variant="h4" color="white">
                                    ${dealData?.minMaxInvestmentAmount?.min} - ${dealData?.minMaxInvestmentAmount?.max}
                                </Typography>
                            </Stack>
                            <Stack direction="column" ml={4}>
                                <Typography color="white">Duration:</Typography>
                                <Typography variant="h4" color="white">
                                    {dealData?.dealDuration}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack mt={1.5} direction="row">
                            <Stack direction="row">
                                <Iconify icon="eva:home-fill" sx={{ color: theme.palette.primary.main }} />
                                <Typography color="white" sx={{ ml: 1 }}>
                                    {dealData?.company?.name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" ml={3}>
                                <Iconify icon="eva:phone-fill" sx={{ color: theme.palette.primary.main }} />
                                <Typography color="white" sx={{ ml: 1 }}>
                                    {dealData?.company?.phone}
                                </Typography>
                            </Stack>
                            <Stack direction="row" ml={3}>
                                <Iconify icon="eva:pin-fill" sx={{ color: theme.palette.primary.main }} />
                                <Typography color="white" sx={{ ml: 1 }}>
                                    {dealData?.company?.location?.address}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack>
                <Stack
                    direction="row"
                    p={3}
                    position={sticky ? 'fixed' : 'static'}
                    top={80}
                    width="100%"
                    zIndex={10}
                    style={{
                        ...bgBlur({
                            color: theme.palette.background.default,
                        }),
                    }}
                >
                    <Button
                        variant={fragment === 'deelio' ? 'contained' : 'outlined'}
                        color={fragment === 'deelio' ? 'primary' : 'inherit'}
                        startIcon={<Iconify icon="eva:grid-fill" />}
                        onClick={() => {
                            scrollTo('deelio');
                            setFragment('deelio');
                        }}
                    >
                        Deelio
                    </Button>
                    <Button
                        variant={fragment === 'documents' ? 'contained' : 'outlined'}
                        color={fragment === 'documents' ? 'primary' : 'inherit'}
                        startIcon={<Iconify icon="eva:file-text-fill" />}
                        onClick={() => {
                            scrollTo('documents');
                            setFragment('documents');
                        }}
                        sx={{ ml: 2 }}
                    >
                        Documents
                    </Button>
                    <Button
                        variant={fragment === 'location' ? 'contained' : 'outlined'}
                        color={fragment === 'location' ? 'primary' : 'inherit'}
                        startIcon={<Iconify icon="eva:map-fill" />}
                        onClick={() => {
                            scrollTo('location');
                            setFragment('location');
                        }}
                        sx={{ ml: 2 }}
                    >
                        Location
                    </Button>
                    <Button
                        variant={fragment === 'projects' ? 'contained' : 'outlined'}
                        color={fragment === 'projects' ? 'primary' : 'inherit'}
                        startIcon={<Iconify icon="eva:image-fill" />}
                        onClick={() => {
                            scrollTo('projects');
                            setFragment('projects');
                        }}
                        sx={{ ml: 2 }}
                    >
                        Projects
                    </Button>
                </Stack>
                <Stack id="deelio" mt={sticky ? 14.5 : 4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" mb={2}>
                                Deelio
                            </Typography>
                            <Typography variant="body2">{dealData?.dealStructure?.terms}</Typography>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack id="documents" mt={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" mb={2}>
                                Documents
                            </Typography>
                            <Stack direction="column" alignItems="flex-start">
                                {dealData?.legalAndCompliance?.attachments?.map((item, index) => (
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            window.open(item.url, '_blank');
                                        }}
                                        key={index}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack id="location" mt={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" mb={2}>
                                Location
                            </Typography>
                            <Typography variant="body2" mb={1}>
                                Greenville, North Carolina
                            </Typography>
                            <Stack height={380} width="100%">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyAFF1M2AeYt8ZL5I72nwy6B1nEVS8mSxmU' }}
                                    defaultCenter={{
                                        lat: 35.6127,
                                        lng: -77.3664,
                                    }}
                                    defaultZoom={15}
                                >
                                    <Iconify lat={35.6127} lng={-77.3664} width={36} icon="eva:pin-fill" sx={{ color: theme.palette.error.main }} />
                                </GoogleMapReact>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack id="projects" mt={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" mb={2}>
                                Projects
                            </Typography>
                            <Carousel
                                animation="slide"
                                navButtonsAlwaysVisible
                                NextIcon={<Iconify width={36} icon="eva:chevron-right-fill" />}
                                PrevIcon={<Iconify width={36} icon="eva:chevron-left-fill" />}
                            >
                                {dealData?.pastProjects?.map((item, index) => (
                                    <img alt={`past-${index}`} src={item} key={index} style={{ objectFit: 'cover', height: 420, width: '100%' }} />
                                ))}
                            </Carousel>
                        </CardContent>
                    </Card>
                </Stack>
                <Card
                    sx={{
                        position: 'fixed',
                        zIndex: 1000,
                        right: 24,
                        bottom: 14,
                        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)',
                        display: showChat ? 'block' : 'none',
                        bgcolor: theme.palette.grey[200],
                    }}
                >
                    <CardHeader
                        title="Chat with AI Bot"
                        action={
                            <IconButton
                                aria-label="close"
                                onClick={() => {
                                    setShowChat(false);
                                    setMessages([
                                        {
                                            position: 'left',
                                            type: 'text',
                                            text: 'Please choose a document you want to ask.',
                                            date: new Date(),
                                            title: 'AI Bot',
                                        },
                                    ]);
                                    setDocID(null);
                                }}
                            >
                                <Iconify icon="eva:close-fill" width={34} sx={{ color: theme.palette.error.main }} />
                            </IconButton>
                        }
                    />
                    <CardContent id="chat-content" sx={{ width: 420, height: 450, overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <MessageBox position={msg.position} title={msg.title} type="text" text={msg.text} date={msg.date} key={index} />
                        ))}
                        {!docID && (
                            <Stack direction="column" alignItems="flex-start">
                                {dealData?.legalAndCompliance?.attachments?.map((item, index) => (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            chooseDocument(item.name, item.docID);
                                        }}
                                        key={index}
                                        sx={{ mt: 1, textAlign: 'left' }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </Stack>
                        )}
                    </CardContent>
                    <CardActions>
                        <Stack direction="column" width="100%">
                            {systemError && <SystemMessage text={systemError} />}
                            <ThreeDots
                                height="14"
                                width="80"
                                radius="9"
                                color={theme.palette.primary.main}
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{ marginBottom: 10 }}
                                visible={typing}
                            />
                            <Input
                                referance={inputReferance}
                                placeholder="Type here..."
                                autofocus
                                value={message}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage();
                                    }
                                }}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                rightButtons={
                                    <IconButton onClick={sendMessage}>
                                        <Iconify icon="eva:navigation-2-fill" width={32} sx={{ color: theme.palette.primary.main }} />
                                    </IconButton>
                                }
                            />
                        </Stack>
                    </CardActions>
                </Card>
                <IconButton
                    aria-label="chat"
                    size="large"
                    sx={{
                        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)',
                        position: 'fixed',
                        zIndex: 1000,
                        right: 24,
                        bottom: 24,
                        bgcolor: 'white',
                        ':hover': { bgcolor: theme.palette.grey[300] },
                        display: showChat ? 'none' : 'flex',
                    }}
                    onClick={() => {
                        setShowChat(true);
                    }}
                >
                    <Iconify icon="eva:message-square-fill" width={46} sx={{ color: theme.palette.primary.main }} />
                </IconButton>
            </Stack>
            <Modal open={editable} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Deal
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Please fill all required fields
                    </Typography>
                    <Stack spacing={3} pt={2} pb={2} maxHeight={500} overflow="scroll">
                        <TextField name="title" required label="Title" value={title} error={errTitle} onChange={(e) => setTitle(e.target.value)} />
                        <TextField
                            name="description"
                            required
                            multiline
                            rows={4}
                            label="Description"
                            error={errDesc}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder=""
                        />
                        <TextField
                            name="businessPlan"
                            required
                            label="Business Plan"
                            error={errBusinessPlan}
                            value={businessPlan}
                            onChange={(e) => setBusinessPlan(e.target.value)}
                            placeholder="A document outlining the business's strategry, financials, and growth prospects."
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Copy and paste the business plan file link(We do not support file upload function for now)
                        </Typography>
                        {/* Dont remove below code this will be added in the future. */}
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={companies}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                        /> */}
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Financial Information:
                        </Typography>
                        <TextField
                            name="fundingGoal"
                            required
                            label="Funding Goal"
                            error={errFundingGoal}
                            value={fundingGoal}
                            onChange={(e) => setFundingGoal(e.target.value)}
                        />
                        <TextField
                            name="valuation"
                            required
                            label="Valuation"
                            error={errValuatin}
                            value={valuation}
                            onChange={(e) => setValuation(e.target.value)}
                        />
                        <TextField name="revenue" label="Revenue and Profit/loss history" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
                        <TextField
                            name="financialProjections"
                            label="Financial projections"
                            value={financialProjections}
                            onChange={(e) => setFinancialProjections(e.target.value)}
                        />
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Deal Structure:
                        </Typography>
                        <TextField
                            name="typeOfInvestment"
                            required
                            label="Type of investment"
                            error={errInvestmentType}
                            value={investmentType}
                            onChange={(e) => setInvestmentType(e.target.value)}
                            placeholder="equity, debt, convertible note, etc."
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Separate by comma
                        </Typography>
                        <TextField
                            name="deelio"
                            required
                            multiline
                            rows={4}
                            error={errInvestmentTerms}
                            value={investmentTerms}
                            onChange={(e) => setInvestmentTerms(e.target.value)}
                            label="Deelio"
                        />
                        <TextField
                            name="ownershipPercentageOffered"
                            required
                            type="number"
                            error={errOwnershipPercentageOffered}
                            value={ownershipPercentageOffered}
                            onChange={(e) => setOwnershipPercentageOffered(e.target.value)}
                            label="Equity ownership percentage offered"
                            placeholder="30"
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            e.g., 30 means 30 percentage
                        </Typography>
                        <TextField name="useOfFunds" label="Use of Funds" placeholder="" value={useOfFunds} onChange={(e) => setUseOfFunds(e.target.value)} />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Details on how the funds raised will be used to grow the business.
                        </Typography>
                        <TextField
                            name="transactionAndMiletones"
                            label="Transaction and Miletones"
                            value={transactionAndMiletones}
                            onChange={(e) => setTransactionAndMiletones(e.target.value)}
                            placeholder=""
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Information about the company's achievements, milestones reached, and future goals.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Legal and Compliance:
                        </Typography>
                        <TextField
                            name="termsAndConditions"
                            required
                            label="Terms and Conditions"
                            multiline
                            rows={4}
                            error={errTermsAndConditions}
                            value={termsAndConditions}
                            onChange={(e) => setTermsAndConditions(e.target.value)}
                        />
                        <TextField
                            name="securitiesFilings"
                            required
                            label="Securities Filings"
                            multiline
                            rows={4}
                            error={errSecuritiesFilings}
                            value={securitiesFilings}
                            onChange={(e) => setSecuritiesFilings(e.target.value)}
                        />
                        <TextField
                            name="regulatoryComplianceDetails"
                            required
                            label="Regulatory compliance details"
                            multiline
                            rows={4}
                            error={errRegulatoryComplianceDetails}
                            value={regulatoryComplianceDetailss}
                            onChange={(e) => setRegulatoryComplianceDetails(e.target.value)}
                        />
                        <TextField
                            name="risksAnddisclaimers"
                            required
                            label="Risks and Disclaimers"
                            multiline
                            rows={4}
                            placeholder=""
                            error={errRisksAndDisclaimers}
                            value={risksAndDisclaimers}
                            onChange={(e) => setRisksAndDisclaimerss(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Disclosure of potential risks associated with the investment.
                        </Typography>
                        <TextField
                            name="dueDiligenceMaterials"
                            required
                            multiline
                            rows={4}
                            label="Due Diligence materials"
                            error={errDueDiligenceMaterials}
                            value={dueDiligenceMaterials}
                            onChange={(e) => setDueDiligenceMaterials(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Access to additional documents, such as financial reports, legal agreements, and more.
                        </Typography>
                        <TextField
                            name="investorEligibility"
                            required
                            label="Investor Eligibility"
                            placeholder="Yes or No"
                            error={errInvestorEligibilitys}
                            value={investorEligibilitys}
                            onChange={(e) => setInvestorEligibilitys(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Yes: for accredited investors, No: for non-accredited investors.
                        </Typography>
                        <TextField
                            name="minInvestmentAmount"
                            required
                            label="Minimum Investment Amounts"
                            placeholder="10000"
                            error={errMinInvestmentAmount}
                            value={minInvestmentAmount ? `$ ${minInvestmentAmount}` : ''}
                            onChange={(e) => handleInvestmentAmount(e, 'min')}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The minimum amounts that investors can contribute to the deal.
                        </Typography>
                        <TextField
                            name="maxInvestmentAmount"
                            required
                            label="Maximum Investment Amounts"
                            placeholder="$10000"
                            error={errMaxInvestmentAmount}
                            value={maxInvestmentAmount ? `$ ${maxInvestmentAmount}` : ''}
                            onChange={(e) => handleInvestmentAmount(e, 'max')}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The maximum amounts that investors can contribute to the deal.
                        </Typography>
                        <TextField
                            name="datesOrDealDuration"
                            required
                            label="Dates / Deal Duration"
                            placeholder="3-6 months"
                            error={errDealDuration}
                            value={dealsDuration}
                            onChange={(e) => setDealDuration(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The timeframe during which the deal is open for investment.
                        </Typography>
                        <LoadingButton sx={{ mt: 2 }} onClick={onSubmit}>
                            Update
                        </LoadingButton>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    );
}
