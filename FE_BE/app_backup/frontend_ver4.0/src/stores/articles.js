import { observable, action } from 'mobx';
import ApolloClient, { gql } from 'apollo-boost';
import _ from 'lodash';

const client = new ApolloClient({
    //uri: 'http://reactbackend.is.hubpop.io'
    uri: 'http://localhost:4000'
});

// only id list
const GET_ARTICLES_ID_AND_KEYWORDS = gql`
    query GetArticlesMetaData {
        articles {
            SEQ,
            KEYWORD1,
            KEYWORD2,
            KEYWORD3,
            KEYWORD4,
            KEYWORD5
        }
    }
`;

// get articles by ids
const GET_ARTICLES_BY_IDS = gql`
    query GetArticlesByIds($ids: [String]) {
        articlesByIds(ids: $ids) {
            SEQ,
            DOCID,
            DATE,
            SRC,
            TITLE,
            KEYWORD1,
            KEYWORD2,
            KEYWORD3,
            KEYWORD4,
            KEYWORD5,
            SUMMARY
        }
    }
`;

// get article by id for showing modal
const GET_ARTICLE_CONTENTS_BY_ID = gql`
    query GetArticleById($id: [String]) {
        articlesByIds(ids: $id) {
            SEQ,
            DOCID,
            DATE,
            SRC,
            TITLE,
            CONTENTS,
            KEYWORD1,
            KEYWORD2,
            KEYWORD3,
            KEYWORD4,
            KEYWORD5
        }
    }
`;

const ARTICLE_NUM = 3;

export default class ArticleStore {
    @observable originMetaData = [];
    @observable showedMetaData = [];
    @observable articles = [];
    @observable keywords = [];
    @observable isShowingModal = false;
    @observable modalContents = {
        title: '',
        contents: '',
        src:''
    };
    @observable isLoading = false;

    // getting original metadata
    async getMetaData() {
        let response = await client.query({
            query: GET_ARTICLES_ID_AND_KEYWORDS
        });

        this.originMetaData = [...response.data.articles];
    }

    // getting articles by ids
    async getAddedArticles(ids) {
        let response = await client.query({
            query: GET_ARTICLES_BY_IDS,
            variables: { ids }
        });

        return response.data.articlesByIds;
    }

    // getting article by id
    async getArticleById(id) {
        let response = await client.query({
            query: GET_ARTICLE_CONTENTS_BY_ID,
            variables: { id: [id] }
        });

        return response.data.articlesByIds[0];
    }

    // setting keyword by original metadata
    setKeyword() {
        const forKeyword = [1, 2, 3, 4, 5];
        let keywords = [];
        let weightedKeywords = [];

        this.originMetaData.forEach((metaDatum) => {
            forKeyword.forEach((ind) => {
                if (metaDatum[`KEYWORD${ind}`]) {
                    keywords.push(metaDatum[`KEYWORD${ind}`]);
                }
            })
        });

        keywords = _.groupBy(keywords)

        for (let keyword in keywords) {
            weightedKeywords.push({
                text: keyword,
                value: keywords[keyword].length
            });
        }

        this.keywords = weightedKeywords;
    }

    // when page refreshing: no keyword
    @action getArticles = () => {
        this.isLoading = true;

        this.getMetaData().then(() => {
            this.setKeyword();

            this.showedMetaData = this.originMetaData;

            this.addArticles();
        });
    }

    // when click "read more" button
    @action addArticles = () => {
        if (this.articles.length === this.showedMetaData.length) {
            return;
        }
        this.isLoading = true;

        const currentIdx = this.articles.length;
        let ids = [];

        for (let i = currentIdx; i < currentIdx + ARTICLE_NUM; i++) {
            if (this.showedMetaData[i]) {
                ids.push(this.showedMetaData[i].SEQ);
            } else {
                break;
            }
        }

        this.getAddedArticles(ids).then((addedArticles) => {
            this.isLoading = false;
            
            this.articles = [...this.articles.slice(), ...addedArticles];
        });
    }

    // getting articles by keyword(or search text)
    @action getArticlesByKeyword = ({text}) => {
        if (text === '' || !text) {
            this.getArticles();

            return;
        }

        this.showedMetaData = this.originMetaData.filter((datum) => {
            if (
                datum.KEYWORD1 === text ||
                datum.KEYWORD2 === text ||
                datum.KEYWORD3 === text ||
                datum.KEYWORD4 === text ||
                datum.KEYWORD5 === text
            ) {
                return true;
            } else {
                return false;
            }
        });

        this.articles = [];

        this.addArticles();
    }

    // getting article title/content
    // for showing modal
    @action getArticleContent = (id) => {
        this.getArticleById(id).then((articleContents) => {
            this.modalContents = {
                title: articleContents.TITLE,
                contents: articleContents.CONTENTS,
                src: articleContents.SRC,
                date: articleContents.DATE
            };

            this.isShowingModal = true;
        });
    }
}