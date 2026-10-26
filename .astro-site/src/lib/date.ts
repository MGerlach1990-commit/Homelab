export function formatLongDate(date: Date = new Date()): string {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

export function formatOrdinalLongDate(date: Date = new Date()): string {
	const day = date.getDate();
	const remainder = day % 100;
	const suffix = remainder >= 11 && remainder <= 13 ? 'th' : (
		day % 10 === 1 ? 'st' :
		day % 10 === 2 ? 'nd' :
		day % 10 === 3 ? 'rd' : 'th'
	);
	const monthAndYear = new Intl.DateTimeFormat('en-GB', {
		month: 'long',
		year: 'numeric',
	}).format(date);

	return `${day}${suffix} ${monthAndYear}`;
}