import React from 'react';
import {Col, Row} from 'antd';
import {Link} from 'react-router-dom';

const MyFooter = () => {
    return (
        <div className="header-link">
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <a href="https://github.com/akazwz">AKAZWZ</a>
                </Col>
                <Col className="gutter-row" span={12}>
                    <a href="https://github.com/akazwz/weibo-hot-search">Weibo Hot Search</a>
                </Col>

            </Row>
        </div>
    );
};

export default MyFooter;
