import React, { createContext, useState, useContext } from 'react';
import { Character, CharacterWithFilms } from '../api/characterApi';

interface StarWarsContextProps {
    characters: Character[];
    selectedCharacter: CharacterWithFilms | null;
    setCharacters: (characters: Character[]) => void;
    setSelectedCharacter: (character: CharacterWithFilms | null) => void;
}

const StarWarsContext = createContext<StarWarsContextProps | undefined>(undefined);

export const StarWarsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterWithFilms | null>(null);

    return (
        <StarWarsContext.Provider value={{ characters, selectedCharacter, setCharacters, setSelectedCharacter }}>
            {children}
        </StarWarsContext.Provider>
    );
};

export const useStarWarsContext = () => {
    const context = useContext(StarWarsContext);
    if (!context) {
        throw new Error('useStarWarsContext must be used within a StarWarsProvider');
    }
    return context;
};
