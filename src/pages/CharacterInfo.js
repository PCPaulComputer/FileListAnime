/**
 * CharacterInfo Page
 * @author Paul M
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Import Components
import PageLoad from '../components/PageLoad';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CharacterInfo = () => {
  // Setup the identifier that serves as a locator 
  // for each pokemon character page
  const { pokemonId } = useParams();

  // Setup the state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  useEffect(() => {

    setTimeout(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
          const { data } = response;
          console.log(data);
          setQuery(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          const { status, data } = error.response;
          setLoading(false);
          setError(`${status} ${data}`);
        });   

    }, 1500);

  }, []); 

  // Console results for debugging purposes
  console.log(query);
  console.log(pokemonId);

  // render the results with conditionals to determine 
  // if getting the Pokemon API data is successful 
  return (
    <div>
      <Header />
      {/* If loading is true, then display <PageLoad /> */}
      {loading && (
        <PageLoad />
      )}

      {/* If loading is false and error is true, then display the error */}
      {!loading && error && (
        <div className="text-center">
          <h4 className="font-weight-bold">{error}</h4>
          <Link to="/" className="btn btn-primary">Go Back</Link>
        </div>
      )}

      {/* If both loading and error are false and query contains data then display the query */}
      {!loading && !error && query && (
        <div className="container m-4 mx-auto">
          <div className="text-center">
            <img src={query.sprites.front_default} className="border-0 w-20" alt="ProfilePhoto"/>
          </div>
          <table className="table table-bordered table-striped text-center mb-2">
            <thead>
              <tr>
                <th colSpan="2" className="bg-secondary text-white">
                  <h3>{query.species.name.charAt(0).toUpperCase()+query.species.name.slice(1)}</h3>
                </th>
              </tr>
            </thead>
            <tbody className="border border-dark">
              <tr>
                <td><strong>Stats</strong></td>
                <td><strong>Value</strong></td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[0].stat.name.toUpperCase()}   <i className="fas fa-battery-full"></i></td>
                <td>{query.stats[0].base_stat || '-'}</td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[1].stat.name.toUpperCase()}   <i className="fas fa-fist-raised"></i></td>
                <td>{query.stats[1].base_stat || '-'}</td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[2].stat.name.toUpperCase()}   <i className="fas fa-shield-alt"></i></td>
                <td>{query.stats[2].base_stat || '-'}</td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[3].stat.name.toUpperCase()}   <i className="fas fa-fist-raised text-danger"></i></td>
                <td>{query.stats[3].base_stat || '-'}</td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[4].stat.name.toUpperCase()}   <i className="fas fa-shield-alt text-success"></i></td>
                <td>{query.stats[4].base_stat || '-'}</td>
              </tr>
              <tr>
                <td className='font-weight-bold'>{query.stats[5].stat.name.toUpperCase()}   <i className="fas fa-bolt text-info"></i></td>
                <td>{query.stats[5].base_stat || '-'}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center my-4">
            <Link to="/" className="btn bg-danger btn-block text-center mx-auto text-light w-50"><i class="fas fa-arrow-left"></i> Go Back</Link>
          </div>       
        </div>  
      )}
      <Footer />
    </div>
  );
}

export default CharacterInfo;