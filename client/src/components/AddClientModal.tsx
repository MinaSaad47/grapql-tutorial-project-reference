import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { ClientMutations } from "../mutations";
import { ClientQueries } from "../queries";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ClientMutations.ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update: (cache, { data: { addClient } }) => {
      const { clients } = cache.readQuery({
        query: ClientQueries.GET_CLIENTS,
      }) as { clients: any[] };
      cache.writeQuery({
        query: ClientQueries.GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill out all fields");
      return;
    }
    console.log({ name, email, phone });
    addClient();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          Add Client
          <FaUser className="ms-2" />
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client Modal
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="form d-flex flex-column gap-2" onSubmit={onSubmit}>
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />
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
};

export default AddClientModal;
