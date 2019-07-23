import Page from '../../../layouts/main'
import axios from 'axios/index';
import Router, {useRouter} from 'next/router'
import Link from "next/link";
import {Card, notification, Typography, Button, Icon} from "antd";

const {Paragraph} = Typography

class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.recipe.name,
            details: props.recipe.details,
            steps: props.recipe.steps,
            ingredients: props.recipe.ingredients,
            tags: props.recipe.tags,
            id: props.recipe.ID,
            likeCount: props.recipe.like.count,
        }
        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
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

    render() {
        return (
            <div>
                <Page>
                    <Card size="small" title={this.state.name} extra={<div><Button onClick={this.like}><Icon type="like"/>{" "+this.state.likeCount}</Button><Button onClick={this.dislike}><Icon type="dislike"/></Button></div>}>
                        <Card type="inner" size="small" title="Details"><Paragraph
                            // editable={{onChange: this.onChangeDetails}}
                            >{this.state.details}</Paragraph></Card>
                        <Card type="inner" size="small" title="Steps">{this.state.steps.map(step => (
                            <Card size="small"><Paragraph
                                // editable={{onChange: this.onChangeStep}}
                                >{step}</Paragraph></Card>
                        ))}</Card>
                        <Card type="inner" size="small"
                              title="Ingredients">{this.state.ingredients.map(ingredient => (
                            <Card size="small"><Paragraph
                                // editable={{onChange: this.onChangeIngredient}}
                                >{ingredient}</Paragraph></Card>
                        ))}</Card>
                        <Card type="inner" size="small"
                              title="Tags">{this.state.tags.map(tag => (
                            <Card size="small"><Paragraph
                                // editable={{onChange: this.onChangeTag}}
                                >{tag}</Paragraph></Card>
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
    async like(){
        const { id } = this.state
        console.log(id)
        axios.post('https://gastrogang.herokuapp.com/api/v1/recipes/'+id+'/like', {},{
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
        }).catch(function (error) {
            notification.warning({
                message: error.response.status,
                description: error.response.data.message,
            })
            console.log(error.response)
        })
        window.location.reload();
    }
    async dislike(){
        const { id } = this.state
        console.log(id)
        axios.post('https://gastrogang.herokuapp.com/api/v1/recipes/'+id+'/dislike', {},{
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
        }).catch(function (error) {
            notification.warning({
                message: error.response.status,
                description: error.response.data.message,
            })
            console.log(error.response)
        })
        window.location.reload();
    }
}

export default RecipeForm