import { Film } from '../api/filmApi';
import { fetchFilmById } from '../api/filmApi';

export const fetchFilmsByCharacter = async (filmIds: number[]): Promise<Film[]> => {
    try {
        const filmPromises = await filmIds.map((filmId) => fetchFilmById(filmId));
        const films = await Promise.all(filmPromises);

        return films
    } catch (error) {
        console.error('Error fetching films:', error);
        throw error;
    }
};
