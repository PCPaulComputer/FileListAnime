import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CharacterInfo from './pages/CharacterInfo';

function App() {
  const result = useRouteMatch();
  console.log(result.url);
  return (
    <div className="App">
        <Switch>
          {/* pokemonId - identifier to locate a single character profile */}
          <Route exact path={`${result.url}pokemon/:pokemonId`}>
            <CharacterInfo />
          </Route>
          <Route exact path={result.url}>
            <LandingPage />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
