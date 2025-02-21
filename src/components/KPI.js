import React, { useState } from 'react';
import {
  Goal,
  HelpCircle,
  BarChart3,
  Calculator,
  FileText,
  Users,
  Eye
} from 'lucide-react';
import BusinessQuestionsModal from './BusinessQuestionsModal';

const KPI = ({ onSaveQuestions }) => {
  const [isBusinessQuestionsModalOpen, setIsBusinessQuestionsModalOpen] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState([]);

  const handleSaveQuestions = (questions) => {
    setSavedQuestions(questions);
    onSaveQuestions(questions); // This will update the parent state
    setIsBusinessQuestionsModalOpen(false);
  };


  const sections = [
    { title: 'KPI Modal', icon: <Goal className="w-5 h-5" />, featured: true },
    {
      title: 'Business Questions',
      icon: <HelpCircle className="w-5 h-5" />,
      onClick: () => setIsBusinessQuestionsModalOpen(true)
    },
    { title: 'Metric IDs', icon: <BarChart3 className="w-5 h-5" /> },
    { title: 'Description', icon: <FileText className="w-5 h-5" /> },
    { title: 'Calculation', icon: <Calculator className="w-5 h-5" /> },
    { title: 'Visuals available', icon: <Eye className="w-5 h-5" /> },
    { title: 'Affiliate Applicability', icon: <Users className="w-5 h-5" /> }
  ];



  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            onClick={section.onClick}
            className={`
              bg-white rounded-lg shadow-sm hover:shadow-md transition-all
              ${section.featured ? 'border-l-4 border-blue-500' : ''}
              p-4 cursor-pointer
            `}
          >
            <div className="flex items-center mb-3">
              <div className={`
                p-2 rounded-lg mr-3
                ${section.featured ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-600'}
              `}>
                {section.icon}
              </div>
              <div className="flex items-center justify-between w-full">
                <h4 className={`
                  font-medium
                  ${section.featured ? 'text-blue-700' : 'text-gray-700'}
                `}>
                  {section.title}
                </h4>
                {section.count !== undefined && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                    {section.count}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Click to view details about {section.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      <BusinessQuestionsModal
        isOpen={isBusinessQuestionsModalOpen}
        onClose={() => setIsBusinessQuestionsModalOpen(false)}
        onSave={handleSaveQuestions}
        initialQuestions={savedQuestions}
      />
    </div>
  );
};

export default KPI;