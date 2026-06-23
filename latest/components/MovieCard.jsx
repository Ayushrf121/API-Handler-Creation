import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Fetching from our new paginated endpoint
        const response = await axios.get(`http://localhost:5000/api/movies?page=${page}&limit=24`);
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]); // Re-run when the page changes

  if (loading) return <div className="text-center mt-20 text-xl font-semibold text-gray-400">Loading your cinema library...</div>;
  if (error) return <div className="text-center mt-20 text-xl font-semibold text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center border-b border-gray-800 pb-5">
        <h1 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          MFlix Cinema
        </h1>
        <span className="text-sm text-gray-400 font-medium">Page {page} of {totalPages}</span>
      </header>

      {/* Grid Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col justify-between hover:border-gray-700 transition duration-300">
            <div>
              {/* Poster aspect ratio box */}
              <div className="aspect-[2/3] w-full bg-gray-950 relative overflow-hidden group">
                {movie.poster ? (
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 italic text-sm">
                    No Poster Available
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-gray-900/90 text-amber-400 text-xs font-bold px-2 py-1 rounded border border-gray-800">
                  {movie.year}
                </span>
              </div>

              {/* Movie Details */}
              <div className="p-4">
                <h2 className="font-bold text-lg text-white line-clamp-1 mb-1" title={movie.title}>
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-xs line-clamp-2 mb-3 min-h-[32px]">
                  {movie.plot || "No synopsis description available."}
                </p>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-1">
                  {movie.genres?.slice(0, 2).map((genre, i) => (
                    <span key={i} className="bg-blue-950 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 pt-0 border-t border-gray-800/50 mt-auto flex justify-between items-center text-xs text-gray-500">
              <span>{movie.runtime ? `${movie.runtime} mins` : 'N/A'}</span>
              <span className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-semibold">{movie.rated || 'UNRATED'}</span>
            </div>
          </div>
        ))}
      </main>

      {/* Pagination Controls */}
      <footer className="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900 transition"
        >
          Previous
        </button>
        <span className="text-sm text-gray-400 font-semibold">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900 transition"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default MovieGrid;