// /StarWarsApp.tsx
import React from 'react';
import { StarWarsProvider } from './context/StarWarsContext';
import CharacterList from './components/CharacterList';
import SelectedCharacterDetails from './components/flow/SelectedCharacterDetails';

const App: React.FC = () => {


  return (
    <StarWarsProvider>
      <h1>Star Wars Characters</h1>
      <CharacterList />
      <SelectedCharacterDetails />
    </StarWarsProvider>
  );
};

export default App;
