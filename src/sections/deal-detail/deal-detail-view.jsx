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
import { Card, Rating, useTheme, Container, IconButton, CardHeader, CardContent, CardActions } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgBlur } from 'src/theme/css';
import { getChat } from 'src/api/server';
// eslint-disable-next-line import/no-unresolved

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function DealDetailView() {
    const { state } = useLocation();
    const dealData = state;
    const theme = useTheme();
    const router = useRouter();
    const inputReferance = useRef(null);

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
                <Typography variant="h5">{` `}</Typography>
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
        </Container>
    );
}
