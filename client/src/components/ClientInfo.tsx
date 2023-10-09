import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";

const ClientInfo = ({ client }: { client: any }) => {
  return (
    <div>
    <h5>Client Info</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="me-2"/> {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="me-2"/> {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="me-2"/>
          {client.phone}
        </li>
      </ul>
    </div>
  );
};

export default ClientInfo;
