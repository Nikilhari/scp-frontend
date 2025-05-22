import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_API}/api/authRoutes`;

axios.defaults.withCredentials = true;

export const signup = async (formData) => {
    const response = await axios.post(`${API_URL}/user/register`, formData, {
        withCredentials: true
    });
    return response.data;
};

export const login = async (formData) => {
    const response = await axios.post(`${API_URL}/user/login`, formData, {
        withCredentials: true
    });
    return response.data;
};

export const adminLogin = async (formData) => {
    const response = await axios.post(`${API_URL}/admin/login`, formData, {
        withCredentials: true
    });
    return response.data;
};

export const logout = async () => {
    console.log(API_URL);
    const response = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true
    });
    return response.data;
};

export const sendOTP = async (email) => {
    return await axios.post(`${API_URL}/user/forgot-password`, { email }, {
        withCredentials: true
    });
};

export const verifyOTP = async (email, otp) => {
    return await axios.post(`${API_URL}/user/verify-otp`, { email, otp }, {
        withCredentials: true
    });
};

export const updatePassword = async (email, otp, newPassword) => {
    return await axios.post(`${API_URL}/user/reset-password`, {
        email,
        otp,
        newPassword
    }, {
        withCredentials: true
    });
};

export const checkAuth = async () => {
    const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true
    });
    return response.data;
};