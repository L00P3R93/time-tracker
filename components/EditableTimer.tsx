import React, { useState } from 'react';
import Timer from './Timer';
import TimerForm from './TimerForm';
import { Timer as TimerType, Attribute } from '../utils/types';

type Props = {
    onFormSubmit(attrs: Attribute): void;
    onRemovePress(timerId: string): void;
    onStartPress(timerId: string): void;
    onStopPress(timerId: string): void;
} & TimerType;

const EditableTimer: React.FC<Props> = ({
    id,
    title,
    project,
    elapsed,
    isRunning,
    onFormSubmit,
    onRemovePress,
    onStartPress,
    onStopPress
}) => {
    const [editFormOpen, setEditFormOpen] = useState<boolean>(false);

    const handleEditPress = () => openForm();
    const handleFormClose = () => closeForm();
    const handleFormSubmit = (attrs: Attribute) => { onFormSubmit(attrs); closeForm(); };
    const closeForm = () => setEditFormOpen(false);
    const openForm = () => setEditFormOpen(true);

    return editFormOpen ? (
        <TimerForm
            id={id}
            title={title}
            project={project}
            onFormSubmit={handleFormSubmit}
            onFormClose={handleFormClose}
        />
    ) : (
        <Timer
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onEditPress={handleEditPress}
            onRemovePress={onRemovePress}
            onStartPress={onStartPress}
            onStopPress={onStopPress}
        />
    );
}

export default EditableTimer;