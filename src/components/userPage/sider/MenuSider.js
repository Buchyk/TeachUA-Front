import React from 'react';
import '../sider/css/Sider.less'
import {MailOutlined, UserOutlined} from "@ant-design/icons";


const MenuSiderComponent = () => {
    return (
        <div className="menu-component">
            <div className="menu-title">Особистий кабінет</div>
            <div className="sider-profile">
                <div className="user-prof">
                <UserOutlined className="icon-user"/>Профіль
                </div>
            <div className="sider-message">
                <MailOutlined className="icon-message"/>Повідомлення
            </div>
            </div>
        </div>

    );
};

export default MenuSiderComponent;
