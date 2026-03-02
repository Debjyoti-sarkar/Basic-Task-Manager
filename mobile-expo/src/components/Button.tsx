import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ title, loading, variant = 'primary', style, ...props }) => {
    let bgColor = COLORS.primary;
    let textColor = COLORS.text;
    let borderColor = 'transparent';

    if (variant === 'secondary') bgColor = COLORS.surface;
    if (variant === 'danger') bgColor = COLORS.danger;
    if (variant === 'outline') {
        bgColor = 'transparent';
        borderColor = COLORS.primary;
        textColor = COLORS.primary;
    }

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: bgColor, borderColor: borderColor, borderWidth: variant === 'outline' ? 1 : 0 },
                props.disabled && styles.disabled,
                style,
            ]}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        shadowColor: COLORS.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        ...TYPOGRAPHY.body1,
        fontWeight: 'bold',
    },
});

export default Button;
