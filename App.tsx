import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, TextStyle, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';

import { newTimer } from './utils/TimerUtils';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { Timer, Attribute } from './utils/types';
import { uuid } from './utils/uuid';

const App : React.FC = () => {
	const [timers, setTimers] = useState<Timer[]>([
		{
			title: "Mow the lawn",
			project: "House Chores",
			id: uuid(),
			elapsed: 5460494,
			isRunning: false,
		},
		{
			title: "Clear paper jam",
			project: "Office Chores",
			id: uuid(),
			elapsed: 1277537,
			isRunning: false,
		},
		{
			title: "Ponder origins of universe",
			project: "Life Chores",
			id: uuid(),
			elapsed: 120000,
			isRunning: true,
		},
	]);

	const intervalId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const TIME_INTERVAL = 1000;

		intervalId.current = setInterval(() => {
			setTimers((prevTimers) => prevTimers.map((timer) => timer.isRunning ? { ...timer, elapsed: timer.elapsed + TIME_INTERVAL } : timer));
		}, TIME_INTERVAL);

		return () => {
			if(intervalId.current) clearInterval(intervalId.current);
		}
	}, []);

	const handleCreateFormSubmit = (timer: Timer) => setTimers([newTimer(timer), ...timers]);
	const handleFormSubmit = (attrs: Attribute) => setTimers((prevTimers) => prevTimers.map((timer) => timer.id === attrs.id ? { ...timer, title: attrs.title ?? timer.title, project: attrs.project ?? timer.project } : timer));
	const handleRemovePress = (timerId: string) => setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== timerId));
	const toggleTimer = (timerId: string) => setTimers((prevTimers) => prevTimers.map((timer) => timer.id === timerId ? { ...timer, isRunning: !timer.isRunning } : timer));

	return(
		<View style={styles.appContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Timers</Text>
			</View>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.timerListContainer}>
				<ScrollView style={styles.timerList}>
					<ToggleableTimerForm onFormSUbmit={handleCreateFormSubmit} />
					{timers.map(({ title, project, id, elapsed, isRunning }) => (
						<EditableTimer
							key={id}
							id={id}
							title={title}
							project={project}
							elapsed={elapsed}
							isRunning={isRunning}
							onFormSubmit={handleFormSubmit}
							onRemovePress={handleRemovePress}
							onStartPress={toggleTimer}
							onStopPress={toggleTimer}
						/>
					))}
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

interface Style {
	title:  TextStyle;
	timerList: ViewStyle;
	appContainer: ViewStyle;
	titleContainer: ViewStyle;
	timerListContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
	appContainer: {
		flex: 1
	},
	titleContainer: {
		paddingTop: 35,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#D6D7DA',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	timerListContainer: {
		flex: 1,
	},
	timerList: {
		paddingBottom: 15,
	},
});


export default App;