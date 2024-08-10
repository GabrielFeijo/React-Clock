import React, { useState } from 'react';
import Svg from 'react-native-svg';
import { Dimensions } from 'react-native';
import ClockMarkings from './ClockMarkings';
import Hand from './Hand';
import { useInterval } from '../helpers/hooks';
import { formatTime, getTime } from '../helpers/time';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const diameter = width - 40;
const center = width / 2;
const radius = diameter / 2;
const hourStickCount = 12;
const minuteStickCount = 12 * 6;

const Clock = () => {
	const [time, setTime] = useState(getTime);

	useInterval(() => {
		setTime(getTime);
	}, 1000);

	return (
		<>
			<Text>React Clock</Text>
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
					radius={radius}
					stroke='white'
					strokeWidth='5'
				/>
				<Hand
					angle={time.hours}
					center={center}
					radius={radius}
					stroke='white'
					strokeWidth='7'
				/>
			</Svg>
			<Text>{formatTime()}</Text>
		</>
	);
};

const Text = styled.Text`
	text-align: center;
	font-size: 40px;
	width: 100%;
	color: white;
`;

export default Clock;
