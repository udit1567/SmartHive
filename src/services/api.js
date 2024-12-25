const API_URL = 'http://localhost:5000/api';

export const fetchDevices = async () => {
    try {
        const response = await fetch(`${API_URL}/devices`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
};
