import React, {useEffect} from 'react';
import Amplify, {API} from 'aws-amplify'
import config from './aws-exports'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'
import {Table} from 'react-bootstrap';
import './App.css';

Amplify.configure(config);

function App() {
    const [restaurant, setRestaurant] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [area, setArea] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [recommendedBy, setRecommendedBy] = React.useState('');
    const [visited, setVisited] = React.useState('');
    const [wouldRecommend, setWouldRecommend] = React.useState('');
    const [comments, setComments] = React.useState('');
    const [recommendations, setRecommendations] = React.useState([]);

    useEffect(() => {
        API.get('myrecommendationapi', '/myrecommendation/user')
            .then(res => {
                setRecommendations([...recommendations, ...res]);
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        API.post('myrecommendationapi', '/myrecommendation', {
            body: {
                // user: user,
                restaurant: restaurant,
                address: address,
                area: area,
                category: category,
                recommendedBy: recommendedBy,
                visited: visited,
                wouldRecommend: wouldRecommend,
                comments: comments
            },
        }).then(() => {
            // setRecommendations([ {user: user, restaurant: restaurant},...recommendations])
            setRecommendations([{
                restaurant: restaurant, address: address, area: area, category: category,
                recommendedBy: recommendedBy, visited: visited, wouldRecommend: wouldRecommend, comments: comments
            }, ...recommendations])
        });
    };

    function renderTableData(array) {
        return array.map((item, index) => {
            const {restaurant, address, area, category, recommendedBy, visited, wouldRecommend, comments} = item;
            return (
                <tr key={index}>
                    <td>{restaurant}</td>
                    <td>{address}</td>
                    <td>{area}</td>
                    <td>{category}</td>
                    <td>{recommendedBy}</td>
                    <td>{visited}</td>
                    <td>{wouldRecommend}</td>
                    <td>{comments}</td>
                </tr>
            )
        })
    }

    // function renderTableHeader(array) {
    //     if (array.length > 0) {
    //         let header = Object.keys(array[0]).sort();
    //         return header.map((key, index) => {
    //             return <th key={index}>{key}</th>
    //         })
    //     }
    // }

    return (
        <div className="App">
            <header className="App-header">
                {/*Hello*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Restaurant">Restaurant name:</label>
                        <input id="Restaurant" value={restaurant} placeholder="mae"
                               onChange={(event) => setRestaurant(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="Address">Restaurant Address:</label>
                        <input id="Address" value={address} placeholder="King Georg 42"
                               onChange={(event) => setAddress(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="Area">Area:</label>
                        <input id="Area" value={area} placeholder="Tel Aviv"
                               onChange={(event) => setArea(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="Category">Category:</label>
                        <input id="Category" value={category} placeholder="Coffee"
                               onChange={(event) => setCategory(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="RecommendedBy">recommended By:</label>
                        <input id="RecommendedBy" value={recommendedBy} placeholder="Peri"
                               onChange={(event) => setRecommendedBy(event.target.value)}/>
                    </div>
                    <div>
                        {/*TODO: update type="checkbox"*/}
                        <label htmlFor="Visited">Visited:</label>
                        <input id="Visited" value={visited} placeholder="Yes"
                               onChange={(event) => setVisited(event.target.value)}/>
                    </div>
                    <div>
                        {/*TODO: update type="checkbox"*/}
                        <label htmlFor="WouldRecommend">Would Recommend:</label>
                        <input id="WouldRecommend" value={wouldRecommend} placeholder="Yes"
                               onChange={(event) => setWouldRecommend(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="Comments">Comments:</label>
                        <input id="Comments" value={comments} placeholder=""
                               onChange={(event) => setComments(event.target.value)}/>
                    </div>
                    <div>
                        <button>Add</button>
                    </div>

                </form>
                <Table striped bordered id='recommendations'>
                    <tbody>
                    <tr>
                        {/*{renderTableHeader(recommendations)}*/}
                        <th>Restaurant</th>
                        <th>Address</th>
                        <th>Area</th>
                        <th>Category</th>
                        <th>Recommended By</th>
                        <th>Visited</th>
                        <th>Would Recommend</th>
                        <th>Comments</th>
                    </tr>
                    {renderTableData(recommendations)}
                    </tbody>
                </Table>


            </header>
            <AmplifySignOut/>
        </div>
    );
}

export default withAuthenticator(App);
