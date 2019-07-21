import {Button, Modal, Form, Input, notification} from 'antd';
import axios from 'axios';
import Cookies from "js-cookie";
import Router from "next/router";

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new recipe"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input a recipe name!',
                                    }
                                ],
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item label="Details">
                            {getFieldDecorator('details', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input recipe details!',
                                    }
                                ],
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item label="Steps">
                            {getFieldDecorator('steps', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input recipe steps!',
                                    }
                                ],
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item label="Ingredients">
                            {getFieldDecorator('ingredients', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input recipe ingredients!',
                                    }
                                ],
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item label="Tags">
                            {getFieldDecorator('tags', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input recipe tags!',
                                    }
                                ],
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                const {name, details, steps, ingredients, tags} = values
                axios.post('https://gastrogang.herokuapp.com/api/v1/recipes', {
                        "name": name,
                        "details": details,
                        "steps": [steps],
                        "ingredients": [ingredients],
                        "tags": [tags],
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjN9.8MdXgqXN4F7JbG7Ht3bUiJhmHHGhRrlobH4Ei6Ha4WM',
                            // 'Authorization': 'Bearer ' + Cookies.get('token')
                        }
                    },
                ).then(function (response) {
                    notification.success({
                        message: response.status,
                        description: response.statusText,
                    })
                    Router.push('/recipes');
                }).catch(function (error) {
                    notification.warning({
                        message: error.response.status,
                        description: error.response.data.message,
                    })
                    console.log(error.response)
                })
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Add recipe
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage