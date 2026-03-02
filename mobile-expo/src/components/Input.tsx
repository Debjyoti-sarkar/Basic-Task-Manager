import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor={COLORS.textMuted}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
        width: '100%',
    },
    label: {
        ...TYPOGRAPHY.body2,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: '600',
    },
    input: {
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...TYPOGRAPHY.body1,
    },
    inputError: {
        borderColor: COLORS.danger,
    },
    errorText: {
        color: COLORS.danger,
        ...TYPOGRAPHY.caption,
        marginTop: SPACING.xs,
    },
});

export default Input;
