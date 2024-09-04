import mongoose from 'mongoose';

export interface INotification {
    userName: string,
    notificationInterval: string,
    weeklyDay?: string,
    searchQuery: string,
    emailList: string,
    relevancyScore: number,
    time: string,
}

const NotificationSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    notificationInterval: { type: String, required: true },
    weeklyDay: { type: String },
    searchQuery: { type: String, required: true },
    emailList: { type: String, required: true },
    relevancyScore: { type: Number, required: true, default: 0 },
    time: { type: String, required: true }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);