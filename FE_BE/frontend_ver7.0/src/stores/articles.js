import { observable, action } from 'mobx';
import axios from 'axios';

const ARTICLE_NUM = 3;
//const url = 'http://localhost:4000';
const url = 'http://newsbackend.is.hubpop.io';

export default class ArticleStore {
    @observable originIds = [];
    @observable showedIds = [];
    @observable articles = [];
    @observable keywords = [];
    @observable isShowingModal = false;
    @observable modalContents = {
        title: '',
        contents: '',
        src: ''
    };
    @observable isLoading = false;
    @observable from = undefined;
    @observable to = undefined;



    // getting original metadata(all id list and keyword data)
    async getMetaData(from, to) {

        if (from === undefined || to === undefined) {
            var momnet = require('moment');
            this.from = momnet().subtract(1, 'w').format("YYYY-MM-DD")
            this.to = momnet().format("YYYY-MM-DD");
            from = this.from;
            to = this.to;
        }



        try {
            let response = await axios.get(`${url}/metaData`, {
                params: { from, to }
            });

            this.originIds = response.data.ids;
            this.keywords = response.data.keywords;

        } catch (error) {
            console.log('error: ', error);
        }
    }

    // getting id list which searched by keyword(or search text)
    async getIdsByKeyword(keyword, from, to) {
        try {
            let response = await axios.get(`${url}/articlesByKeyword`, {
                params: { keyword, from, to }
            });

            // this.showedIds = response.data.ids;
            return response.data.ids;
        } catch (error) {
            console.log('error: ', error);
        }
    }


    // getting id list which searched by nokeyword(or search text)
    async getIdsBynoKeyword(from, to) {
        try {
            let response = await axios.get(`${url}/articlesBynoKeyword`, {
                params: { from, to }
            });
            return response.data.ids;
        } catch (error) {
            console.log('error: ', error);
        }
    }


    // getting articles by ids
    async getAddedArticles(ids) {
        try {
            let response = await axios.get(`${url}/articlesByIds`, {
                params: {
                    ids: ids.join(',')
                }
            });

            return response.data.articles;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    // getting article by id
    async getArticleById(id) {
        try {
            let response = await axios.get(`${url}/articleById`, {
                params: { id }
            });

            return response.data.article;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    // when page refreshing: no keyword
    @action getArticles = () => {
        this.isLoading = true;
        const from = this.from;
        const to = this.to;


        this.getMetaData(from, to).then(() => {
            // this.setKeyword();

            this.showedIds = this.originIds;

            this.addArticles();
        });
    }

    // when click "read more" button
    @action addArticles = () => {
        if (this.articles.length === this.showedIds.length) {
            this.isLoading = false;

            return;
        }
        this.isLoading = true;

        const currentIdx = this.articles.length;
        let ids = [];

        for (let i = currentIdx; i < currentIdx + ARTICLE_NUM; i++) {
            if (this.showedIds[i]) {
                ids.push(this.showedIds[i]);
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
    @action getArticlesByKeyword = ({ text, from, to }) => {
        if (from === undefined || to === undefined) {
            from = this.from;
            to = this.to;
        }

        if (text === '' || !text) {

            this.getIdsBynoKeyword(from, to).then((ids) => {
                this.showedIds = ids;

                this.articles = [];

                this.addArticles();
            });
            // this.getArticles();
            // return;
        }

        this.getIdsByKeyword(text, from, to).then((ids) => {
            this.showedIds = ids;

            this.articles = [];

            this.addArticles();
        });
    }

    // getting article title/content
    // for showing modal
    @action getArticleContent = (id) => {
        this.getArticleById(id).then((articleContent) => {
            this.modalContents = {
                title: articleContent.TITLE,
                contents: articleContent.CONTENTS,
                src: articleContent.SRC,
                date: articleContent.DATE
            };

            this.isShowingModal = true;
        });
    }
}