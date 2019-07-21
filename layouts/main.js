import {Layout, Card, Menu} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

export default ({children}) => (
    <div>
        <Layout>
            {/*<Sider></Sider>*/}
            <Layout>
                <Header><Menu
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1"><a href={"/recipes"}>recipes</a></Menu.Item>
                    <Menu.Item key="2"><a href={"/about"}>about</a></Menu.Item>
                </Menu></Header>
                <Content>
                    <Card style={{minHeight: '100vh'}}>{children}</Card>
                </Content>
                <Footer>© 2019</Footer>
            </Layout>
        </Layout>
    </div>
)