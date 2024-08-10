export const to12hClock = (hour: number): number => {
	return hour > 12 ? hour - 12 : hour;
};

type TimeObject = {
	hours: number;
	minutes: number;
	seconds: number;
};

export const getTime = (): TimeObject => {
	const date = new Date();
	const hours = (to12hClock(date.getHours()) / 12) * 360;
	const minutes = (date.getMinutes() / 60) * 360;
	const seconds = (date.getSeconds() / 60) * 360;
	return { hours, minutes, seconds };
};

export const formatTime = (): string => {
	const date = new Date();

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
};
