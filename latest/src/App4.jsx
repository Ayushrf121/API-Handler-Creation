import axios from "axios";
import React, { useState } from "react";

export default function App4() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomUser = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        "https://randomuser.me/api/"
      );

      const {
        gender,
        email,
        name,
        picture,
        location
      } = data.results[0];

      setUser({
        name: `${name.title} ${name.first} ${name.last}`,
        email,
        photo: picture.large,
        gender,
        location: `${location.city}, ${location.state}, ${location.country}`
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        Random User Generator
      </h1>

      <button
        onClick={getRandomUser}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Get Random User"}
      </button>

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
          <img
            src={user.photo}
            alt={user.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />

          <h2 className="text-xl font-semibold">
            {user.name}
          </h2>

          <p>{user.email}</p>
          <p>{user.gender}</p>
          <p>{user.location}</p>
        </div>
      )}
    </div>
  );
}