import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProjectMutations } from "../mutations";
import { ProjectQueries } from "../queries";

const DeleteProjectButton = ({ projectId }: { projectId: string }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(ProjectMutations.DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    refetchQueries: [
      {
        query: ProjectQueries.GET_PROJECTS,
      },
    ],
    onCompleted: () => {
      navigate("/");
    },
  });

  return (
    <button className="btn btn-danger" onClick={() => deleteProject()}>
      <FaTrash className="me-2" />
      Delete Project
    </button>
  );
};

export default DeleteProjectButton;
