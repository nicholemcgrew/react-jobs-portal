import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMapMarker } from 'react-icons/fa';

const JobListing = ({ jobId }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`https://jobs.github.com/positions/${jobId}.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job');
                }
                const data = await response.json();
                setJob(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!job) {
        return <p>No job found</p>;
    }

    const { type, title, description, salary, location } = job;

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
                <div className="mb-6">
                    <div className="text-gray-600 my-2">{type}</div>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>

                <div className="mb-5">
                    {description}
                </div>

                <h3 className="text-indigo-500 mb-2">{salary} / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                        <FaMapMarker className="inline text-lg mb-1 mr-1" />
                        {location}
                    </div>
                    <Link
                        to={`/jobs/${jobId}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default JobListing;
