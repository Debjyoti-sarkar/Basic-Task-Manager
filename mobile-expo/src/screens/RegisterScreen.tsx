import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleRegister = () => {
        setLocalError('');
        if (!email || !password || !confirmPassword) {
            return setLocalError('All fields are required');
        }
        if (password !== confirmPassword) {
            return setLocalError('Passwords do not match');
        }
        dispatch(registerUser({ email, password }));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to start organizing tasks</Text>
                </View>

                {(error || localError) ? (
                    <Text style={styles.errorText}>{localError || error}</Text>
                ) : null}

                <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Input
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Input
                    label="Confirm Password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <Button
                    title="Sign Up"
                    onPress={handleRegister}
                    loading={isLoading}
                    style={styles.button}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                        Sign In
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flexGrow: 1,
        padding: SPACING.xl,
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING.xxl,
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.textMuted,
    },
    errorText: {
        color: COLORS.danger,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    button: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.xl,
    },
    footerText: {
        color: COLORS.textMuted,
        ...TYPOGRAPHY.body1,
    },
    link: {
        color: COLORS.primary,
        ...TYPOGRAPHY.body1,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
