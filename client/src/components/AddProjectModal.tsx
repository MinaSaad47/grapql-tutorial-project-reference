import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { ProjectMutations } from "../mutations";
import { ClientQueries, ProjectQueries } from "../queries";
import Spinner from "./Spinner";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NotStarted");
  const [clientId, setClientId] = useState("");

  const { data, loading, error } = useQuery(ClientQueries.GET_CLIENTS);

  const [addProject] = useMutation(ProjectMutations.ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    update: (cache, { data: { addProject } }) => {
      const { projects } = cache.readQuery({
        query: ProjectQueries.GET_PROJECTS,
      }) as { projects: any[] };
      cache.writeQuery({
        query: ProjectQueries.GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !status || !clientId) {
      alert("Please fill out all fields");
      return;
    }
    console.log({ name, description, status, clientId });
    addProject();
  };

  let content;

  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = (
      <>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#AddProjectModal">
          <div className="d-flex align-items-center">
            Add Project
            <FaList className="ms-2" />
          </div>
        </button>

        <div
          className="modal fade"
          id="AddProjectModal"
          aria-labelledby="AddProjectModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="AddProjectModalLabel">
                  Add Project Modal
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form
                  className="form d-flex flex-column gap-2"
                  onSubmit={onSubmit}>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    value={description}
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="NotStarted">Not Started</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <label htmlFor="client" className="form-label">
                    Client
                  </label>
                  <select
                    className="form-select"
                    value={clientId}
                    id="client"
                    onChange={(e) => setClientId(e.target.value)}>
                    <option value="" disabled>
                      Select Client
                    </option>
                    {data.clients.map((client: any) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-secondary mt-3 center"
                    data-bs-dismiss="modal"
                    type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default AddProjectModal;
