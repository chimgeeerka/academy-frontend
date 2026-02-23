import React, { useEffect, useState } from "react";
import { useGetMoviesTans } from "../hooks/useGetMoviesTans";
import { LoaderCircle, Film, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";

import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const AllMovies = () => {
  const { movies = [], loading, isError } = useGetMoviesTans();

  const [page, setPage] = useState<number>(1);
  const moviesPerPage = 10;

  // Handle page change
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Reset page if movies change and current page is invalid
  useEffect(() => {
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [movies, page]);

  // Pagination logic
  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative">
          <LoaderCircle className="animate-spin w-12 h-12 text-yellow-400" />
          <div className="absolute inset-0 animate-ping">
            <LoaderCircle className="w-12 h-12 text-yellow-400/30" />
          </div>
        </div>
        <p className="mt-4 text-slate-400 font-medium">
          Loading amazing movies...
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-400">
            Failed to load movies. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!movies.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center max-w-md backdrop-blur-sm">
          <Film className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            No movies found
          </h2>
          <p className="text-slate-400">
            Start by adding some amazing movies to your collection!
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All Movies</h2>
        <span className="text-slate-400">{movies.length} movies</span>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentMovies.map((movie) => (
          <Link
            key={movie._id}
            to={`/movie/${movie._id}`}
            className="group cursor-pointer transform transition-all duration-300 hover:z-10"
          >
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Stack spacing={2} alignItems="center">
        <Typography color="gray">Page: {page}</Typography>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="secondary"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};