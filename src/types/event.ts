import { z } from 'zod';

// Event type enum
export const EventType = {
  HACKATHON: 'hackathon',
  WORKSHOP: 'workshop',
  WEBINAR: 'webinar',
  CONFERENCE: 'conference',
  MEETUP: 'meetup',
} as const;

export type EventType = typeof EventType[keyof typeof EventType];

// Event status enum
export const EventStatus = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type EventStatus = typeof EventStatus[keyof typeof EventStatus];

// Event schema
export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200),
  description: z.string().min(50).max(2000),
  type: z.enum([
    EventType.HACKATHON,
    EventType.WORKSHOP,
    EventType.WEBINAR,
    EventType.CONFERENCE,
    EventType.MEETUP,
  ]),
  status: z.enum([
    EventStatus.UPCOMING,
    EventStatus.ONGOING,
    EventStatus.COMPLETED,
    EventStatus.CANCELLED,
  ]),
  startDate: z.date(),
  endDate: z.date(),
  location: z.object({
    type: z.enum(['physical', 'virtual', 'hybrid']),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    virtualLink: z.string().url().optional(),
  }),
  imageUrl: z.string().url(),
  organizer: z.string(), // Reference to User ID
  capacity: z.number().int().min(0).optional(),
  registeredParticipants: z.number().int().min(0).default(0),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).default('USD'),
  tags: z.array(z.string()).optional(),
  schedule: z.array(z.object({
    time: z.string(),
    title: z.string(),
    description: z.string().optional(),
    speaker: z.string().optional(),
  })).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Event = z.infer<typeof eventSchema>;

// Event registration schema
export const eventRegistrationSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  userId: z.string(),
  registeredAt: z.date(),
  status: z.enum(['registered', 'attended', 'cancelled']),
  ticketType: z.string().optional(),
  paymentStatus: z.enum(['pending', 'completed', 'refunded']).optional(),
  paymentId: z.string().optional(),
  notes: z.string().optional(),
});

export type EventRegistration = z.infer<typeof eventRegistrationSchema>;

// Event feedback schema
export const eventFeedbackSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EventFeedback = z.infer<typeof eventFeedbackSchema>; 