import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import { Todo } from '../types';

export type AppStackParamList = {
    Home: undefined;
    AddTodo: { todo?: Todo };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddTodo" component={AddTodoScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
