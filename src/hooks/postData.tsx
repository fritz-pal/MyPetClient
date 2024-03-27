import axios from 'axios';

const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(url, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default postData;