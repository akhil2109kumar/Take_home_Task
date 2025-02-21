"use client";
import { useState } from "react";
import { Settings, X, Search, Clock, Trash2, ArrowRight, FileText, Star } from "lucide-react";
import Featured from "@/components/Featured";
import KPI from "@/components/KPI";
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
  const questionsToDisplay = businessQuestions.length > 0 ? businessQuestions : defaultBusinessQuestions;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText size={28} className="text-gray-800" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">INTES <span className="text-sm text-gray-500">Layout</span></h2>
              <p className="text-sm text-gray-500">Descriptive name of the layout</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 text-gray-700">
          <p>
            These options are already baked in with this model. Shoot me an email, clear blue water,
            but we need distributors to evangelize the new fire to local markets.
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">#ecomms</span>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">#coverage</span>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">#stakeholders</span>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="text-xl font-semibold">2485</p>
              <p className="text-sm text-gray-500">Used</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Universal</p>
              <p className="text-sm text-gray-500">Type</p>
            </div>
            <div>
              <p className="text-xl font-semibold">6</p>
              <p className="text-sm text-gray-500">Pages No.</p>
            </div>
            <div>
              <p className="text-xl font-semibold">07/23/2024</p>
              <p className="text-sm text-gray-500">Last Updated</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900">Business Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {questionsToDisplay.map((q, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900">{`Question ${index + 1}`}</h4>
                <p className="text-sm text-gray-600">{q.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t flex justify-between items-center bg-gray-50">
          <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <Star size={18} /> Favorite item
          </button>
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
    Layouts: " ",
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