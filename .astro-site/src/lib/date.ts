export function formatLongDate(date: Date = new Date()): string {
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}