import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
// import YelpSearch from './YelpSearch'
import searchYelp from '../api/searchYelp'
import '../assets/style.css'

const Home = () => {
    const { state: { userId, token } } = useContext(AuthContext);
    const [businesses, setBusinesses] = useState([]); // State to store Yelp businesses
    const [hasSearched, setHasSearched] = useState(false);

    const [posts, setPosts] = useState([])

    // const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');

    // useEffect(() => {
    //     if (location) {
    //       searchYelp(location)
    //         .then((data) => {
    //             // setPosts(data);
    //             console.log(data)
    //         })
    //         .catch((error) => {
    //           // Handle error
    //         });
    //     }
    // }, [location]);

    // useEffect(() => {
    //     axios.get('/posts')
    //     .then(res => {
    //         if (userId) {
    //             const otherUsersPosts = res.data.filter(post => +userId !== post.userId)
    //             setPosts(otherUsersPosts)
    //         } else {
    //             setPosts(res.data)
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [userId])

    const handleLocationSubmit = () => {
        if (location) {
          searchYelp(location)
            .then((data) => {
                console.log(data);
                setHasSearched(true);
                setBusinesses(data); // Update state with Yelp businesses
            })
            .catch((error) => {
              // Handle error
            });
        }
    };

    const businessCards = businesses?.map((business) => (
        <div key={business.id} className='business-card'>
          <div className="business-image">
            <img src={business.image_url} alt={business.name} />
          </div>
          <div className="business-details">
            <h2>{business.name}</h2>
            <p>{business.location.address1}</p>
          </div>
        </div>
    ));
      

    // ... (Previous code)

    return (
        <main>
        <div>
            <h1>Enter Zip Code to Search Restaurants</h1>
            <br />
            <input
            type="text"
            placeholder="Enter a zipcode..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleLocationSubmit}>Submit</button>
        </div>
        {hasSearched && (
            <div className="business-list">
            {businessCards?.length >= 1 ? (
                businessCards
            ) : (
                <p>No results found</p>
            )}
            </div>
        )}
        </main>
    );
  
}

export default Home