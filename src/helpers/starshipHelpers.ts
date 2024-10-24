import { Film, FilmWithStarships } from '../api/filmApi';
import { fetchStarshipById } from '../api/starshipApi';

export const fetchStarshipsForFilms = async (films: Film[], characterStarshipIds: number[]): Promise<FilmWithStarships[]> => {
    try {

        const filmsWithStarships = await Promise.all(
            films.map(async (film) => {
                const filmStarships = film.starships.filter((starshipId) =>
                    characterStarshipIds.includes(starshipId)
                );

                const starshipsData = await Promise.all(filmStarships.map((starshipId) => fetchStarshipById(starshipId)));

                return { ...film, starships: starshipsData };
            })
        );
        console.log(filmsWithStarships)
        return filmsWithStarships;
    } catch (error) {
        console.error('Error fetching starships:', error);
        throw error;
    }
};
