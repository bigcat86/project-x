import React from 'react';
import * as Icon from "react-bootstrap-icons";


export default function ProjectCard({ projects }) {

  const style = {
    width: 500
  }

  return (

    <div className='list-group w-100' data-bs-theme="dark">
      <h3 className='project-title text-start border border-light rounded bg-primary p-3'><Icon.CheckCircleFill color="whitesmoke" size={25} /> Projects</h3>  
      <ul className="Projects list-group mt-2" data-bs-theme="dark">
      {projects.map((project) => {
        return (
            <a
        href='#'
        className='list-group-item list-group-item-action'
        aria-current='true'
      >
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='mb-1 text-primary'>{ project.projectName }</h5>
          <small>Deadline: { project.deadline }</small>
        </div>
        <p className='mb-1 text-start'>{ project.description }</p>
        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar" style={{ width: project.completion * 10 }}>{ project.completion }%</div>
        </div>
      </a>
        )
      })}
      </ul>
    </div>
  );
}
