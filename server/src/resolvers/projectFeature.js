import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated } from './authorization';

export default {
    Query: {
        projectFeatures: combineResolvers(
            isAuthenticated,
            async (_, { projectId }, { dataSources }) => {
                return await dataSources.FeatureAPI.getAll(projectId);
            }
        ),
        projectFeature: combineResolvers(
            isAuthenticated,
            async (_, { projectId, featureId }, { dataSources }) => {
                const feature = await dataSources.FeatureAPI.getById(projectId, featureId);
                return feature[0];
            }
        )
    },
    Mutation: {
        addProjectFeature: combineResolvers(
            isAuthenticated,
            async (_, { input }, { dataSources }) => {
                return await dataSources.FeatureAPI.createNew(input);
            }
        ),
        updateProjectFeature: combineResolvers(
            isAuthenticated,
            async (_, { input, featureId }, { dataSources }) => {
                return await dataSources.FeatureAPI.updateFeature(input, featureId);
            }
        ),
        deleteProjectFeature: combineResolvers(
            isAuthenticated,
            async (_, { featureId }, { dataSources }) => {
                return await dataSources.FeatureAPI.deleteProjectFeature(featureId);
            }
        )
    }
};
