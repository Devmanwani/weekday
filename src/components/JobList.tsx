import React, { useState, useEffect, useRef } from 'react';
import { fetchJobsAPI, Job } from '../api';
import { JobCard } from './JobCard';

export const JobList = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);

    const loadJobs = async (offset: number) => {
        setLoading(true);
        try {
            // Ensure only 10 jobs are fetched initially
            const newOffset = offset === 0 ? 0 : jobs.length;
            const data = await fetchJobsAPI(newOffset);
            setJobs(prevJobs => [...prevJobs, ...data]);
        } catch (err: any) {
            console.error(err.message);
        }
        setLoading(false);
    }
    

    useEffect(() => {
        loadJobs(0);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadJobs(jobs.length);
        }
    }

    return (
        <div>
            {jobs.map((job) => (
                <JobCard
                    key={job.jdUid}
                    title={job.jobRole}
                    company={job.companyName}
                    location={job.location}
                    description={job.jobDetailsFromCompany}
                    experience={`${job.minExp} - ${job.maxExp}`}
                />
            ))}
        </div>
    )
}
