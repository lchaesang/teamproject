import React from 'react';
import { observer, inject } from 'mobx-react';


@inject('article')
@observer
class Header extends React.Component {
    render() {
        return (
            <p>
                < nav class="navbar navbar-expand-lg navbar-dark bg-dark fiexd-top" >
                    <div class="container">
                        <a href="#" class="navbar-brand">
                            <h1 className="text-center">키워드 기반 뉴스 요약</h1>
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>

                    </div>
                </nav >
            </p>
        )
    }

}


export default Header;