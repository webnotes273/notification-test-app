"use server"

import { connectToDatabase } from "@/lib/database";
import Notification, { INotification } from "../database/models/notification.model";
import {convertToUTC, handleError} from "@/lib/utils";
import { STORED_EMAIL_LIMIT } from "@/lib/constants";

export const createNotification = async ( params: INotification) => {
    try {
        await connectToDatabase();

        const count = await getNotificationsCount();

        if (count && count > STORED_EMAIL_LIMIT) {
            return false;
        }

        const newNotification = await Notification.create({ ...params });

        return JSON.parse(JSON.stringify(newNotification));
    } catch (error) {
        handleError(error)
    }
}

export const getNotificationsCount = async () => {
    try {
        await connectToDatabase();

        return Notification.countDocuments();
    } catch (error) {
        handleError(error)
    }
}