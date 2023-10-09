import { gql } from "@apollo/client";

export class ClientMutations {
  static DELETE_CLIENT = gql`
    mutation deleteClient($id: String!) {
      deleteClient(id: $id) {
        id
      }
    }
  `;

  static ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
      addClient(name: $name, email: $email, phone: $phone) {
        id
        name
        email
        phone
      }
    }
  `;
}
