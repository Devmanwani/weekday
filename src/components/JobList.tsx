import React, {useState, useEffect, useRef} from 'react';
import { fetchJobsAPI, Job} from '../api';
import { JobCard } from './JobCard';


export const JobList = ()=>{
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    

    const loadJobs = async (offset:number)=>{
        setLoading(true);
        try{
            const data = await fetchJobsAPI(offset);
            setJobs(prevJobs =>[...prevJobs, ...data]);
            
        }catch(err:any){
            console.error(err.message);
        }

        setLoading(false);
}

    useEffect(()=>{
        loadJobs(0);
    }, []);

    return (
        <div>
            {jobs.map((job) =>{
                    return(
                    <JobCard
                    key={job.jdUid}
                    title = {job.jobRole}
                    company = {job.companyName}
                    location = {job.location}
                    description = {job.jobDetailsFromCompany}
                    experience = {`${job.minExp} - ${job.maxExp}`}
                    />
            )}
        )}
        </div>
    )

}