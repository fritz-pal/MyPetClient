import { useEffect, useState } from "react"

const useFile = (initialFile: File | null) => {
    const [file, setFile] = useState(initialFile);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<null | string>(null);

    const fileEffect = async () => {
        const abortCont = new AbortController();
        if (file == null){
            setIsLoading(false);
            setIsDone(false);
            setIsError(false);
            return;
        }
        setIsLoading(true);
        setIsError(false);
        setIsDone(false);

        try {
            const fileContent = await readFileAsync(file);
            setData(fileContent);
            setIsDone(true);
            setIsLoading(false);
        } catch (error: any) {
            if (error.name === "AbortError") {
                // Handle the case where the operation was aborted
                console.log("File reading operation aborted.");
            } else {
                setIsError(true);
                console.error("Error reading file:", error);
                setIsLoading(false);
            }
        } finally {
            
        }
        return abortCont.abort;
    }

    useEffect(() => {
        fileEffect()
    }, [file]);
    useEffect(() => {
        fileEffect()
    }, []);

    return {isDone, isLoading, isError, data, setFile, file}
}

const readFileAsync = (file: File, signal?: AbortSignal): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to read file."));
            }
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        if (signal) {
            signal.addEventListener("abort", () => {
                reader.abort();
                reject(new Error("File reading operation aborted."));
            });
        }

        reader.readAsDataURL(file);
    });
}

export default useFile