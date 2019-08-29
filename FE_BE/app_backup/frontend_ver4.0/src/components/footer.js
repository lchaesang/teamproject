import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('article')
@observer
class Footer extends React.Component {
    render() {
        return (
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Kepco 데이터사이언스연구소</p>
                </div>
            </footer>
        )
    }

}


export default Footer;