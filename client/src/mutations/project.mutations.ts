import { gql } from "@apollo/client";

export abstract class ProjectMutations {
  static ADD_PROJECT = gql`
    mutation addProject(
      $name: String!
      $description: String!
      $status: ProjectStatus!
      $clientId: String!
    ) {
      addProject(
        name: $name
        description: $description
        status: $status
        clientId: $clientId
      ) {
        id
        name
        status
        description
        client {
          id
          name
          email
          phone
        }
      }
    }
  `;

  static DELETE_PROJECT = gql`
    mutation deleteProject($id: String!) {
      deleteProject(id: $id) {
        id
      }
    }
  `;

  static UPDATE_PROJECT = gql`
    mutation updateProject(
      $id: String!
      $name: String!
      $description: String!
      $status: ProjectStatusUpdate!
      $clientId: String!
    ) {
      updateProject(
        id: $id
        name: $name
        description: $description
        status: $status
        clientId: $clientId
      ) {
        id
        name
        status
        description
        client {
          id
          name
          email
          phone
        }
      }
    }
  `;
}
