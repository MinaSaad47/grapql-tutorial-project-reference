import { useQuery } from "@apollo/client";
import { ProjectQueries } from "../queries";
import { ProjectCard } from "./ProjectCard";
import Spinner from "./Spinner";

const Projects = () => {
  const { data, loading, error } = useQuery(ProjectQueries.GET_PROJECTS);

  let content;

  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = (
      <div className="row">
        {data.projects.map((project: any) => (
          <div className="col-md-4 col-sm-6 py-3 px-3" key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    );
  }

  return <div className="mt-3">{content}</div>;
};

export default Projects;
