"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { INotification } from "@/lib/database/models/notification.model";
import { createNotification } from "@/lib/actions/notification.actions";
import { DAY_OF_WEEK, FREQUENCY } from "@/lib/constants";
import { convertToUTC } from "@/lib/utils";

export default function Home() {
  const initFormData = {
    userName: '',
    notificationInterval: '',
    weeklyDay: '',
    searchQuery: '',
    emailList: '',
    relevancyScore: 0,
    time: ''
  }
  const [formData, setFormData] = useState<INotification>(initFormData);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      // Reset prev value of weeklyDay
      ...(e.target.name === "notificationInterval") && { weeklyDay: prev.notificationInterval === FREQUENCY.DAILY ? "" : e.target.value },
    }))
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newNotification = await createNotification({...formData, time: convertToUTC(formData.time)})

      if (!newNotification) {
        setFormData(initFormData)
        alert('Limit of notifications exceeded')
      }

      if(newNotification) {
        setFormData(initFormData)
        alert('Notification settings saved and email sent.');
      }
    } catch (error) {
      console.log(error);
      alert('Failed to save notification settings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="wrapper">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Bid Notifications</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label">Your name</label>
              <input
                  required
                  type="text"
                  name="userName"
                  placeholder="John Doe"
                  onChange={handleChange}
                  value={formData.userName}
                  className="input"
              />
            </div>
            <div className="mb-4">
              <label className="label">Notification Interval</label>
              <select
                  required
                  name="notificationInterval"
                  onChange={handleChange}
                  value={formData.notificationInterval}
                  className="input"
              >
                <option value="">Select interval</option>
                <option value={FREQUENCY.DAILY}>{FREQUENCY.DAILY}</option>
                <option value={FREQUENCY.WEEKLY}>{FREQUENCY.WEEKLY}</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="label">Weekly Notification Day</label>
              <select
                  required
                  disabled={formData.notificationInterval === FREQUENCY.DAILY}
                  name="weeklyDay"
                  onChange={handleChange}
                  value={formData.weeklyDay}
                  className="input"
              >
                <option value="">{formData.notificationInterval === FREQUENCY.DAILY ? "Disabled" : "Select day"}</option>
                <option value={DAY_OF_WEEK.MONDAY}>{DAY_OF_WEEK.MONDAY}</option>
                <option value={DAY_OF_WEEK.TUESDAY}>{DAY_OF_WEEK.TUESDAY}</option>
                <option value={DAY_OF_WEEK.WEDNESDAY}>{DAY_OF_WEEK.WEDNESDAY}</option>
                <option value={DAY_OF_WEEK.THURSDAY}>{DAY_OF_WEEK.THURSDAY}</option>
                <option value={DAY_OF_WEEK.FRIDAY}>{DAY_OF_WEEK.FRIDAY}</option>
                <option value={DAY_OF_WEEK.SATURDAY}>{DAY_OF_WEEK.SATURDAY}</option>
                <option value={DAY_OF_WEEK.SUNDAY}>{DAY_OF_WEEK.SUNDAY}</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="label">Search Query</label>
              <input
                  required
                  type="text"
                  name="searchQuery"
                  placeholder="Some text query"
                  onChange={handleChange}
                  value={formData.searchQuery}
                  className="input"
              />
            </div>
            <div className="mb-4">
              <label className="label">Notification Time</label>
              <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={formData.time}
                  className="input"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="label">Email List</label>
              <textarea
                  required
                  name="emailList"
                  placeholder="test@gmail.com"
                  onChange={handleChange}
                  value={formData.emailList}
                  className="textarea"
              />
            </div>
            <div className="mb-6">
              <label className="label">Relevancy Score</label>
              <input
                  type="number"
                  name="relevancyScore"
                  onChange={handleChange}
                  value={formData.relevancyScore}
                  className="input"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="button"
                  className="secondary-button"
                  disabled={isLoading}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="primary-button"
                  disabled={isLoading}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}