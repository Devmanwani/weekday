
import './JobCard.css'; 
import { useState } from 'react';

interface Props {
  title: string;
  company: string;
  location: string;
  description: string;
  experience: string;
}

const JobCard = ({ title, company, location, description, experience }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>Company: {company}</p>
      <p>Location: {location}</p>
      {showFullDescription ? (
        <p>{description}</p>
      ) : (
        <p>{description.slice(0, 200)}...</p>
      )}
      {!showFullDescription && (
        <button onClick={toggleDescription}>Show more</button>
      )}
      <p>Experience Required: {experience}</p>
      <button className="apply-button">Apply</button>
    </div>
  );
}

export default JobCard;


