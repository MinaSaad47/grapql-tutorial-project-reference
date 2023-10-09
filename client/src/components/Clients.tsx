import { useQuery } from "@apollo/client";
import { ClientQueries } from "../queries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const Clients = () => {
  const { data, loading, error } = useQuery(ClientQueries.GET_CLIENTS);

  let content;

  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <div>Error</div>;
  } else {
    content = (
      <>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client: any) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return <div>{content}</div>;
};

export default Clients;
