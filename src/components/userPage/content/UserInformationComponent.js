import React from "react";
import './css/UserContent.less';
import {Avatar} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import UserEditModal from "../useredit/UserEditModal";


const UserInformationComponent = () => {
    return (
        <div className="user-profile">
            <div className="user-info">
                <Avatar size={68} icon={<UserOutlined />} />
                <div>
                <div className="user-name"> Ім'я Прізвище
                </div>
                <div className="user-role"> Роль </div>
            </div>
                <div className="edit-button">
                  <UserEditModal/>
            </div>
            </div>
            <div className="user-contacts">
                <div className="user-phone">
                    Телефон
                    <div className="user-phone-data">
                        +38 (067) 000 00 00
                    </div>
                </div>
                <div className="user-email">
                    Email
                    <div className="user-email-data">
                        test@gmail.com
                    </div>
            </div>
            </div>
        </div>
    )
};


export default UserInformationComponent;
