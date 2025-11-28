import { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        roles: []
    });

    const [errors, setErrors] = useState({});
    const allRoles = ['Admin', 'Member'];

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                password: '', // Never pre-fill password
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phoneNumber: user.phoneNumber || '',
                roles: user.roles || []
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRoleChange = (role, isChecked) => {
        setFormData(prev => ({
            ...prev,
            roles: isChecked
                ? [...prev.roles, role]
                : prev.roles.filter(r => r !== role)
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password is required only for new users
        if (!user && !formData.password) {
            newErrors.password = 'Password is required for new users';
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Don't send password if it's empty (for updates)
            const dataToSend = { ...formData };
            if (user && !dataToSend.password) {
                delete dataToSend.password;
            }
            onSave(dataToSend);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password {!user && '*'}
                    {user && <span className="text-gray-500 text-xs ml-1">(leave blank to keep current)</span>}
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={user ? 'Leave blank to keep current password' : ''}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roles
                </label>
                <div className="space-y-2">
                    {allRoles.map(role => (
                        <div key={role} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`role-${role}`}
                                checked={formData.roles.includes(role)}
                                onChange={(e) => handleRoleChange(role, e.target.checked)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-900">
                                {role}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                    {user ? 'Update User' : 'Create User'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
