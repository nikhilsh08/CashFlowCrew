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

export const formatTime = (time?: string): string => {
    if (!time) return "";
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}