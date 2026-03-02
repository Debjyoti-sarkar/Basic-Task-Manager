import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { loginSuccess, setLoading, logout } from '../store/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userStr = await AsyncStorage.getItem('user');
                const token = await AsyncStorage.getItem('token');
                if (userStr && token) {
                    dispatch(loginSuccess(JSON.parse(userStr)));
                } else {
                    dispatch(logout());
                }
            } catch (e) {
                dispatch(logout());
            } finally {
                dispatch(setLoading(false));
            }
        };
        checkUser();
    }, [dispatch]);

    if (isLoading) return null; // or a splash screen

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default RootNavigator;
