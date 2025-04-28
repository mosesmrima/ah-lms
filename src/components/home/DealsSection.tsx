"use client";
import { AcademicCapIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const DealsSection = () => {
  const deals = [
    {
      id: 1,
      title: "Learn New Skills",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu tortor vel leo sollicitudin placerat.",
      icon: AcademicCapIcon
    },
    {
      id: 2,
      title: "Earn Rewards", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu tortor vel leo sollicitudin placerat.",
      icon: TrophyIcon
    },
    {
      id: 3,
      title: "Get A Community",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu tortor vel leo sollicitudin placerat.",
      icon: UserGroupIcon
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-black text-white">
      <div className="container mx-auto">
        <span className="text-red-500 font-semibold text-sm mb-2 block">Benefits</span> 
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Great Deals For You</h2>
        <p className="text-white mb-10 max-w-xl">When you join this platform you will get benefits and perks</p>
        
        <div className="self-stretch inline-flex justify-center items-start gap-36 overflow-x-auto">
          {deals.map((deal) => (
            <div key={deal.id} data-property-1="Default" className="relative flex justify-center items-center gap-2.5">
              <div className="w-80 h-80 bg-[#1E1E1E] rounded-[30px]" />
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
                <div className="w-32 h-32 bg-neutral-900 rounded-[30px] flex items-center justify-center">
                  <deal.icon className="w-12 h-12 text-white hover:text-red-600" /> 
                </div>
                <div className="flex flex-col justify-start items-center gap-2">
                  <div className="justify-start text-white text-xl font-black leading-7">{deal.title}</div>
                  <div className="w-72 text-center justify-start text-gray-500 text-base font-normal tracking-tight">{deal.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
