import { gql } from "@apollo/client";

export class ProjectQueries {
  static GET_PROJECTS = gql`
    query getProjects {
      projects {
        id
        name
        status
        client {
          id
        }
      }
    }
  `;
  static GET_PROJECT = gql`
    query getProject($id: String!) {
      project(id: $id) {
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
