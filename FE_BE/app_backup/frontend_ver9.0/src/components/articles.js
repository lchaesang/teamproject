import React from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Spinner/*, Button*/ } from 'react-bootstrap';

@inject('article')
@observer
class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowModal: false,
            modalTitle: '',
            modalContents: '',
        }
    }

    render() {
        const { articles, showedIds, isShowingModal, modalContents, isLoading } = this.props.article;
        const forKeyword = [1, 2, 3, 4, 5];

        return (
            <div>
                {articles.map((article) => {
                    return (
                        <div className="card mb-4" key={article.SEQ}>
                            <div className="card-body">
                                <h3 className="card-title">{article.TITLE}</h3>
                                <p className="textright" >{article.SRC} | {article.DATE}</p>

                                <p className="card-text">{article.SUMMARY}</p>
                                <button className="btn btn-primary" onClick={this.showArticleContent.bind(this, article.SEQ)}>원문 보기 &rarr;</button>



                            </div>

                            <div className="card-footer text-muted">
                                {forKeyword
                                    .filter((ind) => {
                                        return article[`KEYWORD${ind}`];
                                    })
                                    .map((ind) => {
                                        return <span key={ind} className="ml-1 mr-1">{article[`KEYWORD${ind}`]}</span>
                                    })
                                }
                            </div>
                        </div>
                    );
                })}


                <Modal show={isShowingModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContents.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalContents.contents}</Modal.Body>
                    <Modal.Footer>
                        {modalContents.src}&nbsp;&nbsp; |&nbsp;&nbsp;
                         {modalContents.date}
                    </Modal.Footer>
                </Modal>
                <style>{`
                    .textright{
                        text-align: right !important;
                    }
                    `}</style>

                {isLoading ? (<div className="text-center"><Spinner animation="grow" /></div>) : ''}

                <div className="text-center mb-4">
                    <button className="btn btn-primary" onClick={this.addArticles.bind(this)} disabled={articles.length === showedIds.length}>Load More</button>
                </div>


            </div>
        );
    }

    componentDidMount() {
        const { article } = this.props;
        article.getArticles();
    }

    showArticleContent(id) {
        const { article } = this.props;

        article.getArticleContent(id);
    }

    closeModal() {
        const { article } = this.props;

        article.isShowingModal = false;
        article.modalContents = {
            title: '',
            contents: '',
            src: '',
            date: ''
        }
    }

    addArticles() {
        const { article } = this.props;

        article.addArticles();
    }
}

export default Articles;