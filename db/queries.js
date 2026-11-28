import { pool } from "./pool.js";

const createQueries = (dbPool) => {
    const getAllGenres = async () => {
        const { rows } = await dbPool.query(
            "SELECT * FROM genre ORDER BY label ASC",
        );
        return rows;
    };

    const getOneGenreById = async (genreId) => {
        const { rows } = await dbPool.query(
            "SELECT * FROM genre WHERE id = $1",
            [genreId],
        );
        return rows[0];
    };

    const getOneDeveloperById = async (developerId) => {
        const { rows } = await dbPool.query(
            "SELECT * FROM developer WHERE id = $1",
            [developerId],
        );
        return rows[0];
    };

    const getAllDevelopers = async () => {
        const { rows } = await dbPool.query(
            "SELECT * FROM developer ORDER BY name ASC",
        );
        return rows;
    };

    const getGamesByGenreId = async (genreId) => {
        const { rows } = await dbPool.query(
            "SELECT * FROM game WHERE genre_id = $1 ORDER BY name ASC",
            [genreId],
        );
        return rows;
    };

    const getGamesByDeveloperId = async (developerId) => {
        const { rows } = await dbPool.query(
            "SELECT * FROM game WHERE developer_id = $1 ORDER BY name ASC",
            [developerId],
        );
        return rows;
    };

    const getGameDetailsById = async (id) => {
        const { rows } = await dbPool.query(
            "SELECT game.id, game.name AS game_name, game.price_rm, game.release_year, game.rating_ign, game.stock_amount, genre.label, game.genre_id, developer.name AS developer_name, game.developer_id FROM game JOIN genre ON game.genre_id = genre.id JOIN developer ON game.developer_id = developer.id WHERE game.id = $1 ",
            [id],
        );
        return rows[0];
    };

    return {
        getAllGenres,
        getOneGenreById,
        getOneDeveloperById,
        getAllDevelopers,
        getGamesByGenreId,
        getGamesByDeveloperId,
        getGameDetailsById,
    };
};

export const db = createQueries(pool);
