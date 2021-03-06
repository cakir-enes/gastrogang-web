import Page from '../../layouts/main'
import axios from 'axios/index';
import Router, {useRouter} from 'next/router'
import Link from "next/link";
import {Card, notification, Typography, Button, Icon, Modal, Switch} from "antd";

const {Paragraph} = Typography

class RecipeForm extends React.Component {
    state = {visible: false};

    constructor(props) {
        super(props);
        this.state = {
            name: props.recipe.name,
            details: props.recipe.details,
            steps: props.recipe.steps,
            ingredients: props.recipe.ingredients,
            tags: props.recipe.tags,
            id: props.recipe.ID,
            isPublic: props.recipe.ispublic,

        }
        this.onChangeDetails = this.onChangeDetails.bind(this)
        this.onChangeStep = this.onChangeStep.bind(this)
        this.onChangeIngredient = this.onChangeIngredient.bind(this)
        this.onChangeTag = this.onChangeTag.bind(this)
        // this.onChange = this.onChange.bind(this)
        // this.updateRecipe = this.updateRecipe.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
    }

    static async getInitialProps({query}) {
        let id = query.recipe
        const res = await axios.get('https://gastrogang.herokuapp.com/api/v1/recipes/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjM3fQ.RMUTr_05T_MGJqaHf8fu3i_5b_BDbYUoldDjW1m66Go',
                // 'Authorization': 'Bearer ' + Cookies.get('token')
            },
        })
        const data = JSON.parse(JSON.stringify(res.data))
        console.log(data)
        return {recipe: data}
    };

    onChange = () => {
        const {id} = this.state
        axios.post('https://gastrogang.herokuapp.com/api/v1/recipes/' + id + '/toggle-publicity', {}, {
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
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <div>
                <Page>
                    <Card size="small" title={this.state.name}
                          extra={<div>Public: <Switch defaultChecked={this.state.isPublic} style={{marginRight: 5}}
                                                      onChange={this.onChange}/><Button style={{marginRight: 5}}
                                                                                        onClick={this.showModal}>Share</Button><Modal
                              title="Recipe Sharing"
                              visible={this.state.visible}
                              footer={null}
                          >
                              <Link href={"/recipe/shared/" + this.state.id}>
                                  <a>go to shared link</a>
                              </Link>
                          </Modal><Button onClick={this.deleteRecipe}><Icon type="delete"/></Button></div>}>
                        <Card type="inner" size="small" title="Details"><Paragraph
                            editable={{onChange: this.onChangeDetails}}>{this.state.details}</Paragraph></Card>
                        <Card type="inner" size="small" title="Steps">{this.state.steps.map(step => (
                            <Card size="small"><Paragraph
                                editable={{onChange: this.onChangeStep}}>{step}</Paragraph></Card>
                        ))}</Card>
                        <Card type="inner" size="small"
                              title="Ingredients">{this.state.ingredients.map(ingredient => (
                            <Card size="small"><Paragraph
                                editable={{onChange: this.onChangeIngredient}}>{ingredient}</Paragraph></Card>
                        ))}</Card>
                        <Card type="inner" size="small"
                              title="Tags">{this.state.tags.map(tag => (
                            <Card size="small"><Paragraph
                                editable={{onChange: this.onChangeTag}}>{tag}</Paragraph></Card>
                        ))}</Card>
                    </Card>
                </Page>
            </div>
        )
            ;
    }

    componentDidMount() {
        console.log(this.props)
    }

    async onChangeDetails(str) {
        console.log('Content change:', str);
        await this.setState({details: str});
        this.updateRecipe()
    };

    async onChangeStep(str) {
        console.log('Content change:', str);
        await this.setState({steps: [str]});
        this.updateRecipe()
    };

    async onChangeIngredient(str) {
        console.log('Content change:', str);
        await this.setState({ingredients: [str]})
        this.updateRecipe()
    };

    async onChangeTag(str) {
        console.log('Content change:', str);
        await this.setState({tags: [str]})
        this.updateRecipe()
    };

    updateRecipe() {
        const {details, steps, ingredients, tags, id} = this.state
        console.log(this.state)
        axios.put('https://gastrogang.herokuapp.com/api/v1/recipes/' + id, {
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
            // Router.push('/recipes');
        }).catch(function (error) {
            notification.warning({
                message: error.response.status,
                description: error.response.data.message,
            })
            console.log(error.response)
        })

    }

    async deleteRecipe() {
        const {id} = this.state
        axios.delete('https://gastrogang.herokuapp.com/api/v1/recipes/' + id, {
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
        })
    }
}

export default RecipeForm