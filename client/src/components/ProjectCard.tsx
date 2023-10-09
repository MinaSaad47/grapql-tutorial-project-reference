export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{project.name}</h5>
          <a href={`/projects/${project.id}`} className="btn btn-light">
            View
          </a>
        </div>
        <p className="small">
          Status: <span className="fw-semibold">{project.status}</span>
        </p>
      </div>
    </div>
  );
};
