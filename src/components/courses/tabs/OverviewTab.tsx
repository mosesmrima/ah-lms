import React from 'react';

// Component no longer needs props since it has its own data
const OverviewTab: React.FC = () => {
  // Course data for the Overview tab
  const course = {
    whatYouWillLearn: [
      "Fundamentals of Data Security",
      "Threat Landscape Analysis",
      "Encryption and Data Protection",
      "Access Control and Identity Management",
      "Incident Response and Recovery",
      "Security Best Practices",
      "Compliance and Regulations",
      "Data Security in the Cloud",
      "Case Studies and Real-World Scenarios",
      "Hands-On Labs"
    ],
    requirements: [
      "Internet Connection: A stable internet connection is essential for accessing course materials, participating in online discussions, and completing assessments.",
      "Basic Computer Knowledge: Familiarity with computers, tablets, or smartphones with the capability to run the required course software and view course content.",
      "Web Browser: A modern web browser (e.g., Chrome, Firefox, Safari) is needed to access the course platform and view content.",
      "PDF Reader: For accessing course materials and documentation.",
      "Learning Management System (LMS): Access to the Learning Management System (LMS) where the course is hosted."
    ],
    description_full: "As an increasingly digitized world where data is a valuable asset, protecting sensitive information is paramount. This comprehensive Data Security course, taught by renowned data security expert Madison Blue, provides you with the knowledge and skills needed to effectively secure your company's most valuable assets.\n\nThe course begins with the fundamentals of data security, including confidentiality, integrity, and availability principles. You'll learn about threat assessment, risk management, and how to implement robust security controls. From there, you'll dive into practical applications, exploring real-world case studies and hands-on exercises.\n\nBy the end of this course, you'll have the skills to:\n- Identify potential vulnerabilities in your organization's data infrastructure\n- Implement effective security measures to protect sensitive information\n- Respond to security incidents quickly and effectively\n- Develop comprehensive data security policies\n- Stay up-to-date with emerging threats and countermeasures"
  };

  return (
    <div>
      <div className="bg-[#1A1A1A] rounded-lg p-6 my-8">
        <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.whatYouWillLearn.map((item, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        <ul className="list-disc pl-5 space-y-2">
          {course.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="whitespace-pre-line text-gray-300">
          {course.description_full}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
