import React from 'react';
import Clock from './components/Clock';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

const App = () => {
	return (
		<>
			<StatusBar barStyle='light-content' />
			<SafeAreaView>
				<ScrollView
					centerContent={true}
					contentInsetAdjustmentBehavior='automatic'
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Clock />
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const ScrollView = styled.ScrollView`
	flex: 1;
	background-color: black;
`;

const SafeAreaView = styled.SafeAreaView`
	flex: 1;
	background-color: black;
`;

export default App;
