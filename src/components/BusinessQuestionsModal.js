import React, { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';

const BusinessQuestionsModal = ({ isOpen, onClose, onSave, initialQuestions = [] }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newDescription, setNewDescription] = useState('');
  useEffect(() => {
    setQuestions(initialQuestions);
  }, [isOpen, initialQuestions]);


  const handleAddQuestion = () => {
    if (newQuestion.trim() && newDescription.trim()) {
      const newQuestionObj = {
        question: newQuestion,
        description: newDescription
      };
      const updatedQuestions = [...questions, newQuestionObj];
      setQuestions(updatedQuestions);
      setNewQuestion('');
      setNewDescription('');
    }
  };


  const handleSave = () => {
    onSave(questions);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Business Questions</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter your business question"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter question description"
              className="w-full p-2 border rounded-md h-24"
            />
            <button
              onClick={handleAddQuestion}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-4">Added Questions:</h3>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{q.question}</h4>
                  <p className="text-sm text-gray-500">{q.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <Save size={16} /> Save Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessQuestionsModal;