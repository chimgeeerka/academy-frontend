import { useGetMovies } from "../hooks/useGetMovies.tsx";

export const DramaMovies = () => {
  const { movies, loading } = useGetMovies("Drama");

  if (loading) {
    return <h1>Unshij bn</h1>;
  }

  if (loading) {
    return <h1>Unshij bn</h1>;
  }

  return (
    <>
      {movies?.map(movie => {
        return <p>{movie.title}</p>;
      })}
    </>
  );
};




