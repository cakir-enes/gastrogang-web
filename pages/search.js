import Page from '../layouts/main'
import CollectionsPage from '../components/AddRecipe'
import Link from 'next/link';
import axios from 'axios/index';
import {Row, Col, Card, Input} from 'antd/lib/index';

const {Search} = Input;
import Router, {useRouter} from 'next/router'

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
            recipes: props.recipes
        }
        this.searchByTag = this.searchByTag.bind(this)
    }

    static async getInitialProps({query}) {
        let queryTag = query.tag
        const res = await axios.get('https://gastrogang.herokuapp.com/api/v1/search/?tag='.concat(queryTag), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjM3fQ.RMUTr_05T_MGJqaHf8fu3i_5b_BDbYUoldDjW1m66Go',
                // 'Authorization': 'Bearer ' + Cookies.get('token')
            },
        })
        let data = JSON.parse(JSON.stringify(res.data))
        // console.log(data)
        if (data == null) {
            data = [{
                name: "example_recipe",
                details: "no recipe has been found, so this recipe created as an example, please use 'add recipe' button",
                steps: [""],
                ingredients: [""],
                tags: [""]
            }]
        }
        return {
            tag: queryTag,
            recipes: data.map(function (item) {
                    return item;
                }
            )
        }
    }

    render() {
        return (
            <div>
                <Page>
                    <h1>Search Results</h1>
                    <Row type="flex" justify="end">
                        <Col>
                            <Search
                                placeholder="input search text"
                                onSearch={value => this.searchByTag(value)}
                                style={{width: 200, marginRight: 8}}
                            />
                            <br/>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.recipes.map(recipe => (
                            <Col style={{marginBottom: 10}}>
                                <Card size="small" title={recipe.name}
                                      extra={<Link href='/recipe/[id]' as={'/recipe/'.concat(recipe.ID)}>
                                          <a>Go to Recipe</a>
                                      </Link>}>
                                    <Card type="inner" size="small" title="Details">{recipe.details}</Card>
                                    <Card type="inner" size="small" title="Steps">{recipe.steps.map(step => (
                                        <Card size="small">{step}</Card>
                                    ))}</Card>
                                    <Card type="inner" size="small"
                                          title="Ingredients">{recipe.ingredients.map(ingredient => (
                                        <Card size="small">{ingredient}</Card>
                                    ))}</Card>
                                    <Card type="inner" size="small" title="Tags">{recipe.tags.map(tag => (
                                        <Card size="small">{tag}</Card>
                                    ))}</Card>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Page>
            </div>
        )
    }

    async searchByTag(value) {
        Router.push({
            pathname: '/search',
            query: {tag: value},
        })
    }

}

export default SearchPage