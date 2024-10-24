import axios from 'axios';
import { FilmWithStarships } from './filmApi';

export interface Character {
    id: number;
    name: string;
    films: number[];
    starships: number[];
}

export interface CharacterWithFilms {
    id: number;
    name: string;
    films: FilmWithStarships[];
    starships: number[];
}

const BASE_URL = 'https://sw-api.starnavi.io/people/';

export const fetchCharacters = async (): Promise<Character[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};
