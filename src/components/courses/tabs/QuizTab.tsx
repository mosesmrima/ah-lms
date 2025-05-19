import React from 'react';

// The component no longer needs props since it has its own data
const QuizTab: React.FC = () => {
  // Sample quizzes for the Course Quizzes tab
  const quizzes = [
    { id: 1, title: "Basics of Data Security", questions: 10 },
    { id: 2, title: "Encryption Techniques", questions: 8 },
    { id: 3, title: "Access Control Principles", questions: 12 },
    { id: 4, title: "Incident Response Scenarios", questions: 6 }
  ];

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-[#222] p-4 rounded-lg flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-white mb-2">{quiz.title}</h3>
            <p className="text-gray-400 mb-4">{quiz.questions} Questions</p>
            <button
              onClick={() => alert(`Starting quiz: ${quiz.title}`)}
              className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizTab;
