/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

import GeneratePdfButton from './GeneratePdfButton';

function Home() {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch schedule data from the Express API
        axios
            .get('http://localhost:3001/schedule')
            .then((response) => {
                console.log(response.data)
                setSchedule(response.data);
            })
            .catch((error) => console.error('Error fetching schedule:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {!loading && (
                <>
                    <GeneratePdfButton />
                </>
            )}
        </div>
    );
}

export default Home;
