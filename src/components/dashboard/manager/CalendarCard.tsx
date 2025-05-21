import React from 'react';

const dayLabels = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const generateCalendarDates = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get the last date of the current month
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get the last date of the previous month
  const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  const dates = [];
  
  // Add previous month's dates
  for (let i = firstDayOfMonth; i > 0; i--) {
    dates.push({
      dayNum: lastDateOfPrevMonth - i + 1,
      isOtherMonth: true,
      isToday: false
    });
  }
  
  // Add current month's dates
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dates.push({
      dayNum: i,
      isOtherMonth: false,
      isToday: i === currentDate
    });
  }
  
  // Add next month's dates to complete the grid
  const remainingCells = 42 - dates.length; // 6 rows x 7 days = 42 cells
  for (let i = 1; i <= remainingCells; i++) {
    dates.push({
      dayNum: i,
      isOtherMonth: true,
      isToday: false
    });
  }
  
  return dates;
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarCard: React.FC = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const calendarDates = generateCalendarDates();
  
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold">My Calendar</h3>
        <span className="text-sm text-red-500 font-medium">
          {monthNames[currentMonth]} {currentYear}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
        {dayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
        {calendarDates.map((dateInfo, index) => (
          <div
            key={index}
            className={`
              h-8 w-8 flex items-center justify-center mx-auto rounded-full
              transition-colors duration-200
              ${
                dateInfo.isToday
                  ? 'bg-red-500 text-white font-medium'
                  : dateInfo.isOtherMonth
                    ? 'text-gray-600'
                    : 'text-gray-200 hover:bg-gray-700 cursor-pointer'
              }`}
          >
            {dateInfo.dayNum}
          </div>
        ))}
      </div>
      {/* Upcoming Events Section */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Upcoming Events</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded mr-3">
              {new Date().getDate() + 2}
            </div>
            <div>
              <p className="text-sm text-white">Team Meeting</p>
              <p className="text-xs text-gray-400">10:00 AM - 11:30 AM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded mr-3">
              {new Date().getDate() + 5}
            </div>
            <div>
              <p className="text-sm text-white">Project Deadline</p>
              <p className="text-xs text-gray-400">All day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
