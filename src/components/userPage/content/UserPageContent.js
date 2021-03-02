import React, {useContext, useState} from "react";
import {Content} from "antd/es/layout/layout";
import './css/UserContent.less';
import UserInformationComponent from "./UserInformationComponent";
import {Button, Dropdown, Layout} from "antd";
import menu from "./AddMenu";
import {PlusOutlined} from "@ant-design/icons";
import UserCenterContent from "./UserCenterContent";
import UserClubContent from "./UserClubContent";


const UserPageContent = () => {

    return (
        <Content className="user-content">
            <div className="content-title">Мій профіль</div>
            <UserInformationComponent/>
         <div>
            <div className="club-title">Мої гуртки
                <div className="add-club-dropdown">
                <Dropdown сlassname overlay={menu} placement="bottomRight">
                    <Button classname="add-button">
                        <PlusOutlined />
                        Додати</Button>
                </Dropdown>
                </div>
            </div>
                <UserCenterContent/>
  <UserClubContent/>
            </div>
        </Content>
    )
};

export default UserPageContent;
