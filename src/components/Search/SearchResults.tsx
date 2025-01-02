import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FanGrid } from '../FanGrid/FanGrid';
import { useFanData } from '../../hooks/useFanData';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { fanData, loading } = useFanData();

  const searchResults = fanData.filter(fan => 
    fan.modelName.toLowerCase().includes(query.toLowerCase()) ||
    fan.category.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-white text-center">
        Search Results for "{query}"
      </h1>
      {searchResults.length > 0 ? (
        <FanGrid fans={searchResults} />
      ) : (
        <p className="text-center text-white">No fans found matching your search.</p>
      )}
    </div>
  );
}