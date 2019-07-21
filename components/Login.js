import { Form, Icon, Input, Button, notification } from 'antd';
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { name, password } = values
                axios.post('https://gastrogang.herokuapp.com/api/v1/login', {
                    "name": name,
                    "password": password,
                }).then(function (response) {
                    notification.success({
                        message: response.status,
                        description: response.statusText,
                    })
                    Cookies.set('token', JSON.parse(response.request.response)['token']);
                    Cookies.set('name', JSON.parse(response.request.response)['name']);
                    Cookies.set('id', JSON.parse(response.request.response)['ID']);
                    Router.push('/recipes');
                }).catch(function (error) {
                    notification.warning({
                        message: error.response.status,
                        description: error.response.data.message,
                    })
                    console.log(error.response)
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm