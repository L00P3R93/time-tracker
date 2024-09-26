import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TextStyle,
    ViewStyle,
} from 'react-native';
import TimerButton from './TimerButton';
import { Attribute } from '../utils/types';

type Props = {
    onFormSubmit(attrs: Attribute): void;
    onFormClose(): void
} & DefaultProps;

type DefaultProps = {
    id: string;
    title?: string;
    project?: string;
};


const TimerForm: React.FC<Props> = ({
    id = "",
    title: initialTitle = "",
    project: initialProject = "",
    onFormSubmit,
    onFormClose
}) => {
    const [title, setTitle] = useState<string>(id ? initialTitle : "");
    const [project, setProject] = useState<string>(id ? initialProject : "");

    const handleTitleChange = (newTitle: string) => setTitle(newTitle);
    const handleProjectChange = (newProject: string) => setProject(newProject);
    const handleSubmit = () => onFormSubmit({ id, title, project });
    const submitText = id ? "Update" : "Create";

    return (
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} value={title} onChangeText={handleTitleChange} underlineColorAndroid="transparent" />
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Project</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} value={project} onChangeText={handleProjectChange} underlineColorAndroid="transparent" />
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton color='#DB2828' title='Cancel' onPress={onFormClose} />
                <TimerButton color='#21ba45' title={submitText} onPress={handleSubmit} />
            </View>
        </View>
    );
};

interface Style {
    textInputTitle: TextStyle;
    formContainer: ViewStyle;
    attributeContainer: ViewStyle;
    textInputContainer: ViewStyle;
    textInput: TextStyle;
    buttonGroup: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    formContainer: {
        backgroundColor: "white",
        borderColor: "#D6D7DA",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: "#D6D7DA",
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default TimerForm;
