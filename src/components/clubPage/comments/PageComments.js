import PropTypes from "prop-types";
import React, { useContext, useState} from 'react';
import './css/PageComments.css';
import {Button, Comment, List, Rate, Tooltip} from "antd";
import {Content} from "antd/es/layout/layout";

import CommentEditComponent from "./CommentEditComponent";

const PageComments = ({feedback, club, feedbackAdded}) => {
   const [commentEditVisible, setCommentEditVisible] = useState(false);

    return (
        <Content className="page-comments">
            <List
                className="comment-list"
                header={
                    <div className="comment-header">
                        <span className="comment-label">Коментарі</span>
                        <Button className="outlined-button comment-button"
                                onClick={() => {setCommentEditVisible(true); console.log(commentEditVisible)}}>
                            Залишити коментар
                        </Button>
                    </div>
                }
                itemLayout="horizontal"
                dataSource={feedback}
                renderItem={item => (
                    <li>
                        <Comment
                            author={
                                <div className="author">
                                    <img className="avatar"
                                         src={'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg'}
                                         alt="avatar"/>
                                    <div className="author-content">
                                        <span className="name">{item.user.name}</span>
                                        <Tooltip title={new Date(item.date).toLocaleString()}>
                                                <span className="datetime">{
                                                    new Date(item.date).toLocaleString('uk', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })
                                                }</span>
                                        </Tooltip>
                                    </div>
                                    <Rate className="rating" disabled allowHalf value={item.rate}/>
                                </div>
                            }
                            content={item.text}
                        />
                    </li>
                )}
            />
            <CommentEditComponent
                visible={commentEditVisible}
                setVisible={setCommentEditVisible}
                club={club}
                onFeedbackAdded={feedbackAdded}/>
        </Content>

    )
};

PageComments.propTypes = {
    feedback: PropTypes.array.isRequired
};


export default PageComments;