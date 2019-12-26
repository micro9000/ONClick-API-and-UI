import { gql } from "apollo-server";

export default gql`
  enum Module {
    ISSUE_TRACKING
    WIKI
    TIME_TRACKING
    FORUMS
    NEWS
    CALENDAR
    DOCUMENTS
    GANTT
    FILES
  }

  type Project {
    id: ID!
    title: String!
    subProject: String!
    description: String!
    homePage: String!
    tags: [String!]!
    isPublic: Boolean!
    owner: User!
    modules: [Module!]!
    status: ProjectStatus!
    members: ProjectMembers
    issues: [ProjectIssue!]
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
  }

  input ProjectInput {
    """
    ID from ProjectStatus Table
    """
    initialStatus: ID!
    title: String!
    subProject: String
    description: String!
    homePage: String!
    tags: [String!]!
    isPublic: Boolean!
    modules: [Module!]!
  }

  extend type Query {
    projects: [Project!]
    project(id: ID!): Project!
  }

  type ProjectResponse {
    success: Boolean!
    message: String!
    project: Project!
  }

  extend type Mutation {
    createProject(input: ProjectInput!): Project!
    deleteProject(id: ID!, userId: ID): ProjectResponse
  }
`;
