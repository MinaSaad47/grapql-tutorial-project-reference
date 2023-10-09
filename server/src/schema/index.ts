import {
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { Client } from "../models/client.model";
import { Project } from "../models/project.model";

const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      async resolve(parent, args) {
        return await Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    client: {
      type: ClientType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Client.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      async resolve(parent, args) {
        return await Client.find();
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      async resolve(parent, args) {
        return await Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Project.findById(args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Clients CRUDS
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return await client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        await Project.deleteMany({ clientId: args.id });
        return await Client.findByIdAndDelete(args.id);
      },
    },
    // Projects CRUDS
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              NotStarted: { value: "Not Started" },
              InProgress: { value: "In Progress" },
              Completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return await project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              NotStarted: { value: "Not Started" },
              InProgress: { value: "In Progress" },
              Completed: { value: "Completed" },
            },
          }),
        },
        clientId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});

export default schema;
