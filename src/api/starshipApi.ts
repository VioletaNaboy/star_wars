import axios from 'axios';

export interface Starship {
    id: number;
    name: string;
}

export const fetchStarshipById = async (starshipId: number): Promise<Starship> => {
    try {
        const response = await axios.get(`https://sw-api.starnavi.io/starships/${starshipId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching starship with ID ${starshipId}:`, error);
        throw error;
    }
};
