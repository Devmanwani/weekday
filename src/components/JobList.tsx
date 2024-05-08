
import { useState, useEffect, useRef } from 'react';
import { fetchJobsAPI, Job } from '../api';
import JobCard from './JobCard';
import './JobList.css';
import JobFilter, {FilterValues} from './JobFilter';

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterValues>({});
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobRef = useRef<HTMLDivElement | null>(null);

  const applyFilters = (job: Job, filters: FilterValues): boolean => {
    const {
      minExperience,
      jobRole,
      location,
      minSalary,
      companyName,
      Remote,
      
    } = filters;

    // Check if job matches all applied filters
    if (
      (minExperience && job.minExp && (job.minExp) > minExperience) ||
      (minExperience && job.maxExp && (job.maxExp) < minExperience)||
      (location && !job.location.toLowerCase().includes(location.toLowerCase())) ||
      (jobRole && !job.jobRole.toLowerCase().includes(jobRole.toLowerCase())) ||
      (companyName && !job.companyName.toLowerCase().includes(companyName.toLowerCase()))||
      (minSalary && job.minJdSalary && Number(job.minJdSalary) < minSalary) ||
      (Remote && job.location && !job.location.toLowerCase().includes(Remote.toLowerCase()=='hybrid' || Remote.toLowerCase()== 'in-office'? '': Remote.toLowerCase()))
    ) {
      return false;
    }

    return true;
  };

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
  
  function onFilterChange(filters: FilterValues){
    setFilters(filters);
    
  }
  
  return (

    <>
    <JobFilter onFilterChange={onFilterChange}/>
    <div className="job-list-container">
    
      {jobs.map((job, index) => {
        if (jobs.length === index + 1) {
          return (
            <div ref={lastJobRef} key={job.jdUid}>
              {applyFilters(job, filters) && (
              <JobCard
              logo = {job.logoUrl}
                title={job.jobRole}
                company={job.companyName}
                location={job.location}
                description={job.jobDetailsFromCompany}
                minExp = {job.minExp}
                maxExp = {job.maxExp}
              />)}
            </div>
          );
        } else {
          return (<>
            {applyFilters(job, filters) && (
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
            )}
            </>
          );
        }
      })}
      {isLoading && <div>Loading...</div>}
      {!hasMore && <div>No more jobs</div>}
    </div>
    </>
  );
  
};

export default JobList;
