import { connectToDatabase } from "@/lib/database";
import Notification, { INotification } from "./database/models/notification.model";
import { sendEmail } from './email';
import { FREQUENCY, FREQUENCY_ARRAY, getMailTemplate } from "@/lib/constants";
import {DateTime} from "luxon";

const cron = require('node-cron');

const sendScheduledEmails = async () => {
    await connectToDatabase();
    try {
        const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }); // Current week day
        // Convert current time
        const currentTime = DateTime.now().toFormat("HH:mm");

        console.log('START JOB AT: ', currentTime);

        const dueNotifications = await Notification.find({
            notificationInterval: { $in: FREQUENCY_ARRAY },
            $or: [
                { notificationInterval: FREQUENCY.DAILY, time: currentTime },
                { notificationInterval: FREQUENCY.WEEKLY, weeklyDay: currentDay, time: currentTime },
            ],
        }) as INotification[];

        console.log('MATCHED NOTIFICATIONS: ', dueNotifications);

        for (const notification of dueNotifications) {
            const emailContent = getMailTemplate({ userName: notification.userName, searchQuery: notification.searchQuery });
            const emails = notification.emailList.split(',');

            for (const email of emails) {
                await sendEmail({
                    to: email.trim(),
                    subject: `Notification for your query: ${notification.searchQuery}`,
                    text: `This is ${notification.userName}. You’ve requested notifications about: ${notification.searchQuery}.`,
                    html: emailContent,
                });
            }
        }
    } catch (error) {
        console.error('Error checking and sending notifications: ', error);
    }
};

// Run the job every minute
cron.schedule('* * * * *', sendScheduledEmails);

export default sendScheduledEmails;