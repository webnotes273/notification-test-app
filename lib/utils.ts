import { DateTime } from "luxon";

export const handleError = (error: unknown) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const convertToUTC = (timeStr: string) => {
    return DateTime.fromFormat(timeStr, 'HH:mm', { zone: 'local' }).setZone('utc').toFormat('HH:mm');
}