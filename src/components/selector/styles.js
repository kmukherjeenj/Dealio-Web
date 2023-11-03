import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledButton = styled(Button)(({ theme, ownerState }) => {
    const lightMode = theme.palette.mode === 'light';

    const filledVariant = ownerState.variant === 'filled';

    const outlinedVariant = ownerState.variant === 'outlined';

    const softVariant = ownerState.variant === 'soft';

    const defaultStyle = {
        ...(ownerState.color === 'default' && {
            // FILLED
            ...(filledVariant && {
                color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
                backgroundColor: theme.palette.text.primary,
                '&:hover': {
                    backgroundColor: theme.palette.grey[500],
                },
            }),
            // OUTLINED
            ...(outlinedVariant && {
                backgroundColor: theme.palette.common.white,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.grey[500]}`,
            }),
            // SOFT
            ...(softVariant && {
                color: theme.palette.text.secondary,
                backgroundColor: alpha(theme.palette.grey[500], 0.16),
            }),
        }),
    };

    const colorStyle = {
        ...(ownerState.color !== 'default' && {
            // FILLED
            ...(filledVariant && {
                color: theme.palette[ownerState.color].contrastText,
                backgroundColor: theme.palette[ownerState.color].main,
            }),
            // OUTLINED
            ...(outlinedVariant && {
                backgroundColor: 'transparent',
                color: theme.palette[ownerState.color].main,
                border: `1px solid ${theme.palette[ownerState.color].main}`,
            }),
            // SOFT
            ...(softVariant && {
                color: theme.palette[ownerState.color][lightMode ? 'dark' : 'light'],
                backgroundColor: alpha(theme.palette[ownerState.color].main, 0.16),
            }),
        }),
    };

    return {
        height: 40,
        minWidth: 60,
        lineHeight: 0,
        borderRadius: 30,
        cursor: 'pointer',
        alignItems: 'center',
        marginBottom: 4,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        marginLeft: 10,
        justifyContent: 'center',
        textTransform: 'capitalize',
        fontSize: theme.typography.pxToRem(12),
        fontWeight: '400',
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shorter,
        }),
        ...defaultStyle,
        ...colorStyle,
    };
});
