
import { useState, useEffect, useRef } from 'react';
import { fetchJobsAPI, Job } from '../api';
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobRef = useRef<HTMLDivElement | null>(null);

  const loadJobs = async (offset: number) => {
    setIsLoading(true);
    try {
      const data = await fetchJobsAPI(offset);
      setJobs(prevJobs => [...prevJobs, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadJobs(0);
   
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLoading && hasMore) {
        loadJobs(jobs.length);
      }
    }, { threshold: 0.5 });

    if (lastJobRef.current) {
      observer.current.observe(lastJobRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, jobs.length]);
  
  

  return (
    <div className="job-list-container">
      {jobs.map((job, index) => {
        if (jobs.length === index + 1) {
          return (
            <div ref={lastJobRef} key={job.jdUid}>
              <JobCard
              logo = {job.logoUrl}
                title={job.jobRole}
                company={job.companyName}
                location={job.location}
                description={job.jobDetailsFromCompany}
                minExp = {job.minExp}
                maxExp = {job.maxExp}
              />
            </div>
          );
        } else {
          return (
            <JobCard
              key={job.jdUid}
              title={job.jobRole}
              company={job.companyName}
              location={job.location}
              description={job.jobDetailsFromCompany}
              minExp = {job.minExp}
              maxExp = {job.maxExp}
              logo = {job.logoUrl}
            />
          );
        }
      })}
      {isLoading && <div>Loading...</div>}
      {!hasMore && <div>No more jobs</div>}
    </div>
  );
  
};

export default JobList;
