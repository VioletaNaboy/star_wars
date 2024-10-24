import axios from 'axios';
import { Starship } from './starshipApi';
export interface FilmWithStarships {
    id: number;
    title: string;
    episode_id: number;
    starships: Starship[];
}
export interface Film {
    id: number;
    title: string;
    episode_id: number;
    starships: number[];
}

export const fetchFilmById = async (filmId: number): Promise<Film> => {
    try {
        const response = await axios.get(`https://sw-api.starnavi.io/films/${filmId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching film with ID ${filmId}:`, error);
        throw error;
    }
};
