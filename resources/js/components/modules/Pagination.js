import React, { Component } from 'react';

import {baseUrl} from '../utilities/utilities';

export default class Pagination extends Component {

    render(){
        let {data, loadPage} = this.props;
        return(
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <nav aria-label="...">
                        <ul className="pagination">

                            <li onClick={() => loadPage(data.first_page_url)} className="page-item">
                                <span className="page-link">First Page</span>
                            </li>

                            <li className={data.prev_page_url ? "page-item" : "page-item disabled"} onClick={() => data.prev_page_url ? loadPage(data.prev_page_url) : null}>
                                <span className="page-link" tabindex="-1">{"<<"}</span>
                            </li>

                            {(data.current_page > 3) &&
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            }

                            {(data.current_page > 2) &&
                            <li onClick={() => loadPage(baseUrl()+'/allsms?page='+(data.current_page-2))} className="page-item">
                                <span className="page-link">{data.current_page-2}</span>
                            </li>
                            }

                            {(data.current_page > 1) &&
                            <li onClick={() => loadPage(baseUrl()+'/allsms?page='+(data.current_page-1))} className="page-item">
                                <span className="page-link">{data.current_page-1}</span>
                            </li>
                            }

                            <li onClick={() => loadPage(baseUrl()+'/allsms?page='+data.current_page)} className="page-item active">
                                <span className="page-link">{data.current_page ? data.current_page : 0}</span>
                            </li>

                            {(data.last_page > data.current_page) &&
                            <li onClick={() => loadPage(baseUrl()+'/allsms?page='+(data.current_page+1))} className="page-item">
                                <span className="page-link">{data.current_page+1}</span>
                            </li>
                            }

                            {(data.last_page > data.current_page+1) &&
                            <li onClick={() => loadPage(baseUrl()+'/allsms?page='+(data.current_page+2))} className="page-item">
                                <span className="page-link">{data.current_page+2}</span>
                            </li>
                            }

                            {(data.last_page > data.current_page+2) &&
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                            }

                            <li className={data.next_page_url ? "page-item" : "page-item disabled"} onClick={() => data.next_page_url ? loadPage(data.next_page_url) : null}>
                                <span className="page-link">{">>"}</span>
                            </li>

                            <li onClick={() => loadPage(data.last_page_url)} className="page-item">
                                <span className="page-link">Last Page</span>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}