import React, { useState, useCallback } from 'react';
import Svg from 'react-native-svg';
import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import ClockMarkings from './ClockMarkings';
import Hand from './Hand';
import { useInterval } from '../helpers/hooks';
import { formatTime, getTime } from '../helpers/time';

const { width } = Dimensions.get('window');
const diameter = width - 40;
const center = width / 2;
const radius = diameter / 2;
const hourStickCount = 12;
const minuteStickCount = 12 * 6;

const Clock: React.FC = () => {
	const [time, setTime] = useState(getTime);
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useInterval(() => {
		setTime(getTime);
		if (isRunning) {
			setTimer((prev) => prev + 1);
		}
	}, 1000);

	const startTimer = useCallback(() => setIsRunning(true), []);
	const pauseTimer = useCallback(() => setIsRunning(false), []);
	const resetTimer = useCallback(() => {
		setIsRunning(false);
		setTimer(0);
	}, []);

	return (
		<Container>
			<Title>React Clock</Title>
			<CurrentTime>{formatTime()}</CurrentTime>

			<Svg
				height={width}
				width={width}
			>
				<ClockMarkings
					minutes={minuteStickCount}
					hours={hourStickCount}
					radius={radius}
					center={center}
				/>
				<Hand
					angle={time.seconds}
					center={center}
					radius={radius}
					stroke='red'
					strokeWidth='1'
				/>
				<Hand
					angle={time.minutes}
					center={center}
					radius={radius / 1.2}
					stroke='white'
					strokeWidth='5'
				/>
				<Hand
					angle={time.hours}
					center={center}
					radius={radius / 1.8}
					stroke='white'
					strokeWidth='5'
				/>
			</Svg>

			<Separator />

			<Box>
				<Subtitle>Stopwatch</Subtitle>
				<TimerDisplay>
					{new Date(timer * 1000).toISOString().slice(11, 19)}
				</TimerDisplay>
			</Box>

			<ButtonContainer>
				<ResetButton onPress={resetTimer}>
					<ButtonText>Reset</ButtonText>
				</ResetButton>
				<StartButton onPress={isRunning ? pauseTimer : startTimer}>
					<ButtonText>{isRunning ? 'Pause' : 'Start'}</ButtonText>
				</StartButton>
			</ButtonContainer>
		</Container>
	);
};

const Container = styled.View`
	justify-content: center;
	background-color: #000;
	padding: 20px;
`;

const Title = styled.Text`
	font-size: 40px;
	color: white;
	text-align: center;
`;

const CurrentTime = styled.Text`
	font-size: 25px;
	color: #ccc;
	text-align: center;
	margin-bottom: 20px;
`;

const Box = styled.View``;

const Subtitle = styled.Text`
	font-size: 20px;
	color: white;
	text-align: center;
`;

const TimerDisplay = styled.Text`
	font-size: 25px;
	color: #ccc;
	text-align: center;
`;

const Separator = styled.View`
	height: 1px;
	background-color: #80808094;
	margin: 10px 0;
	width: ${width / 1.5}px;
	align-self: center;
`;

const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	gap: 20px;
	margin: 10px 20px;
`;

const CustomButton = styled(TouchableOpacity)`
	flex: 1;
	border-radius: 5px;
	padding: 10px 0px;
`;

const ResetButton = styled(CustomButton)`
	background-color: #ff6347;
`;

const StartButton = styled(CustomButton)`
	background-color: #32cd32;
`;

const ButtonText = styled.Text`
	color: white;
	font-size: 16px;
	text-align: center;
`;

export default Clock;
