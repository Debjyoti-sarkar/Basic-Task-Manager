import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = () => {
        if (email && password) {
            dispatch(loginUser({ email, password }));
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to manage your tasks</Text>
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

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
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Button
                    title="Sign In"
                    onPress={handleLogin}
                    loading={isLoading}
                    style={styles.button}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                        Sign Up
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
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

export default LoginScreen;
