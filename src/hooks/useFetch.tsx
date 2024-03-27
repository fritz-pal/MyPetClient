import { useEffect, useState } from "react"

export const useFetch = <T,>(url: string): { data: T | null, loading: boolean, error: boolean } => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)



    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setLoading(false);
                    setError(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                })
            return () => abortCont.abort();
        }, 1000)
    }, [url])

    return { data, loading, error }
}