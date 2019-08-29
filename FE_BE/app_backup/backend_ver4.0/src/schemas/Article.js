const { getRepository, Equal } = require('typeorm');
const Article = require('../entities/Article');
const graphqlFields = require('graphql-fields');

const schemaObject = {
    typedef: `
        type Article {
            SEQ: ID!
            DOCID: String!
            DATE: String!
            SRC: String!
            TITLE: String!
            CONTENTS: String!
            KEYWORD1: String!
            KEYWORD2: String
            KEYWORD3: String
            KEYWORD4: String
            KEYWORD5: String
            SUMMARY: String!
        }
        type Query {
            articles: [Article]
            articlesByIds(ids: [String]): [Article]
            
        }
    `,
    resolvers: {
        Query: {
            articles: (_, args, context, info) => {
                const topLevelFields = Object.keys(graphqlFields(info));

                topLevelFields.splice(topLevelFields.indexOf('__typename'), 1);

                // https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
                return getRepository(Article).find({
                    select: topLevelFields,
                    // where: {
                    //     'DATE' : '2019-09-08'
                    // },
                    order: {
                        //'DATE': Equal('2019-07-09'),
                        'DATE': 'DESC'
                    }
                });
            },
            articlesByIds: (_, { ids }) => {
                const where = ids.map((id) => {
                    return { SEQ: id };
                });

                return getRepository(Article).find({
                    where,
                    order: {
                        'DATE': 'DESC'
                    }
                });
            }

            // articlesByContent: () => {
            //     return getRepository(Article).find({
            //         where : [
            //             DATE : '2019-09-08'
            //         ],
            //         order: {
            //             'DATE': 'DESC'
            //         }
            //     });
            // }
        }
    }
};

module.exports = schemaObject;