import { gql } from "@apollo/client";

export abstract class ClientQueries {
  static GET_CLIENTS = gql`
    {
      clients {
        id
        name
        email
        phone
      }
    }
  `;
}
