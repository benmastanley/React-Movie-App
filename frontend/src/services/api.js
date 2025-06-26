const API_KEY = "55a3295650fe64dca414a4ecd0a2e0aa";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
};
