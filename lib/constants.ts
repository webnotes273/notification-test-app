export const getMailTemplate = ({ userName, searchQuery }: { userName: string, searchQuery: string }) => {
    return `
      <h1>Hello!</h1>
      <p>This is ${userName}. You’ve requested notifications about <strong>${searchQuery}</strong>.</p>
      <p>Have a great day,</p>
      <p>${userName}</p>
    `;
}

export const FREQUENCY_ARRAY = ['daily', 'weekly', 'monthly'];
export enum FREQUENCY {
    DAILY = 'daily',
    WEEKLY = 'weekly'
}

export enum DAY_OF_WEEK {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

export const STORED_EMAIL_LIMIT = 3; // Limit of stored emails to avoid mail service overload