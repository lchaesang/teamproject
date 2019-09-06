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
    @observable isGlobalLoading = true;
    @observable default_from = undefined;
    @observable default_to = undefined;
    @observable searchkeywords = '';
    @observable srclist = [];
    @observable srclistarray = [];


    // getting original metadata(all id list and keyword data)
    async getMetaData(from, to) {
        if (this.default_from === undefined || this.default_to === undefined) {
            var momnet = require('moment');
            this.default_from = momnet().subtract(1, 'w').format("YYYY-MM-DD")
            this.default_to = momnet().format("YYYY-MM-DD");
        }

        if (from === undefined || to === undefined) {
            from = this.default_from;
            to = this.default_to;
        }

        try {
            this.isGlobalLoading = true;
            let response = await axios.get(`${url}/metaData`, {
                params: { from, to }
            });


            let response_srclist = await axios.get(`${url}/getsrclist`
            );

            this.originIds = response.data.ids;
            this.keywords = response.data.keywords;
            this.srclist = response_srclist.data.srclist;
            this.srclistarray = response_srclist.data.srclist;
            this.isGlobalLoading = false;

        } catch (error) {
            console.log('error: ', error);
        }
    }

    // getting id list which searched by keyword(or search text)
    async getIdsByKeyword(keyword, from, to, option, srclist) {

        this.searchkeywords = keyword;
        try {
            this.isGlobalLoading = true;
            if (option === 'option2') { // radio buttion is All
                //search
                let response = await axios.get(`${url}/articlesBySearchAll`, {
                    params: { keyword, from, to, srclist }
                });
                //keyword cloud
                let response_cloud = await axios.get(`${url}/getkeyword`, {
                    params: { keyword, from, to, srclist }
                });

                this.keywords = response_cloud.data.keywords;
                this.isGlobalLoading = false;
                return response.data.ids;
            }
            else {// radio buttion is Keyword
                //search
                let response = await axios.get(`${url}/articlesBySearchKeyword`, {
                    params: { keyword, from, to, srclist }
                });
                //keyword cloud
                let response_cloud = await axios.get(`${url}/getkeyword`, {
                    params: { keyword, from, to, srclist }
                });

                this.keywords = response_cloud.data.keywords;
                this.isGlobalLoading = false;
                return response.data.ids;
            }


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
        const from = this.default_from;
        const to = this.default_to;

        this.getMetaData(from, to).then(() => {
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
    @action getArticlesByKeyword = ({ text, from, to, option, srclist }) => {

        if (srclist === undefined) {
            srclist = this.srclistarray;
            console.log('here cloud: ' + this.srclistarray);
        }
        if (srclist.length < 1) {
            this.srclistarray = this.srclist;
            srclist = this.srclistarray;
            console.log('here : ' + this.srclistarray);
        } else {
            this.srclistarray = srclist;
            console.log('here2 : ' + this.srclistarray);
        }

        if (from === undefined && to === undefined) {
            from = this.default_from;
            to = this.default_to;
        } else {

            if (from === undefined && to !== undefined) {
                from = this.default_from;
            } else if (from !== undefined && to === undefined) {
                to = this.default_to;
            }
        }

        this.getIdsByKeyword(text, from, to, option, srclist).then((ids) => {
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