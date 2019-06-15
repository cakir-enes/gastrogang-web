import WrappedNormalLoginForm from './Login'
import WrappedRegistrationForm from './Register'
import { Card } from "antd";

const tabList = [
    {
        key: "login",
        tab: "login"
    },
    {
        key: "register",
        tab: "register"
    }
];

const contentList = {
    login: <WrappedNormalLoginForm/>,
    register: <WrappedRegistrationForm/>,
};

class LoginRegisterTabbedCard extends React.Component {
    state = {
        key: "login"
    };

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div>
                <Card
                    style={{ width: "100%" }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, "key");
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        );
    }
}

export default LoginRegisterTabbedCard