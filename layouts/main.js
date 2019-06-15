import { Layout, Card } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default ({ children }) => (
    <div>
        <Layout>
            <Sider></Sider>
            <Layout>
                <Header></Header>
                <Content>
                    <Card style={{ height: '100vh' }}>{children}</Card>
                </Content>
                <Footer>© 2019</Footer>
            </Layout>
        </Layout>
    </div>
)

