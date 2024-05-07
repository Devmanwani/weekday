
import './JobCard.css'; 
import { useState } from 'react';

interface Props {
  title: string;
  company: string;
  location: string;
  description: string;
  logo:string;
  minExp: string| number;
  maxExp: string| number;
}

const JobCard = ({ title, company, location, description, logo, minExp, maxExp }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
   let jobCard = document.getElementById('job-card');
   if(jobCard)
   jobCard.style.height = 'fit-content';
    
  };

  return (
    <div id='job-card' className="job-card">
      <div className='cardHeader'>
      <img className='logo' src = {logo}></img>
      <div className='rightHeader'>
      <div className='company'>{company}</div>
      {title}
      </div>
      </div>
      
      <p>Location: {location}</p>
      {showFullDescription ? (
        <p>{description}</p>
      ) : (
        <p>{description.slice(0, 200)}...</p>
      )}
      {!showFullDescription && (
        <button onClick={toggleDescription}>Show more</button>
      )}
      {minExp && maxExp? <p>Experience: {minExp} - {maxExp} years</p>: <p></p>}
      <button className="apply-button">Apply</button>
    </div>
  );
}

export default JobCard;


