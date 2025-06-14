import axios from 'axios';
const API_BASE_URL = 'https://testapi.getlokalapp.com/common/jobs/'; 

export  const fetchJobs = async (page = 1) => {
    try {
        const requestUrl = `${API_BASE_URL}?page=${page}`;
        const response = await axios.get(requestUrl);
        if (response.status !== 200) {
            throw new Error(`Error fetching jobs: ${response.statusText}`);
        };
        return response.data.results;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
}