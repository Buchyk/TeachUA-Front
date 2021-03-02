import React from "react";
import Layout, {Content} from "antd/es/layout/layout";
import {withRouter} from "react-router";
import SiderComponent from "./sider/UserSider";
import UserPageContent from "./content/UserPageContent";
import Sider from "antd/es/layout/Sider";
import '../userPage/css/User.less'


class UserPage extends React.Component {


    render() {
        return (
            <Layout className ="user-page">
                <Sider><SiderComponent/></Sider>
                <Content><UserPageContent/></Content>
            </Layout>
    )
    }
}


export default withRouter(UserPage);