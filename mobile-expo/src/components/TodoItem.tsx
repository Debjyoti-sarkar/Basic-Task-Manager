import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, Trash2, Clock, AlertCircle } from 'lucide-react-native';
import { Todo } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

interface TodoItemProps {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (id: string) => void;
    onPress: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onPress }) => {
    const isOverdue = new Date(todo.deadline).getTime() < Date.now() && !todo.isCompleted;

    const getPriorityColor = () => {
        switch (todo.priority) {
            case 'High': return COLORS.danger;
            case 'Medium': return COLORS.warning;
            case 'Low': return COLORS.secondary;
            default: return COLORS.textMuted;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, todo.isCompleted && styles.completedContainer]}
            onPress={() => onPress(todo)}
            activeOpacity={0.7}
        >
            <TouchableOpacity style={styles.checkButton} onPress={() => onToggle(todo)}>
                {todo.isCompleted ? (
                    <CheckCircle2 color={COLORS.secondary} size={24} />
                ) : (
                    <Circle color={COLORS.textMuted} size={24} />
                )}
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={[styles.title, todo.isCompleted && styles.completedText]}>
                    {todo.title}
                </Text>

                {todo.description ? (
                    <Text style={styles.description} numberOfLines={2}>
                        {todo.description}
                    </Text>
                ) : null}

                <View style={styles.metaContainer}>
                    <View style={[styles.badge, { backgroundColor: getPriorityColor() + '20' }]}>
                        <AlertCircle color={getPriorityColor()} size={12} />
                        <Text style={[styles.badgeText, { color: getPriorityColor() }]}>
                            {todo.priority}
                        </Text>
                    </View>

                    <View style={[styles.badge, isOverdue ? styles.overdueBadge : styles.dateBadge]}>
                        <Clock color={isOverdue ? COLORS.danger : COLORS.textMuted} size={12} />
                        <Text style={[
                            styles.badgeText,
                            isOverdue ? { color: COLORS.danger, fontWeight: 'bold' } : { color: COLORS.textMuted }
                        ]}>
                            {new Date(todo.deadline).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(todo._id)}>
                <Trash2 color={COLORS.danger} size={20} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.sm,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    completedContainer: {
        opacity: 0.6,
        borderLeftColor: COLORS.secondary,
    },
    checkButton: {
        marginRight: SPACING.md,
    },
    content: {
        flex: 1,
    },
    title: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        marginBottom: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: COLORS.textMuted,
    },
    description: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textMuted,
        marginBottom: SPACING.sm,
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.round,
        gap: 4,
    },
    dateBadge: {
        backgroundColor: COLORS.border + '60',
    },
    overdueBadge: {
        backgroundColor: COLORS.danger + '20',
    },
    badgeText: {
        ...TYPOGRAPHY.caption,
        fontWeight: '600',
    },
    deleteButton: {
        padding: SPACING.sm,
        marginLeft: SPACING.xs,
    },
});

export default TodoItem;
