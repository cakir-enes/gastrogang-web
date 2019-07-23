import { Form, Input, Button, Icon, notification } from 'antd';
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie'

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { name, password, lifetime } = values
                axios.post('https://gastrogang.herokuapp.com/api/v1/register', {
                    "name": name,
                    "password": password,
                    "lifetime": parseInt(lifetime),
                }).then(function (response) {
                    notification.success({
                        message: response.status,
                        description: response.statusText,
                    })
                    Cookies.set('token', JSON.parse(response.request.response)['token']);
                    Cookies.set('name', JSON.parse(response.request.response)['name']);
                    Cookies.set('id', JSON.parse(response.request.response)['ID']);
                    Router.push('/recipes');
                })
                    .catch(function (error) {
                        notification.warning({
                            message: error.response.status,
                            description: error.response.data.message,
                        })
                    })
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: false }],
                    })(<Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />)}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }, {
                            min: 6, message: 'Minimum password length must be 6!',
                        }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('lifetime', {
                        rules: [
                            {
                                required: true,
                                message: 'Please enter a lifetime!'
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Lifetime (as day)"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm