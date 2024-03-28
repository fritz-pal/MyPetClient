import { useEffect, useState } from "react";
import axios from 'axios';

export const useAxiosPost = <RequestType, ResponseType>(url: string, payload: RequestType) => {
    const [data, setData] = useState<ResponseType | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                console.log("Posting");
                const response = await axios.post(
                    url,
                    payload
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { data, error, loading };
};