/**
 * Landing Page
 * @author Paul Madduma
 */
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import the axios library
import { Link } from 'react-router-dom'; 

// Import components
import PageLoad from '../components/PageLoad';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  // Create a state to display, loading and error handling the data
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  //useEffect using GET method via axios
  useEffect (() => {
    console.log('Launches component mounts');

    // Set minimum load time for loading in 1500 milliseconds
    window.setTimeout(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then( (response) => {
        // Success response handling, loading is false and finish and show results
        console.log(response);
        // render results object from data
        const {data} = response;
        setInfo(data.results);
        setLoading(false);
      })
      .catch( (error) => {
        // Error response handling, status check and loading in error state
        console.log(error.response);
        const { status, data } = error.response;
        setError(`${status}, ${data}`);
        setLoading(false);
      })
      .then(() => {
        console.log('Please see more information!');
      });

    }, 1500); 

  }, []
  ); 

  //Use to check the results for debugging purposes
  console.log(info);

  //outcomes with rendering Pokemon API data
  return (
    <div>
      <Header />
      <h1 className="text-center mt-4">Pokemon Directory</h1>
      <p className="lead text-center">Check out our list of 151 Pokemons. Let's Go!</p>
      {/* Display <Loading /> while getting data is in process*/}
      {loading && (
        <PageLoad />
      )}

      {/* Loading and error are false and info length equals 0, then display message */}
      {!loading && !error && info.length === 0 && (
        <h4 className="font-weight-bold text-center text-warning">There are currently no pokemon data to display</h4>
      )}


      {/* If loading is false and error is true,
       then display the error state */}
      {!loading && error && (
        <h4 className="font-weight-bold text-center text-danger">{error}</h4>
      )}

      
      {/* If there are no errors and data to load and there is success in rendering information, 
      then display the button for specific character with its own specific id (key)*/}
      {!loading && !error && info.length > 0 && (
        <div className="container">
          <div className="row">        
            {info.map( (record, id) => (
              <div key={record.id} className="col-xs-4 col-sm-4 col-md-3 col-lg-3 text-center">
                <Link to={`./pokemon/${id+1}`}>
                  <Button className="bg-warning shadow-lg">
                    {record.name.replace(record.name.charAt(0), letter => letter.toUpperCase())}
                  </Button>
                </Link>
                { console.log(id)}
              </div>             
            ))}
            </div>
        </div>        
      )}
      <Footer />
    </div>
  );
}

export default LandingPage;
