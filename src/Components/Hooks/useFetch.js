import { useEffect, useState } from 'react';

export const useFetch = () => {
    const [responce, setResponce] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const json = await fetch('DB.json');
                const res = await json.json();
                setResponce(res);
            } catch(err) {
                setError(err);
            }
    };
    fetchData();
}, []);
    
    return { responce, error };
}