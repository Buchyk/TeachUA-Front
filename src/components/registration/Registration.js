import React, {useState} from 'react';
import {Button, Form, message, Modal, Switch} from 'antd';
import './сss/Registration.less';
import RegistrationRoles from "./RegistrationRoles";
import RegistrationSocial from "./RegistrationSocial";
import RegistrationInput from "./RegistrationInput";
import {registerUser} from "../../service/UserService";


const Registration = () => {
    const [visible, setVisible] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const onFinish = (values) => {
        registerUser(values).then((response) => {
            if(response.status) {
                message.error(response.message);
            }
            else {
                message.success("Ви успішно зареєструвались!");
                setVisible(false);
            }
        });
    };


    return (
        <>
            <span type="text" onClick={() => setVisible(true)}>
                Зареєструватися
            </span>
            <Modal
                className="modal-registration"
                centered
                width={520}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="registration-header">
                    Реєстрація
                </div>
                <div className="registration-content">
                    <Form
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <RegistrationRoles setDisabledButton={setDisabledButton}
                                           disabledButton={disabledButton}/>
                        <RegistrationSocial/>
                        <RegistrationInput disabledButton={disabledButton}/>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default Registration;
