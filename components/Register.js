import { Form, Input, Button, Icon } from 'antd';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('http://localhost:8080/api/v1/register', {
                    data: [{
                        "username": values.username,
                        "password": values.password
                    }], headers: {
                        "Content-Type": "application/json",
                    }
                }).then(console.log)
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
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: false}],
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
                        },{
                            min: 6, message: 'Minimum password length must be 6!',
                        }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
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
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
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