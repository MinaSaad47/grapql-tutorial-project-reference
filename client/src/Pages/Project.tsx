import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectModal from "../components/EditProjectModal";
import Spinner from "../components/Spinner";
import { ProjectQueries } from "../queries";

const Project = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(ProjectQueries.GET_PROJECT, {
    variables: {
      id,
    },
  });

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = (
      <div className="mx-auto w-75 card p-5">
        <Link to={"/"} className="btn btn-light btn-sm w-25 d-inline  ms-auto">
          Back
        </Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        {data.project.client && <ClientInfo client={data.project.client} />}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <EditProjectModal project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      </div>
    );
  }

  return content;
};

export default Project;
