import React, {useState} from "react";
import {Button, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";


const UserEditModal = () => {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="text button" onClick={() => setVisible(true)}>
                Редагувати профіль
                <ArrowRightOutlined />
            </Button>
            <Modal
                centered
                width={520}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >

            </Modal>
        </>
    );
};

export default UserEditModal;
