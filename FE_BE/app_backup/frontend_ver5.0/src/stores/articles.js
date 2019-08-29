import { observable, action } from 'mobx';
import axios from 'axios';

const ARTICLE_NUM = 3;
const url = 'http://localhost:4000';
//const url = 'http://newsbackend.is.hubpop.io';

export default class ArticleStore {
    @observable originIds = [];
    @observable showedIds = [];
    @observable articles = [];
    @observable keywords = [];
    @observable isShowingModal = false;
    @observable modalContents = {
        title: '',
        contents: ''
    };
    @observable isLoading = false;

    // getting original metadata(all id list and keyword data)
    async getMetaData() {
        try {
            let response = await axios.get(`${url}/metaData`);

            this.originIds = response.data.ids;
            this.keywords = response.data.keywords;

        } catch (error) {
            console.log('error: ', error);
        }
    }

    // getting id list which searched by keyword(or search text)
    async getIdsByKeyword(keyword) {
        try {
            let response = await axios.get(`${url}/articlesByKeyword`, {
                params: { keyword }
            });

            this.showedIds = response.data.ids;
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

        this.getMetaData().then(() => {
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
    @action getArticlesByKeyword = ({ text }) => {
        if (text === '' || !text) {
            this.getArticles();

            return;
        }

        this.getIdsByKeyword(text);

        // this.showedMetaData = this.originMetaData.filter((datum) => {
        //     if (
        //         datum.KEYWORD1 === text ||
        //         datum.KEYWORD2 === text ||
        //         datum.KEYWORD3 === text ||
        //         datum.KEYWORD4 === text ||
        //         datum.KEYWORD5 === text
        //     ) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });

        this.articles = [];

        this.addArticles();
    }

    // getting article title/content
    // for showing modal
    @action getArticleContent = (id) => {
        this.getArticleById(id).then((articleContent) => {
            this.modalContents = {
                title: articleContent.TITLE,
                contents: articleContent.CONTENTS
            };

            this.isShowingModal = true;
        });
    }
}