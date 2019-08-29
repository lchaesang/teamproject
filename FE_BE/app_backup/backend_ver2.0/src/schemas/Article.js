const { getRepository } = require('typeorm');
const Article = require('../entities/Article');

const schemaObject = {
    typedef: `
        type Article {
            SEQ: ID!
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
            articles: () => {
                // https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
                return getRepository(Article).find({
                    order: {
                        'DATE': 'ASC'
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
                        'DATE': 'ASC'
                    }
                });
            }
        }
    }
};

module.exports = schemaObject;