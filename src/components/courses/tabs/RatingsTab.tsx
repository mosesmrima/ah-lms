import React from 'react';
import Image from 'next/image';

// Component no longer needs props since it has its own data
const RatingsTab: React.FC = () => {
  // Sample ratings for the Student Ratings tab
  const ratings = [
    {
      name: "Billy John",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 5,
      review: "Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts,",
    },
    {
      name: "Nelson Kim",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 4,
      review: "Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts,",
    },
    {
      name: "Sarah Miller",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 5,
      review: "The course content is exceptionally well-structured and the instructor explains complex security concepts in an accessible way.",
    },
    {
      name: "James Wilson",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 4,
      review: "Practical exercises helped me apply the security principles immediately in my work environment. Highly recommended!",
    }
  ];

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Student Ratings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ratings.map((r, idx) => (
          <div key={idx} className="flex bg-[#232323] rounded-xl p-4 items-start">
            <Image
              src={r.avatar}
              alt={`Avatar for ${r.name}`}
              width={64}
              height={64}
              className="rounded-xl object-cover mr-4 border-2 border-red-600"
              priority
            />
            <div>
              <div className="font-bold text-white mb-1">{r.name}</div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < r.rating ? "text-red-500" : "text-gray-400"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.976c.3.921-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.976a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                ))}
              </div>
              <div className="text-gray-200">{r.review}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsTab;
