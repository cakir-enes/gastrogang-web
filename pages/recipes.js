import Page from '../layouts/main'
import CollectionsPage from '../components/AddRecipe'
import Link from 'next/link';
import axios from 'axios';
import {Row, Col, Card} from 'antd';

const Recipes = props => (
    <div>
        <Page>
            <h1>Recipes</h1>
            <Row type="flex" justify="end">
                <Col>
                    <CollectionsPage/>
                    <br/>
                </Col>
            </Row>
            <Row>
                {props.recipes.map(recipe => (
                    <Col style={{marginBottom: 10}}>
                        <Card size="small" title={recipe.name} extra={<Link href='/recipe/[id]' as={'/recipe/'.concat(recipe.ID)}>
                            <a>Go to Recipe</a>
                        </Link>}>
                            <Card type="inner" size="small" title="Details">{recipe.details}</Card>
                            <Card type="inner" size="small" title="Steps">{recipe.steps.map(step => (
                                <Card size="small">{step}</Card>
                            ))}</Card>
                            <Card type="inner" size="small" title="Ingredients">{recipe.ingredients.map(ingredient => (
                                <Card size="small">{ingredient}</Card>
                            ))}</Card>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Page>
    </div>
);

Recipes.getInitialProps = async function () {
    const res = await axios.get('https://gastrogang.herokuapp.com/api/v1/recipes', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjN9.8MdXgqXN4F7JbG7Ht3bUiJhmHHGhRrlobH4Ei6Ha4WM',
            // 'Authorization': 'Bearer ' + Cookies.get('token')
        },
    })
    const data = JSON.parse(JSON.stringify(res.data))
    console.log(data)
    return {
        recipes: data.map(function (item) {
            return item;
        })
    };
};

export default Recipes