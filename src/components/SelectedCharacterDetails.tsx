import React from 'react';
import { useStarWarsContext } from '../context/StarWarsContext';
import { Starship } from '../api/starshipApi';
const SelectedCharacterDetails: React.FC = () => {
    const { selectedCharacter } = useStarWarsContext();

    if (!selectedCharacter) return null;

    return (
        <div>
            <h2>Selected Character: {selectedCharacter.name}</h2>
            {selectedCharacter.films.map((film) => (
                <div key={film.id}>
                    <h3>{film.title} (Episode {film.episode_id})</h3>
                    <h4>Starships:</h4>
                    <ul>
                        {film.starships.map((starship: Starship) => (
                            <li key={starship.id}>{starship.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SelectedCharacterDetails;
