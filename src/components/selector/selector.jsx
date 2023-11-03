import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { StyledButton } from './styles';

// ----------------------------------------------------------------------

const Selector = forwardRef(({ color = 'default', variant = 'soft', data = [], selectedItems = [], onAdd, sx, ...other }, ref) => {
    const theme = useTheme();

    return (
        <Stack flexWrap="wrap" display="flex" flexDirection="row">
            {data?.map((item, index) => {
                const selected = selectedItems.includes(item);
                return (
                    <StyledButton
                        ref={ref}
                        ownerState={{ color, variant: selected ? 'filled' : 'outlined' }}
                        sx={{
                            ...sx,
                        }}
                        theme={theme}
                        key={index}
                        {...other}
                        onClick={() => {
                            onAdd(item);
                        }}
                    >
                        {item}
                    </StyledButton>
                );
            })}
        </Stack>
    );
});

Selector.propTypes = {
    sx: PropTypes.object,
    variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
    color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
    data: PropTypes.array,
    selectedItems: PropTypes.array,
    onAdd: PropTypes.func,
};

export default Selector;
