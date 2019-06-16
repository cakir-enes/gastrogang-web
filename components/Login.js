import axios from 'axios';
import * as React from "react";
import Router from 'next/router';
import {Form, Icon, Input, Button} from 'antd';

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let res = axios.post('https://cors-anywhere.herokuapp.com/https://pacific-journey-89833.herokuapp.com/api/v1/login', {
                    data: [{
                        "username": values.username,
                        "password": values.password
                    }], headers: {
                        "Content-Type": "application/json",
                    }
                }).then(console.log);
                Router.push('/about')
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password" placeholder="Password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default WrappedNormalLoginForm