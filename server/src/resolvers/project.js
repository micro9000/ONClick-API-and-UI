import { combineResolvers } from 'graphql-resolvers';
// import { ForbiddenError } from "apollo-server";
import { isAuthenticated } from './authorization';

export default {
    Query: {
        projects: combineResolvers(isAuthenticated, async (_, __, { me, dataSources }) => {
            return await dataSources.ProjectAPI.getAllByUserId(me.id);
        }),
        project: combineResolvers(isAuthenticated, async (_, { id }, { me, dataSources }) => {
            const project = await dataSources.ProjectAPI.getById(id, me.id);
            return project[0];
        }),
        searchProjects: combineResolvers(
            isAuthenticated,
            async (_, { searchStr }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.searchProjects(searchStr, id);
            }
        )
    },
    Mutation: {
        createProject: combineResolvers(
            isAuthenticated,
            async (_, { input }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.createNew(input, id);
            }
        ),
        deleteProject: combineResolvers(
            isAuthenticated,
            async (parent, { id, userId }, { me, dataSources }) => {
                if (me && me.role && me.role === 'ADMIN' && typeof userId === 'undefined') {
                    throw new Error('User id is required');
                }

                if (me && me.role && me.role === 'ADMIN' && me.id && parseInt(userId) !== me.id) {
                    const projectToDelete = dataSources.ProjectAPI.getById(id, userId);

                    return projectToDelete
                        .then(async project => {
                            if (await dataSources.ProjectAPI.deleteById(true, id, userId)) {
                                return {
                                    success: true,
                                    message: 'Deleted successfully!',
                                    project: project[0]
                                };
                            }

                            throw new Error('Unable to delete this project');
                        })
                        .catch(err => {
                            throw err;
                        });
                }

                const projectToDelete = dataSources.ProjectAPI.getById(id, me.id);

                return projectToDelete
                    .then(async project => {
                        if (parseInt(project[0].userId) !== parseInt(me.id)) {
                            throw new Error('Permission denied!');
                        }

                        if (await dataSources.ProjectAPI.deleteById(false, id, me.id)) {
                            return {
                                success: true,
                                message: 'Deleted successfully!',
                                project: project[0]
                            };
                        }

                        throw new Error('Unable to delete this project');
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        ),
        updateProject: combineResolvers(
            isAuthenticated,
            async (_, { input }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.updateProject(input, id);
            }
        ),
        addProjectModule: combineResolvers(
            isAuthenticated,
            async (_, { module, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.addModule(module, projectId, id);
            }
        ),
        deleteProjectModule: combineResolvers(
            isAuthenticated,
            async (_, { module, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.deleteModule(module, projectId, id);
            }
        ),
        addProjectTag: combineResolvers(
            isAuthenticated,
            async (_, { tag, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.addTag(tag, projectId, id);
            }
        ),
        deleteProjectTag: combineResolvers(
            isAuthenticated,
            async (_, { tag, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.deleteTag(tag, projectId, id);
            }
        )
    },
    Project: {
        owner: async (project, args, { loaders }) => {
            return await loaders.user.load(project.userId);
        },
        status: async (project, args, { loaders }) => {
            return await loaders.projectStatus.load(project.projectStatusId);
        }
    }
};
