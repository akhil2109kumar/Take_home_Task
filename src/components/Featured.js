import { Clock } from "lucide-react";

export default function Featured({ featuredItems, trendingItems, isSearching, searchQuery }) {
  return (
    <div>
      <div>
        {isSearching && featuredItems.length > 0 && (
          <h3 className="text-lg font-semibold mb-4">Featured Results</h3>
        )}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {featuredItems.map((item, i) => (
            <div key={`featured-${i}`} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <Clock size={40} className="text-gray-500" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-gray-400 text-xs mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(!isSearching || (isSearching && trendingItems.length > 0)) && (
        <div className="mt-12 w-full max-w-4xl">
          <h2 className="text-xl font-bold">Trending</h2>
          <p className="text-gray-600">Most popular by community.</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {trendingItems.map((item, i) => (
              <div key={`trending-${i}`} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
                <Clock size={40} className="text-gray-500" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && featuredItems.length === 0 && trendingItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No items found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}