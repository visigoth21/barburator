
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
    if (pNum.length < 10) {
        return pNum;
    } else {
        return '(' + pNum.slice(0, 3) + ') ' + pNum.slice(3, 6) + '-' + pNum.slice(6, 10);    
    }
};


export const cleanPhoneNum = (pNum: string) => {
    return pNum.replace(/\D/g, '');
};

export const states = [
    "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
    "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
    "WI", "WY"
];