import React from 'react';
import { useStarWarsContext } from '../context/StarWarsContext';
import { Character } from '../api/characterApi';
import { useStarWars } from '../hooks/useStarWars';


const CharacterList: React.FC = () => {
    const { characters } = useStarWarsContext();
    const { selectCharacter } = useStarWars();

    return (
        <ul>
            {characters.map((character: Character) => (
                <li key={character.id} onClick={() => selectCharacter(character)}>
                    {character.name}
                </li>
            ))}
        </ul>
    );
};

export default CharacterList;
