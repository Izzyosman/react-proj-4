import axios from 'axios';

async function searchYelp(location) {
  try {
    const response = await axios.get('http://localhost:4005/yelp-api', {
      params: {
        location: location,
      },
    });

    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    throw error;
  }
}

export default searchYelp;