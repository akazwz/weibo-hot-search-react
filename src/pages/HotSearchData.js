import React, {useEffect, useReducer, useState} from 'react';
import {message, Input, Divider, Col, Row,} from 'antd';
import {ClearOutlined} from '@ant-design/icons';
import HotSearchRank from '../components/HotSearchRank';
import HotSearchHot from '../components/HotSearchHot';
import {GetHotSearchesByContent} from "../api/hot-search";
import {useParams} from "react-router-dom";

const HotSearchData = () => {
    const start = "";
    const stop = "";
    const [showChart, setShowChart] = useState(false);
    let {content} = useParams();
    const defaultDataset = [['time', 'rank', 'hot']];

    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [searchValue, setSearchValue] = useState('');
    const [topicLead, setTopicLead] = useState('');
    const [searchPlaceHolder, setSearchPlaceHolder] = useState('');

    useEffect(() => {
        if (!content) {
            setSearchPlaceHolder("赵文卓不动热狗不敢动");
        } else {
            setSearchValue(content);
            getHotSearches(content, start, stop);
        }
    }, []);

    const getHotSearches = (cont, start, stop) => {
        GetHotSearchesByContent(cont, start, stop)
            .then((res) => {
                if (res.status !== 200) {
                    message.error("获取数据失败").then(r => {
                        console.log(r);
                    });
                }
                const {code, data, msg} = res.data
                if (code !== 2000) {
                    message.error(msg).then(r => {
                        console.log(r);
                    });
                }
                const {searches} = data[0];
                const {topic_lead, link} = searches[0];
                setTopicLead(topic_lead);
                for (let i = 0; i < data.length; i++) {
                    const hotSearch = data[i];
                    const {time, searches} = hotSearch;
                    const singleSearch = searches[0];
                    const {rank, hot} = singleSearch;
                    defaultDataset.push(
                        [time, rank, hot]
                    );
                }
                setHotSearchesDataset(defaultDataset);
                setShowChart(true);
            }).catch((err) => {
            message.error("获取数据失败").then(r => {
                console.log(r);
            });
            console.log(err);
        });
    }

    const handleSearchOnInput = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const {Search} = Input;
    const onSearch = (value, event) => {
        console.log(event);
        if (searchValue === "") {
            setSearchValue(searchPlaceHolder);
            getHotSearches(searchPlaceHolder, start, stop);
        } else {
            getHotSearches(value, start, stop);
        }
    };
    return (
        <div>
            <Divider/>
            <Row gutter={16} className="search-input-box">
                <Col className="gutter-row" span={24}>
                    <Search
                        placeholder={"大家都在搜：" + searchPlaceHolder}
                        enterButton
                        suffix={searchValue !== '' ? <ClearOutlined onClick={() => {
                            setSearchValue('');
                        }}/> : null}
                        size="large"
                        onSearch={onSearch}
                        className="search-input"
                        value={searchValue}
                        onInput={handleSearchOnInput}
                    />
                </Col>
            </Row>
            {topicLead !== '' ? <Divider/> : null}
            {topicLead !== '' ? <div>{topicLead}</div> : null}
            {topicLead !== '' ? <Divider/> : null}
            {showChart ? <HotSearchRank source={hotSearchesDataset}/> : null}
            {showChart ? <HotSearchHot source={hotSearchesDataset}/> : null}
        </div>
    );
};

export default HotSearchData;
