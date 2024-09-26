import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';
import { Timer } from '../utils/types';

interface Props {
    onFormSUbmit(timer: Timer): void;
};

const ToggleableTimerForm: React.FC<Props> = ({ onFormSUbmit }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleFormOpen = () => setIsOpen(true);
    const handleFormClose = () => setIsOpen(false);
    const handleFormSubmit = (timer: Timer) => { onFormSUbmit(timer); handleFormClose(); };

    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (
                <TimerForm onFormSubmit={handleFormSubmit} onFormClose={handleFormClose} />
            ) : (
                <TimerButton title="+" color="black" onPress={handleFormOpen} />
            )}
        </View>
    );
}

interface Style {
    container: ViewStyle;
    buttonPadding: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    container: {
        paddingVertical: 10
    },
    buttonPadding: {
        paddingHorizontal: 15
    }
})

export default ToggleableTimerForm;