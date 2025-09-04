interface FormatDateOptions {
    day: 'numeric';
    month: 'long';
    year: 'numeric';
}

export const formatdate = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    } as FormatDateOptions);
}