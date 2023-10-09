import { FaTrash } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { ClientMutations } from "../mutations";
import { ClientQueries, ProjectQueries } from "../queries";

const ClientRow = ({ client }: { client: any }) => {
  const [deleteClient] = useMutation(ClientMutations.DELETE_CLIENT, {
    variables: { id: client.id },
    update: (cache, { data: { deleteClient } }) => {
      const { clients } = cache.readQuery({
        query: ClientQueries.GET_CLIENTS,
      }) as { clients: any[] };
      cache.writeQuery({
        query: ClientQueries.GET_CLIENTS,
        data: {
          clients: clients.filter((c: any) => c.id !== deleteClient.id),
        },
      });
      const { projects } = cache.readQuery({
        query: ProjectQueries.GET_PROJECTS,
      }) as { projects: any[] };
      cache.writeQuery({
        query: ProjectQueries.GET_PROJECTS,
        data: {
          projects: projects.filter(
            (p: any) => p.client?.id !== deleteClient.id
          ),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
