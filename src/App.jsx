import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      alert("Please enter a search query");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://aiapi-vdez.onrender.com/api/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: trimmedQuery }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-animation absolute w-[250px] h-[250px] bg-blue-500 opacity-20 rounded-full top-10 left-20 animate-glow"></div>
        <div className="bg-animation absolute w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full top-1/2 right-10 animate-glow delay-2000"></div>
        <div className="bg-animation absolute w-[220px] h-[220px] bg-green-500 opacity-20 rounded-full bottom-20 left-10 animate-glow delay-4000"></div>
      </div>

      {/* Search Box */}
      <div className={`w-full max-w-lg px-4 transition-all ${searchResults ? "mt-6" : "mt-20"}`}>
        <form onSubmit={handleSearch} className="flex gap-3 bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="w-1/2 mt-4 h-2 bg-gray-700 rounded overflow-hidden">
          <div className="h-full bg-blue-500 animate-loading"></div>
        </div>
      )}

      {/* Results Section */}
      {searchResults && !isLoading && (
       <div className="w-full mt-10 px-4 flex gap-6 relative z-10">
  {/* Google Results */}
  <div className="flex-1 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 relative z-20">
    <h2 className="text-xl font-semibold text-blue-400 mb-4">Top Results from Google</h2>
    {searchResults.Google.map((result, index) => (
      <div key={index} className="mb-3 p-3 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-blue-400">
          <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
        </h3>
        <p className="text-gray-400 text-sm">{result.snippet}</p>
        <span className="text-xs text-gray-500 break-words overflow-hidden block">{result.url}</span>
      </div>
    ))}
  </div>

  {/* YouTube Results */}
  <div className="flex-1 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 relative z-20">
    <h2 className="text-xl font-semibold text-red-400 mb-4">Top Results from YouTube</h2>
    {searchResults.Youtube.map((result, index) => (
      <div key={index} className="mb-3 p-3 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-red-400">
          <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
        </h3>
        <span className="text-xs text-gray-500 break-words overflow-hidden block">{result.url}</span>
      </div>
    ))}
  </div>
</div>

              
      )}
    </div>
  );
}

export default App;
