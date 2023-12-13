/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';

export const StatusText = ({ value }) => {
    const status = value.charAt(0).toUpperCase() + value.slice(1);
    if (value === 'draft' || value === 'sent') {
        return (
            <div style={styles.draft}>
                <Typography variant="body2" color="white">
                    {status}
                </Typography>
            </div>
        );
    } else if (value === 'delivered') {
        return (
            <div style={styles.delivered}>
                <Typography variant="body2" color="white">
                    {status}
                </Typography>
            </div>
        );
    } else if (value === 'declined' || value === 'voided' || value === 'expired') {
        return (
            <div style={styles.declined}>
                <Typography variant="body2" color="white">
                    {status}
                </Typography>
            </div>
        );
    } else if (value === 'completed') {
        return (
            <div style={styles.completed}>
                <Typography variant="body2" color="white">
                    {status}
                </Typography>
            </div>
        );
    } else {
        return (
            <div style={styles.other}>
                <Typography variant="body2" mb={1} mt={1.5}>
                    {status}
                </Typography>
            </div>
        );
    }
};

const styles = {
    draft: {
        padding: '4px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0BE5D',
        borderRadius: 30,
    },
    completed: {
        padding: '4px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#32C19F',
        borderRadius: 30,
    },
    delivered: {
        padding: '4px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7775F6',
        borderRadius: 30,
    },
    declined: {
        padding: '4px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6060',
        borderRadius: 30,
    },
    other: {
        padding: '4px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#262739',
        borderRadius: 30,
    },
};
