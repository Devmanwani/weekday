import { useState } from "react";
import './JobFilter.css';
import { useEffect } from "react";

export interface FilterValues {
    minExperience?: number;
    location?: string;
    jobRole?: string;
    minSalary?: number;
    companyName?: string;
    Remote?: string;
    techStack?: string;
}

interface Props {
    onFilterChange: (filters: FilterValues) => void;
}

const JobFilter = ({ onFilterChange }: Props) => {
    const [filters, setFilters] = useState<FilterValues>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(filters);
        }, 700); 

        return () => {
            clearTimeout(timer); 
        };
    }, [filters, onFilterChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
    }

    return (
        <div className="job-filter-container">
            
            <div>
                
                <select name="minExperience" value={filters.minExperience || ''} onChange={handleInputChange}>
                    <option value="">Select Minimum Experience</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>

            <div>
               
                <input type="text" placeholder="location" name="location" value={filters.location || ''} onChange={handleInputChange} />
            </div>
            <div>
                
                <input type="text" placeholder="role" name="jobRole" value={filters.jobRole || ''} onChange={handleInputChange} />
            </div>
            <div>
                
                <input type="number" placeholder="Salary" name="minSalary" value={filters.minSalary || ''} onChange={handleInputChange} />
            </div>
            <div>
                
                <select name="Remote" value={filters.Remote || ''} onChange={handleInputChange}>
                    <option value="">Job Type</option>
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            <div>
                
                <input type="text" placeholder="Company" name="companyName" value={filters.companyName || ''} onChange={handleInputChange} />
            </div>
            {/* <button onClick={handleSearch}>Search</button> */}
        </div>
    );
}

export default JobFilter;
