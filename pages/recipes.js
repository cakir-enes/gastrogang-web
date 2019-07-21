import Page from '../layouts/main'
import CollectionsPage from '../components/AddRecipe'
import Link from 'next/link';
import axios from 'axios';
import {Row, Col, Card, Input} from 'antd';

const {Search} = Input;
import Router, {useRouter} from 'next/router'

const Recipes = props => (
    <div>
        <Page>
            <h1>Recipes</h1>
            <Row type="flex" justify="end">
                <Col>
                    <Search
                        placeholder="input search text"
                        onSearch={value => searchByTag(value)}
                        style={{width: 200, marginRight: 8}}
                    />
                    <br/>
                </Col>
                <Col>
                    <CollectionsPage/>
                    <br/>
                </Col>
            </Row>
            <Row>
                {props.recipes.map(recipe => (
                    <Col style={{marginBottom: 10}}>
                        <Card size="small" title={recipe.name}
                              extra={<Link href='/recipe/[id]' as={'/recipe/'.concat(recipe.ID)}>
                                  <a>Go to Recipe</a>
                              </Link>}>
                            <Card type="inner" size="small" title="Details">{recipe.details}</Card>
                            <Card type="inner" size="small" title="Steps">{recipe.steps.map(step => (
                                <Card size="small">{step}</Card>
                            ))}</Card>
                            <Card type="inner" size="small" title="Ingredients">{recipe.ingredients.map(ingredient => (
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
);

Recipes.getInitialProps = async function () {
    const ress = await axios.get('https://gastrogang.herokuapp.com/api/v1/recipes', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjN9.8MdXgqXN4F7JbG7Ht3bUiJhmHHGhRrlobH4Ei6Ha4WM',
            // 'Authorization': 'Bearer ' + Cookies.get('token')
        },
    })
    let data = JSON.parse(JSON.stringify(ress.data))
    console.log(data)
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
        recipes: data.map(function (item) {
            return item;
        })
    }
};

async function searchByTag(value){
    Router.push({
        pathname: '/search',
        query: { tag: value },
    })
}

export default Recipes