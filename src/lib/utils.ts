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

export const getPhoneNumView = (pNum: string) => {
    return '(' + pNum.slice(0, 3) + ') ' + pNum.slice(3, 6) + '-' + pNum.slice(6, 10);
};