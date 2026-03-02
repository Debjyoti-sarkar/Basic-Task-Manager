import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ChevronLeft } from 'lucide-react-native';

import { AppDispatch, RootState } from '../store';
import { createTodo, updateTodo } from '../store/slices/todoSlice';
import { AppStackParamList } from '../navigation/AppNavigator';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

type AddTodoRouteProp = RouteProp<AppStackParamList, 'AddTodo'>;

const AddTodoScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const route = useRoute<AddTodoRouteProp>();
    const isEditing = !!route.params?.todo;
    const initialTodo = route.params?.todo;

    const [title, setTitle] = useState(initialTodo?.title || '');
    const [description, setDescription] = useState(initialTodo?.description || '');
    const [deadline, setDeadline] = useState(initialTodo ? new Date(initialTodo.deadline) : new Date());
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(initialTodo?.priority || 'Medium');
    const [tags, setTags] = useState(initialTodo?.tags?.join(', ') || '');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const { isLoading, error } = useSelector((state: RootState) => state.todos);

    const handleSave = async () => {
        if (!title) return;

        const todoData = {
            title,
            description,
            deadline: deadline.toISOString(),
            priority,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        };

        if (isEditing && initialTodo) {
            await dispatch(updateTodo({ _id: initialTodo._id, ...todoData }));
        } else {
            await dispatch(createTodo(todoData));
        }
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Edit Task' : 'New Task'}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {error && <Text style={styles.errorText}>{error}</Text>}

                <Input label="Target Title" placeholder="What needs to be done?" value={title} onChangeText={setTitle} />
                <Input label="Description (Optional)" placeholder="Add some details..." value={description} onChangeText={setDescription} multiline numberOfLines={3} style={{ height: 100 }} />

                <Text style={styles.label}>Deadline</Text>
                <TouchableOpacity style={styles.dateSelector} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>{deadline.toLocaleDateString()}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={deadline}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(Platform.OS === 'ios');
                            if (selectedDate) setDeadline(selectedDate);
                        }}
                    />
                )}

                <Text style={styles.label}>Priority</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={priority}
                        onValueChange={(itemValue) => setPriority(itemValue as 'Low' | 'Medium' | 'High')}
                        style={styles.picker}
                        dropdownIconColor={COLORS.text}
                    >
                        <Picker.Item label="High Priority" value="High" color={Platform.OS === 'ios' ? COLORS.danger : COLORS.text} />
                        <Picker.Item label="Medium Priority" value="Medium" color={Platform.OS === 'ios' ? COLORS.warning : COLORS.text} />
                        <Picker.Item label="Low Priority" value="Low" color={Platform.OS === 'ios' ? COLORS.secondary : COLORS.text} />
                    </Picker>
                </View>

                <Input label="Tags (comma separated)" placeholder="work, urgent, personal" value={tags} onChangeText={setTags} />

                <Button title={isEditing ? "Save Changes" : "Create Task"} onPress={handleSave} loading={isLoading} style={styles.button} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        padding: SPACING.lg,
        paddingTop: SPACING.xxl * 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
    },
    backButton: { padding: SPACING.xs },
    headerTitle: { ...TYPOGRAPHY.h2, color: COLORS.text, fontWeight: 'bold' },
    content: { padding: SPACING.lg, paddingBottom: 100 },
    label: { ...TYPOGRAPHY.body2, color: COLORS.text, marginBottom: SPACING.xs, fontWeight: '600', marginTop: SPACING.md },
    dateSelector: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        height: 50,
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    dateText: { color: COLORS.text, ...TYPOGRAPHY.body1 },
    pickerContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: SPACING.md,
    },
    picker: { color: COLORS.text, height: 50 },
    button: { marginTop: SPACING.xl },
    errorText: { color: COLORS.danger, marginBottom: SPACING.md, textAlign: 'center' },
});

export default AddTodoScreen;
