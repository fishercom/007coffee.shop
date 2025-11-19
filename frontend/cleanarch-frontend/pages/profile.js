import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, setUser } = useAuth(); // Get user and setUser from AuthContext
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const defaultAvatar = '/default-avatar.svg'; // Path to your default avatar

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            router.push('/login');
        } else if (!user) { // Only fetch if user is not already in context
            fetchUserProfile(token);
        } else {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user, router]);

    const fetchUserProfile = async (token) => {
        try {
            const response = await api.get('/UserProfile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data); // Update user in AuthContext
            setFirstName(response.data.firstName || '');
            setLastName(response.data.lastName || '');
            setPhoneNumber(response.data.phoneNumber || '');
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setMessage('Failed to fetch user profile.');
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        const token = localStorage.getItem('jwt');
        try {
            const updatedProfile = { firstName, lastName, phoneNumber };
            await api.put('/UserProfile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Profile updated successfully!');
            setUser(prevUser => ({ ...prevUser, ...updatedProfile })); // Update user in AuthContext
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }
        const token = localStorage.getItem('jwt');
        try {
            await api.put('/UserProfile/change-password', { currentPassword, newPassword }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('Failed to change password. Please check your current password.');
        }
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    const userAvatar = user && user.avatarUrl ? user.avatarUrl : defaultAvatar;

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">User Profile</h1>
                {message && <p className="mb-4 text-green-500">{message}</p>}
            </div>

            <div className="flex flex-col items-center mb-8">
                <img src={userAvatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="px-4 py-6 sm:px-0">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <form onSubmit={handleProfileUpdate}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            value={user.email}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </>
    );
}