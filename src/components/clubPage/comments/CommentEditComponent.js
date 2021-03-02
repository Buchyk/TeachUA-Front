import React from "react";

import {Button, Form, Input, Modal, Rate, Tabs, Tooltip} from "antd";
import  './css/CommentEditComponent.less';
import TextArea from "antd/lib/input/TextArea";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";

import {createFeedback} from "../../../service/FeedbackService";
import {getUserById} from "../../../service/UserService";

const {TabPane} = Tabs;

class CommentEditComponent extends React.Component {
    state = {
        user: { },
        isComplaint: false,
        rate: undefined,
        commentText: "",
        tooltipVisible: false,
    };

    getUser(){
        // TODO: get real current user
        return getUserById(1); // hardcoded user id
    }

    getData = () => {

       this.getUser().then((user)=>{
           user.phone = "+380 (063) 000 00 00" // hardcoded user phone
           this.setState({user: user});
        })
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(){
        if(this.state.user.id == undefined && this.props.visible) {
            this.getData();
            console.log("empty")
        }
    };

    closeEditComponent(){
        this.props.setVisible(false)
        this.setState({user: {}, commentText: undefined, rate: undefined});
        this.form.resetFields();
    }

    onFinish(values) {
        createFeedback(
            this.state.commentText,
            this.state.rate,
            this.state.isComplaint,
            this.state.user.id,
            this.props.club.id).then((feedback) => {
                this.closeEditComponent();
                this.props.onFeedbackAdded(feedback);
        });

    };

    hasNoDataEntered(){
        const hasNoRate = (this.state.rate == undefined || this.state.rate === 0) && !this.state.isComplaint;
        const hasNoCommentText = this.state.commentText == undefined || this.state.commentText === "";
        return hasNoRate || hasNoCommentText;
    }


    render() {
        return (
            <div className="comment-edit">
                <Modal
                    visible={this.props.visible}
                    centered
                    onOk={() => this.closeEditComponent()}
                    onCancel={() => this.closeEditComponent() }
                    width={521}
                    footer={null}
                >

                    <span className="comment-edit-title">Залишити коментар</span>

                    <span className="comment-type-tabs">
                        <Tabs
                            defaultActiveKey="1"
                            onChange={(active) => this.setState({isComplaint: active == 2})}
                        >
                            <TabPane tab="Коментар" key="1"></TabPane>
                            <TabPane tab="Скарга" key="2">
                                <div className="complaint-note">
                                    Скарга не відображається у коментарях і одразу потрапляє до відповідальної особи.
                                </div>
                            </TabPane>
                        </Tabs>
                    </span>

                    <Form
                        form={this.form}
                        name="comment-edit"
                        onFinish={(v)=>this.onFinish()}
                        ref={form => this.form = form}
                        onValuesChange={(changed, all) => this.setState(all)}

                    >
                        <div className="club-title-note">
                            {this.props.club.name}
                        </div>
                        <div className="comment-fields">
                            <Form.Item
                                label="Телефон"
                                labelAlign={"right"}
                                style={{marginBottom: 16}}>
                                <Input
                                    className="comment-input-box"
                                    suffix={<PhoneOutlined className="phone-icon"/>}
                                    value = { this.state.user.phone }
                                    readOnly={true}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    suffix={<MailOutlined classname="mail-icon"/>}
                                    value = {this.state.user.email}
                                    readOnly={true}

                                />
                            </Form.Item>

                            <Form.Item
                                style={ this.state.isComplaint? { display: 'none' }: {}}
                                label="Оцінка"
                                name="rate">
                                <Rate className="edit-field-input" />
                            </Form.Item>


                            <Form.Item
                                label="Опис"
                                name="commentText"
                                value="Dsd">
                                <TextArea autoSize={{minRows: 5, maxRows: 5}} placeholder="Додайте опис"/>
                            </Form.Item>
                        </div>

                        <Tooltip placement="top"
                                 className="comment-tooltip"
                                 onVisibleChange={(v)=>
                                     this.setState({
                                         tooltipVisible: this.hasNoDataEntered() && v
                                     })
                                 }

                                 visible={this.state.tooltipVisible}
                                 title={(this.state.rate == undefined || this.state.rate === 0) && !this.state.isComplaint? "поставте оцінку": "напишіть опис"}
                        >
                            <Form.Item>
                                <Button
                                    disabled={this.hasNoDataEntered()}
                                    className="do-comment-button"
                                    type="primary"
                                    htmlType="submit"
                                >Надіслати</Button>
                            </Form.Item>
                        </Tooltip>

                    </Form>

                </Modal>
            </div>
        )
    }
}

export default CommentEditComponent;