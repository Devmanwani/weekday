import React from 'react';
import { useState } from 'react';

interface Props{
    title:string;
    company:string;
    location:string;
    description:string;
    experience:string;
}


export const JobCard = ({title, company, location, description, experience}:Props) =>{

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () =>{
        setShowFullDescription(!showFullDescription);
    }
    

    return (
        <div>
            <h2>{title}</h2>
            <p>Company: {company}</p>
            <p>Location: {location}</p>
            {showFullDescription?
            (<p>{description}</p>)
            :
            (<p>{description.slice(0, 200)}...</p>)
            }
            {!showFullDescription && <button onClick={toggleDescription}>Read More</button>}
            <p>Experience Required: {experience}</p>
            <button> Apply</button>
          
        </div>
    )
}