import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, LogOut } from 'lucide-react-native';

import { AppDispatch, RootState } from '../store';
import { fetchTodos, updateTodo, deleteTodo } from '../store/slices/todoSlice';
import { logout } from '../store/slices/authSlice';
import TodoItem from '../components/TodoItem';
import { AppStackParamList } from '../navigation/AppNavigator';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';
import { Todo } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { items, isLoading, error } = useSelector((state: RootState) => state.todos);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await dispatch(fetchTodos());
        setRefreshing(false);
    }, [dispatch]);

    const handleToggleTodo = (todo: Todo) => {
        dispatch(updateTodo({ _id: todo._id, isCompleted: !todo.isCompleted }));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>My Tasks</Text>
                <Text style={styles.subtitle}>You have {items.filter(i => !i.isCompleted).length} pending tasks</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <LogOut color={COLORS.danger} size={24} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {isLoading && !refreshing && items.length === 0 ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TodoItem
                            todo={item}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                            onPress={(todo) => navigation.navigate('AddTodo', { todo })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No tasks found. Add a new one!</Text>
                        </View>
                    }
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTodo', {})}
                activeOpacity={0.8}
            >
                <Plus color={COLORS.text} size={32} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.xl,
        paddingTop: SPACING.xxl * 1.5, // accommodate safe area
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    headerTitle: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
    },
    subtitle: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textMuted,
        marginTop: 4,
    },
    logoutButton: {
        padding: SPACING.xs,
    },
    listContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: 100, // space for FAB
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: COLORS.danger,
        ...TYPOGRAPHY.body2,
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.xxl,
    },
    emptyText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.textMuted,
    },
    fab: {
        position: 'absolute',
        bottom: SPACING.xl,
        right: SPACING.lg,
        backgroundColor: COLORS.primary,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});

export default HomeScreen;
