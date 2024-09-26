import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextStyle, ViewStyle } from 'react-native';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

const App : React.FC = () => {
	return(
		<View style={styles.appContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Timers</Text>
			</View>
			<ScrollView style={styles.timerListContainer}>

			</ScrollView>
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