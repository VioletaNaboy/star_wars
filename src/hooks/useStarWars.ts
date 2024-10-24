import { useEffect } from 'react';
import { fetchCharacters } from '../api/characterApi';
import { fetchFilmsByCharacter } from '../helpers/filmHelpers';
import { fetchStarshipsForFilms } from '../helpers/starshipHelpers';
import { useStarWarsContext } from '../context/StarWarsContext';
import { Character } from '../api/characterApi';

export const useStarWars = () => {
    const { setCharacters, setSelectedCharacter } = useStarWarsContext();

    // Завантаження персонажів
    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const data = await fetchCharacters();
                setCharacters(data);
            } catch (error) {
                console.error('Failed to load characters', error);
            }
        };
        loadCharacters();
    }, [setCharacters]);

    const selectCharacter = async (character: Character) => {

        const filmsData = await fetchFilmsByCharacter(character.films);
        const characterStarships = character.starships;
        const filmsWithStarships = await fetchStarshipsForFilms(filmsData, characterStarships);
        const resolvedFilmsWithStarships = await Promise.all(filmsWithStarships);

        setSelectedCharacter({ ...character, films: resolvedFilmsWithStarships });
    };


    return { selectCharacter };
};
