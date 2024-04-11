import { useEffect, useState } from "react";

export const useDebouncedSearch = (search: string, debounceTime: number = 1000) : [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, debounceTime);

        return () => {
            clearTimeout(timer);
        };
    }, [search, debounceTime]);

    return [debouncedSearch, setDebouncedSearch];
};