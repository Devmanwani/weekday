import { useState } from "react";

interface FilterValues {
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

    const handleSearch = () => {
        onFilterChange(filters);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
    }

    return (
        <div className="job-filter-container">
            <h3>Filter Jobs</h3>
            <div>
                <label>Minimum Experience:</label>
                <select name="minExperience" value={filters.minExperience || ''} onChange={handleInputChange}>
                    <option value="">Select Minimum Experience</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Location:</label>
                <input type="text" name="location" value={filters.location || ''} onChange={handleInputChange} />
            </div>
            <div>
                <label>Role:</label>
                <input type="text" name="role" value={filters.jobRole || ''} onChange={handleInputChange} />
            </div>
            <div>
                <label>Minimum Salary:</label>
                <input type="number" name="minSalary" value={filters.minSalary || ''} onChange={handleInputChange} />
            </div>
            <div>
                <label>Job Type:</label>
                <select name="Remote" value={filters.Remote || ''} onChange={handleInputChange}>
                    <option value="">Select Option</option>
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            <div>
                <label>Company Name:</label>
                <input type="text" name="companyName" value={filters.companyName || ''} onChange={handleInputChange} />
            </div>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default JobFilter;
