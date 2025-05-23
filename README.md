# Africa Tech Learning Management System (LMS)

This is a comprehensive Learning Management System (LMS) for Africa Tech, built with [Next.js](https://nextjs.org) and TypeScript.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quick Start Guide

### Authentication
```typescript
import { useAuthStore } from '@/lib/zustand';

function LoginButton() {
  const { user, login, logout } = useAuthStore();
  
  // Check if user is logged in
  if (user) {
    return <button onClick={logout}>Logout</button>;
  }
  
  return <button onClick={() => login(email, password)}>Login</button>;
}
```

### Fetching User Data
```typescript
import { useDocumentData } from '@/lib/firebase';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useDocumentData('users', userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Working with Courses
```typescript
import { courseApi } from '@/lib/firebase';
import { useCourses } from '@/hooks';

// Fetch all courses
function CoursesList() {
  const { data: courses, isLoading } = useCourses();
  
  if (isLoading) return <div>Loading courses...</div>;
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Get user's enrolled courses
function EnrolledCourses({ userId }: { userId: string }) {
  const { data: enrollments } = useCollectionData('enrollments', [
    where('userId', '==', userId),
    where('status', '==', 'active')
  ]);
  
  return (
    <div>
      {enrollments.map(enrollment => (
        <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
      ))}
    </div>
  );
}
```

### Data Validation with Zod
```typescript
import { userSchema, courseSchema } from '@/types';

// Validate user data
function createUser(userData: unknown) {
  try {
    const validatedData = userSchema.parse(userData);
    // Data is valid, proceed with creation
    return userApi.create(validatedData);
  } catch (error) {
    // Handle validation errors
    console.error('Invalid user data:', error);
  }
}

// Validate course data
function updateCourse(courseId: string, courseData: unknown) {
  try {
    const validatedData = courseSchema.parse(courseData);
    // Data is valid, proceed with update
    return courseApi.update(courseId, validatedData);
  } catch (error) {
    // Handle validation errors
    console.error('Invalid course data:', error);
  }
}
```

### State Management Examples
```typescript
import { useAuthStore, useCourseStore } from '@/lib/zustand';

// Authentication state
function AuthComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}

// Course state
function CourseComponent() {
  const { selectedCourse, setSelectedCourse, enrolledCourses } = useCourseStore();
  
  return (
    <div>
      <h2>Selected Course: {selectedCourse?.title}</h2>
      <div>
        <h3>Your Enrolled Courses:</h3>
        {enrolledCourses.map(course => (
          <button 
            key={course.id}
            onClick={() => setSelectedCourse(course)}
          >
            {course.title}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Firebase API Examples
```typescript
import { userApi, courseApi, enrollmentApi } from '@/lib/firebase';

// Create a new course
async function createNewCourse(courseData: CourseInput) {
  try {
    const newCourse = await courseApi.create(courseData);
    console.log('Course created:', newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
  }
}

// Get instructor's courses
function InstructorCourses({ instructorId }: { instructorId: string }) {
  const { data: courses } = courseApi.getByInstructor(instructorId);
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Enroll in a course
async function enrollInCourse(userId: string, courseId: string) {
  try {
    const enrollment = await enrollmentApi.create({
      userId,
      courseId,
      status: 'active',
      enrolledAt: new Date()
    });
    console.log('Enrolled successfully:', enrollment);
  } catch (error) {
    console.error('Error enrolling in course:', error);
  }
}
```

### React Query Examples

Here are some examples of using React Query with our Firebase API:

```typescript
// Example 1: Fetching and managing courses
function CourseList() {
  const { courses, enrolledCourses, isLoading } = useCourses();
  
  if (isLoading) return <div>Loading courses...</div>;
  
  return (
    <div>
      <h2>All Courses</h2>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {enrolledCourses?.some(ec => ec.id === course.id) && (
            <span>Enrolled</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Example 2: Managing user enrollments
function EnrollmentManager() {
  const { enrollments, userEnrollments, createEnrollment, deleteEnrollment } = useEnrollments();
  
  const handleEnroll = async (courseId: string) => {
    await createEnrollment({
      userId: user.id,
      courseId,
      status: 'active',
      enrolledAt: new Date(),
      lastAccessedAt: new Date(),
      progress: {
        percentage: 0,
        completedLessons: []
      }
    });
  };
  
  return (
    <div>
      <h2>My Enrollments</h2>
      {userEnrollments?.map(enrollment => (
        <div key={enrollment.id}>
          <span>Course: {enrollment.courseId}</span>
          <span>Progress: {enrollment.progress.percentage}%</span>
          <button onClick={() => deleteEnrollment(enrollment.id)}>
            Cancel Enrollment
          </button>
        </div>
      ))}
    </div>
  );
}

// Example 3: User authentication and profile management
function UserProfile() {
  const { user, login, logout, isLoading } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };
  
  if (isLoading) return <div>Loading profile...</div>;
  
  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}
```

Key features of our React Query implementation:

1. **Type Safety**: All queries and mutations are fully typed with TypeScript
2. **Automatic Caching**: React Query handles caching and revalidation
3. **Optimistic Updates**: Mutations can be configured for optimistic updates
4. **Error Handling**: Built-in error states and retry logic
5. **Loading States**: Easy access to loading states for better UX
6. **Store Integration**: Automatic synchronization with Zustand stores
7. **Query Invalidation**: Automatic cache invalidation on mutations

## Project Architecture

### Tech Stack
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - @heroui for accessible UI components (modals, dropdowns)
  - @heroicons/react for icons
- **State Management**: Zustand
- **Database**: Firebase Firestore
- **Data Validation**: Zod
- **API Integration**: React Query

### Directory Structure
- `/src`: Main source code
  - `/api`: API client and service functions
  - `/components`: Reusable UI components
    - `/home`: Homepage-specific components
    - `/layout`: Layout components (Navbar, Footer)
    - `/modals`: Modal components (Login, Signup)
  - `/constants`: Application constants
  - `/hooks`: Custom React hooks
  - `/lib`: Core utilities and configurations
    - `/firebase`: Firebase configuration and API
    - `/zustand`: State management stores
    - `/utils`: Helper functions and utilities
  - `/pages`: Next.js page components
  - `/styles`: Global styles and Tailwind configuration
  - `/types`: TypeScript type definitions and Zod schemas

## Data Management

### Type System and Validation
The application uses Zod for runtime type validation and TypeScript for static type checking. All data models are defined in `/src/types`:

```typescript
// Example usage of types and schemas
import { User, userSchema } from '@/types';

// TypeScript type
const user: User = {
  id: '123',
  email: 'user@example.com',
  // ...
};

// Zod validation
const validatedUser = userSchema.parse(user);
```

### Firebase Integration
Firebase is used for data storage and real-time updates. The Firebase configuration and API utilities are located in `/src/lib/firebase`:

```typescript
// Example usage of Firebase API
import { userApi } from '@/lib/firebase';

// Create a new user
const newUser = await userApi.create({
  email: 'user@example.com',
  // ...
});

// Get user data with real-time updates
const { data: user, loading } = userApi.get('userId');
```

### State Management with Zustand
Zustand stores are used for global state management. Stores are located in `/src/lib/zustand`:

```typescript
// Example usage of Zustand store
import { useAuthStore } from '@/lib/zustand';

function Component() {
  const { user, login, logout } = useAuthStore();
  
  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Data Fetching
React Query is used for data fetching and caching. Custom hooks are available in `/src/hooks`:

```typescript
// Example usage of data fetching hook
import { useCourses } from '@/hooks';

function CoursesList() {
  const { data: courses, isLoading } = useCourses();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

## Development Guidelines

### TypeScript Path Aliases
The project uses TypeScript path aliases for cleaner imports. Always use the `@/` prefix instead of relative paths:

```typescript
// Good
import { Component } from '@/components/Component';

// Avoid
import { Component } from '../../components/Component';
```

### Component Development
1. Create new components in the appropriate directory
2. Define TypeScript interfaces for all component props
3. Follow the existing styling patterns with Tailwind CSS
4. Ensure components are responsive (mobile-first approach)
5. Use Zustand stores for global state
6. Implement data fetching using React Query hooks

### Styling
- Use Tailwind CSS classes for styling
- For the brand color scheme, use:
  - Primary red: #E7343A (for buttons and highlights)
  - Dark background: black (for main background)

### State Management
- Use Zustand stores for global state
- Use React hooks for local component state
- Custom hooks are available in the `/hooks` directory:
  - `useScrollPosition`: Track scroll position
  - `useLocalStorage`: Persist data in localStorage
  - `useCourses`: Fetch and manage courses data
  - `useEvents`: Fetch and manage events data

### Data Validation
- Always validate data using Zod schemas before sending to Firebase
- Use TypeScript types for static type checking
- Example validation:

```typescript
import { userSchema } from '@/types';

function createUser(data: unknown) {
  try {
    const validatedData = userSchema.parse(data);
    // Proceed with validated data
  } catch (error) {
    // Handle validation error
  }
}
```

### Firebase Best Practices
1. Always use the provided API utilities in `/src/lib/firebase`
2. Implement proper error handling
3. Use real-time listeners when needed
4. Follow security rules and data structure guidelines

## Component Structure

### Layout Components
- **Navbar**: Navigation bar with responsive design, includes login/signup modals
- **Footer**: Site footer with navigation links and contact information

### Home Page Components
- **HeroSection**: Main banner with CTA buttons and image (two-column grid layout)
- **DealsSection**: Highlights special offers using custom card components
- **PopularCoursesSection**: Displays course cards in a grid layout
- **WhyChooseUsSection**: Features section with icons and explanations
- **FAQSection**: Collapsible FAQ items

### Pages
- **Home**: Main landing page
- **Happenings**: Events and updates page with:
  - Hero section
  - Partners section
  - Upcoming Events section
  - Other Updates section (Update cards and X Feeds)

### Authentication
- **LoginModal**: Popup modal with email/username and password fields
- **SignUpModal**: Registration modal with email, full name, and password fields

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HeroUI](https://www.heroui.com/docs/guide/introduction)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Zod Documentation](https://zod.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)

## Deployment

The application is configured for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
