// src/lib/utils.ts

type GetReadableDateParams = {
    date: Date;
    options?: Intl.DateTimeFormatOptions;
};

export const getReadableDate = ({ date }: GetReadableDateParams) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};
