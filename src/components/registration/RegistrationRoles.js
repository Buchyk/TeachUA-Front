import React from 'react';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {Form} from "antd";
import Radio from "antd/es/radio/radio";

const RegistrationRoles = ({setDisabledButton}) => {
    return (
        <Form.Item name="role">
            <Radio.Group className="button-container"
                         options={[{
                             label: (
                                 <div className="button-box">
                                     <div className="ellipse"><UserOutlined className="user-icon"/></div>
                                     Відвідувач
                                 </div>),
                             value: 'ROLE_USER'
                         }, {
                             label: (
                                 <div className="button-box">
                                     <div className="ellipse"><UserOutlined className="user-icon"/></div>
                                     Керівник
                                 </div>),
                             value: 'ROLE_ADMIN'
                         }]}
                         onChange={() => setDisabledButton(false)}
                         optionType="button"
                         buttonStyle="solid"
            />
        </Form.Item>
    )
}

export default RegistrationRoles
