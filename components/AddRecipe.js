import {Button, Modal, Form, Input, notification, Icon} from 'antd';
import axios from 'axios';
import Cookies from "js-cookie";
import Router from "next/router";

let idSteps = 0;
let idIngredients = 0;
let idTags = 0;

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    class extends React.Component {
        //bas
        removeStep = k => {
            const {form} = this.props;
            const keysSteps = form.getFieldValue('keysSteps');
            if (keysSteps.length === 1) {
                return;
            }
            form.setFieldsValue({
                keysSteps: keysSteps.filter(key => key !== k),
            });
        };

        addStep = () => {
            const {form} = this.props;
            const keysSteps = form.getFieldValue('keysSteps');
            const nextKeysSteps = keysSteps.concat(idSteps++);
            form.setFieldsValue({
                keysSteps: nextKeysSteps,
            });
        };

        removeIngredient = k => {
            const {form} = this.props;
            const keysIngredients = form.getFieldValue('keysIngredients');
            if (keysIngredients.length === 1) {
                return;
            }
            form.setFieldsValue({
                keysIngredients: keysIngredients.filter(key => key !== k),
            });
        };

        addIngredient = () => {
            const {form} = this.props;
            const keysIngredients = form.getFieldValue('keysIngredients');
            const nextKeysIngredients = keysIngredients.concat(idIngredients++);
            form.setFieldsValue({
                keysIngredients: nextKeysIngredients,
            });
        };

        removeTag = k => {
            const {form} = this.props;
            const keysTags = form.getFieldValue('keysTags');
            if (keysTags.length === 1) {
                return;
            }
            form.setFieldsValue({
                keysTags: keysTags.filter(key => key !== k),
            });
        };

        addTag = () => {
            const {form} = this.props;
            const keysTags = form.getFieldValue('keysTags');
            const nextKeysTags = keysTags.concat(idTags++);
            form.setFieldsValue({
                keysTags: nextKeysTags,
            });
        };

        //son
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator, getFieldValue} = form;
            //bas
            getFieldDecorator('keysSteps', {initialValue: []});
            getFieldDecorator('keysIngredients', {initialValue: []});
            getFieldDecorator('keysTags', {initialValue: []});
            const keysSteps = getFieldValue('keysSteps');
            const keysIngredients = getFieldValue('keysIngredients');
            const keysTags = getFieldValue('keysTags');
            const formSteps = keysSteps.map((k, index) => (
                <Form.Item
                    label={index === 0 ? 'Steps' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`steps[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input a step or delete this field.",
                            },
                        ],
                    })(<Input type="textarea" style={{width: '90%', marginRight: 8}}/>)}
                    {keysSteps.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removeStep(k)}
                        />
                    ) : null}
                </Form.Item>
            ));
            const formIngredients = keysIngredients.map((k, index) => (
                <Form.Item
                    label={index === 0 ? 'Ingredients' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`ingredients[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input a ingredient or delete this field.",
                            },
                        ],
                    })(<Input type="textarea" style={{width: '90%', marginRight: 8}}/>)}
                    {keysIngredients.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removeIngredient(k)}
                        />
                    ) : null}
                </Form.Item>
            ));
            const formTags = keysTags.map((k, index) => (
                <Form.Item
                    label={index === 0 ? 'Tags' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`tags[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input a tag or delete this field.",
                            },
                        ],
                    })(<Input type="textarea" style={{width: '90%', marginRight: 8}}/>)}
                    {keysTags.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removeTag(k)}
                        />
                    ) : null}
                </Form.Item>
            ));
            //son
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
                        {/*    bas*/}
                        {formSteps}
                        {formIngredients}
                        {formTags}
                        <Form.Item>
                            <Button type="dashed" onClick={this.addStep} style={{width: '33%'}}>
                                <Icon type="plus"/> Add Step
                            </Button>
                            <Button type="dashed" onClick={this.addIngredient} style={{width: '33%'}}>
                                <Icon type="plus"/> Add Ingredient
                            </Button>
                            <Button type="dashed" onClick={this.addTag} style={{width: '33%'}}>
                                <Icon type="plus"/> Add Tag
                            </Button>
                        </Form.Item>
                        {/*    son*/}
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
                        "steps": steps,
                        "ingredients": ingredients,
                        "tags": tags,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjM3fQ.RMUTr_05T_MGJqaHf8fu3i_5b_BDbYUoldDjW1m66Go',
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