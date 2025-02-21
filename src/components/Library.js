"use client";
import { useState, useEffect } from "react";
import { Settings, X, Search, Clock, Trash2, ArrowRight } from "lucide-react";
import Featured from "@/components/Featured";
import KPI from "@/components/KPI";
import Layouts from "@/components/Layouts";
import Storyboards from "@/components/Storyboards";

const defaultFeaturedItems = [
  { name: "Feature Item 1", description: "Latest analytics dashboard template", date: "06/27/2024" },
  { name: "Feature Item 2", description: "Customer journey mapping tool", date: "06/27/2024" },
  { name: "Feature Item 3", description: "Data visualization components", date: "06/27/2024" },
  { name: "Feature Item 4", description: "Marketing campaign tracker", date: "06/27/2024" }
];

const defaultTrendingItems = [
  { name: "Trending Report 1", description: "Monthly revenue analysis template", date: "06/27/2024" },
  { name: "Trending Dashboard 2", description: "User engagement metrics", date: "06/27/2024" },
  { name: "Trending Analysis 3", description: "Market competition overview", date: "06/27/2024" },
  { name: "Trending Template 4", description: "Performance tracking system", date: "06/27/2024" }
];

const defaultBusinessQuestions = [
  {
    question: "What is our current market share?",
    description: "Analysis of market position compared to competitors"
  },
  {
    question: "How has customer satisfaction evolved?",
    description: "Tracking customer satisfaction metrics over time"
  },
  {
    question: "What are our key revenue drivers?",
    description: "Breakdown of revenue sources and growth patterns"
  }
];


const LayoutModal = ({ isOpen, onClose, businessQuestions }) => {
  const questionsToDisplay = businessQuestions.length > 0
    ? businessQuestions
    : defaultBusinessQuestions;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">INTES Layout</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Business Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questionsToDisplay.map((q, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">{q.question}</h4>
                    <p className="text-sm text-gray-500">{q.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Library() {
  const [activeTab, setActiveTab] = useState("Featured");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [businessQuestions, setBusinessQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [filteredFeaturedItems, setFilteredFeaturedItems] = useState(defaultFeaturedItems);
  const [filteredTrendingItems, setFilteredTrendingItems] = useState(defaultTrendingItems);
  const [isSearching, setIsSearching] = useState(false);

  const handleSaveBusinessQuestions = (questions) => {
    console.log("Saving business questions:", questions);
    setBusinessQuestions(questions);
  };

  const filterItems = (query) => {
    if (!query) {
      setIsSearching(false);
      setFilteredFeaturedItems(defaultFeaturedItems);
      setFilteredTrendingItems(defaultTrendingItems);
      return;
    }

    const lowercaseQuery = query.toLowerCase();

    const filteredFeatured = defaultFeaturedItems.filter(
      item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
    );

    const filteredTrending = defaultTrendingItems.filter(
      item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
    );

    setIsSearching(true);
    setFilteredFeaturedItems(filteredFeatured);
    setFilteredTrendingItems(filteredTrending);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
    filterItems(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setFilteredFeaturedItems(defaultFeaturedItems);
    setFilteredTrendingItems(defaultTrendingItems);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const tabComponents = {
    Featured: (
      <Featured
        featuredItems={filteredFeaturedItems}
        trendingItems={filteredTrendingItems}
        isSearching={isSearching}
        searchQuery={searchQuery}
      />
    ),
    KPI: <KPI onSaveQuestions={handleSaveBusinessQuestions} />,
    Layouts: <Layouts />,
    Storyboards: <Storyboards />
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <div className="p-6 w-full max-w-4xl flex justify-between items-center">
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold">Library</h1>
          <p className="text-gray-600">Browse for assets needed to report and present analysis.</p>
        </div>
        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Settings size={18} /> Request
        </button>
      </div>

      <div className="mt-12 flex flex-col items-center w-full max-w-lg">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Type to search..."
            className="w-full p-3 pl-10 border rounded-md shadow-sm focus:ring focus:ring-gray-300"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>

        {recentSearches.length > 0 && !isSearching && (
          <div className="mt-4 w-full bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <h3 className="font-medium">Recent Searches</h3>
              </div>
              <button
                onClick={clearRecentSearches}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center justify-between"
                >
                  <span>{search}</span>
                  <ArrowRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="mt-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={16} />
            Clear search
          </button>
        )}

        <div className="flex gap-4 mt-4">
          {Object.keys(tabComponents).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab ? "bg-gray-900 text-white" : "text-gray-600"
              }`}
              onClick={() => {
                if (tab === "Layouts") {
                  setIsModalOpen(true);
                } else {
                  setActiveTab(tab);
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        {isSearching ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <p className="text-gray-600 mb-4">
              Found {filteredFeaturedItems.length + filteredTrendingItems.length} items matching "{searchQuery}"
            </p>
            {tabComponents[activeTab]}
          </div>
        ) : (
          <>
            {activeTab !== "KPI" && (
              <>
                <h2 className="text-xl font-bold">{activeTab}</h2>
                <p className="text-gray-600">Curated content for {activeTab.toLowerCase()}.</p>
              </>
            )}
            {tabComponents[activeTab]}
          </>
        )}
      </div>

      <LayoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        businessQuestions={businessQuestions.length > 0 ? businessQuestions : defaultBusinessQuestions}
      />
    </div>
  );
}