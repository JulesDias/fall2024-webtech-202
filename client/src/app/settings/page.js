"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        username: '',
        email: '',
        notifications: false,
        date: new Date(),
        language: 'English',
        profilePicture: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        });
    };

    const handleDateChange = (date) => {
        setSettings({
            ...settings,
            date: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Settings saved:', settings);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl font-FS_Sinclair">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="mb-8 text-gray-700 dark:text-gray-300">Manage your application settings here.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={settings.username}
                            onChange={handleChange}
                            className="text-gray-900 mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-lg "
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                            className="text-gray-900 mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-lg"
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Notifications:
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleChange}
                            className="mt-2 ml-2 "
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Select Date of Birth:
                        <DatePicker
                            selected={settings.date}
                            onChange={handleDateChange}
                            className="text-gray-900 mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-lg "
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Language:
                        <select
                            name="language"
                            value={settings.language}
                            onChange={handleChange}
                            className="text-gray-900 mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-lg"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                        </select>
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                        Profile Picture:
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-lg"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-5 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;
