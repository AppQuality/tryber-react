import React, { useState, useEffect } from "react";
import API from '../utils/api'

export default function ProjectList({ token }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.campaigns(token)
      .then((response) => {
        setProjects(response.map(res => ({id: res.id, name: res.name})));
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
      <ul data-testid='projectlist' >
        {projects.map(project => (

          <li key={project.id} >{project.name}</li>
        ))}
      </ul>
  );

}
