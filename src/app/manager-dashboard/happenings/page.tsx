'use client';

import React, { useState } from 'react';
import { CalendarIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import StatCard from '@/components/analytics/StatCard';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'workshop' | 'webinar' | 'conference' | 'other';
}

const HappeningsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  // Calculate event statistics
  const calculateStats = (eventList: Event[]) => {
    const now = new Date();
    const upcomingEvents = eventList.filter(e => new Date(e.date) > now);
    const pastEvents = eventList.filter(e => new Date(e.date) <= now);
    
    const participantCount = 328; // This would be dynamic in a real app
    const workshopsCount = eventList.filter(e => e.type === 'workshop').length;
    const webinarsCount = eventList.filter(e => e.type === 'webinar').length;
    const averageAttendance = 42; // This would be calculated from actual data
    
    return {
      upcoming: upcomingEvents.length,
      past: pastEvents.length,
      total: eventList.length,
      participants: participantCount,
      workshops: workshopsCount,
      webinars: webinarsCount,
      averageAttendance
    };
  };

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Introduction to Cloud Computing',
      date: '2025-06-15',
      time: '14:00',
      location: 'Online',
      description: 'Learn the fundamentals of cloud computing and how it can benefit your organization.',
      type: 'webinar'
    },
    {
      id: '2',
      title: 'Cybersecurity Workshop',
      date: '2025-06-22',
      time: '10:00',
      location: 'Tech Hub, Nairobi',
      description: 'Hands-on workshop covering the latest security practices and threat prevention.',
      type: 'workshop'
    },
    {
      id: '3',
      title: 'Africa Tech Summit',
      date: '2025-07-10',
      time: '09:00',
      location: 'Convention Center, Lagos',
      description: 'Annual tech summit featuring speakers from across the continent.',
      type: 'conference'
    }
  ]);

  const handleAddEdit = (event: Event | null) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleSave = (event: Event) => {
    if (event.id) {
      // Edit existing event
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      // Add new event
      const newId = Math.max(...events.map(e => parseInt(e.id)), 0) + 1;
      setEvents([...events, { ...event, id: newId.toString() }]);
    }
    setShowModal(false);
  };

  const getEventTypeClass = (type: string) => {
    switch(type) {
      case 'workshop': return 'bg-blue-500';
      case 'webinar': return 'bg-purple-500';
      case 'conference': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#1a1a1a]">
              <CalendarIcon className="h-6 w-6 text-[#4a148c]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Academy Happenings</h1>
          </div>
          <button 
            onClick={() => handleAddEdit(null)}
            className="bg-[#E7343A] hover:bg-[#d62e33] text-white font-semibold py-2.5 px-6 rounded-lg text-sm sm:text-base transition-colors duration-200 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Event
          </button>
        </div>
        <p className="mt-2 text-gray-400 text-sm">Manage academy events, workshops, and webinars</p>
      </div>

      {/* Event Statistics */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            value={calculateStats(events).upcoming.toString()} 
            label="Upcoming Events"
            trend="up"
            trendValue="8%"
            insight="2 events scheduled next week"
            className="border-l-2 border-green-500"
          />
          <StatCard 
            value={calculateStats(events).participants.toString()} 
            label="Total Participants"
            trend="up"
            trendValue="12%"
            insight="42 average per event"
            className="border-l-2 border-green-500"
          />
          <StatCard 
            value={`${calculateStats(events).workshops}/${calculateStats(events).total}`} 
            label="Workshops"
            insight="Most popular event format"
            className="border-l-2 border-purple-500"
          />
          <StatCard 
            value={`${calculateStats(events).averageAttendance}%`} 
            label="Avg. Attendance Rate"
            trend="down"
            trendValue="3%"
            insight="Online events show 8% higher attendance"
            className="border-l-2 border-red-500"
          />
        </div>
      </div>

      {/* Event Filters */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-1">Event Type</label>
            <select className="bg-[#222] text-white rounded-lg border border-gray-700 px-4 py-2 w-full">
              <option value="">All Types</option>
              <option value="workshop">Workshops</option>
              <option value="webinar">Webinars</option>
              <option value="conference">Conferences</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-1">Date Range</label>
            <select className="bg-[#222] text-white rounded-lg border border-gray-700 px-4 py-2 w-full">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
              <option value="all">All Events</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
            <select className="bg-[#222] text-white rounded-lg border border-gray-700 px-4 py-2 w-full">
              <option value="">All Locations</option>
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-[#1a1a1a] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="bg-[#222] rounded-lg p-5 flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-[#333] flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{new Date(event.date).getDate()}</span>
                    <span className="text-xs text-gray-400">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getEventTypeClass(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(event.date)} at {event.time}</span>
                        <span className="text-xs text-gray-400">{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{event.description}</p>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <button 
                        onClick={() => handleAddEdit(event)}
                        className="p-2 rounded-lg bg-[#333] hover:bg-[#E7343A] text-gray-300 transition-colors"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="p-2 rounded-lg bg-[#333] hover:bg-red-900 text-gray-300 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No events found. Create a new event to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showModal && (
        <EventModal 
          event={currentEvent} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onSave: (event: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState<Event>({
    id: event?.id || '',
    title: event?.title || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || '',
    type: event?.type || 'webinar'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
      <div className="relative bg-[#1a1a1a] rounded-xl p-6 max-w-2xl w-full mx-4">
        <h2 className="text-xl font-semibold text-white mb-6">
          {event ? 'Edit Event' : 'Create New Event'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Online or physical location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                >
                  <option value="webinar">Webinar</option>
                  <option value="workshop">Workshop</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                placeholder="Enter event description"
                required
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E7343A] hover:bg-[#d62e33] text-white rounded-lg transition-colors"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HappeningsPage;
