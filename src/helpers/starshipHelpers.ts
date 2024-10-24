import { Film, FilmWithStarships } from '../api/filmApi';
import { fetchStarshipById } from '../api/starshipApi';

export const fetchStarshipsForFilms = async (films: Film[], characterStarshipIds: number[]): Promise<FilmWithStarships[]> => {
    try {
        // Для кожного фільму, отримуємо його кораблі
        const filmsWithStarships = await Promise.all(
            films.map(async (film) => {
                // Фільтруємо кораблі, що належать персонажу
                const filmStarships = film.starships.filter((starshipId) =>
                    characterStarshipIds.includes(starshipId)
                );

                // Отримуємо дані про кожен корабель
                const starshipsData = await Promise.all(filmStarships.map((starshipId) => fetchStarshipById(starshipId)));

                // Повертаємо оновлений фільм з новими даними про кораблі
                return { ...film, starships: starshipsData };
            })
        );
        console.log(filmsWithStarships)
        return filmsWithStarships; // Повертаємо масив фільмів з повними об'єктами Starship
    } catch (error) {
        console.error('Error fetching starships:', error);
        throw error;
    }
};
