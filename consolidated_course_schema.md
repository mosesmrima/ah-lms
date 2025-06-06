```markdown
# Consolidated Course Schema

This document outlines the consolidated course schema derived from analyzing various frontend components and the core type definition.

## I. Core Course Schema (`src/types/course.ts`)

This is the primary schema definition for a course.

**`Course` Fields:**

*   `id`: `z.string()` - Unique identifier for the course.
*   `title`: `z.string().min(3).max(200)` - Title of the course.
*   `slug`: `z.string().min(3).max(200)` - URL-friendly slug for the course.
*   `description`: `z.string().min(50).max(2000)` - Detailed description of the course.
*   `shortDescription`: `z.string().max(200)` - A brief summary of the course.
*   `instructor`: `z.string()` - Reference to User ID of the instructor.
*   `category`: `z.enum([...])` - Category of the course (e.g., `WEB3`, `BLOCKCHAIN`). See `CourseCategory` enum.
*   `level`: `z.enum([...])` - Difficulty level of the course (e.g., `BEGINNER`, `INTERMEDIATE`). See `CourseLevel` enum.
*   `status`: `z.enum([...])` - Publication status of the course (e.g., `DRAFT`, `PUBLISHED`). See `CourseStatus` enum.
*   `thumbnailUrl`: `z.string().url()` - URL of the course thumbnail image.
*   `price`: `z.number().min(0)` - Price of the course.
*   `currency`: `z.string().length(3).default('USD')` - Currency code for the price (e.g., USD).
*   `lessons`: `z.array(lessonSchema)` - An array of lessons belonging to the course.
*   `enrolledStudents`: `z.number().int().min(0).default(0)` - Number of students enrolled.
*   `rating`: `z.number().min(0).max(5).default(0)` - Average rating of the course.
*   `totalRatings`: `z.number().int().min(0).default(0)` - Total number of ratings received.
*   `requirements`: `z.array(z.string()).optional()` - List of prerequisites for the course.
*   `objectives`: `z.array(z.string()).optional()` - Learning objectives for the course.
*   `tags`: `z.array(z.string()).optional()` - Tags associated with the course for discoverability.
*   `createdAt`: `z.date()` - Date of course creation.
*   `updatedAt`: `z.date()` - Date of last update.
*   `publishedAt`: `z.date().optional()` - Date when the course was published.

**`Lesson` Fields (part of `courseSchema`):**

*   `id`: `z.string()` - Unique identifier for the lesson.
*   `title`: `z.string().min(3).max(200)` - Title of the lesson.
*   `description`: `z.string().max(1000)` - Description of the lesson content.
*   `videoUrl`: `z.string().url()` - URL of the lesson video.
*   `thumbnailUrl`: `z.string().url().optional()` - URL of the lesson thumbnail.
*   `duration`: `z.string()` - Duration of the lesson in "HH:MM:SS" format.
*   `order`: `z.number().int().min(0)` - Order of the lesson within the course.
*   `courseId`: `z.string()` - ID of the course this lesson belongs to.
*   `isPreview`: `z.boolean().default(false)` - Whether the lesson is available as a free preview.
*   `resources`: `z.array(z.object({...})).optional()` - Optional array of learning resources.
    *   `id`: `z.string()`
    *   `name`: `z.string()`
    *   `type`: `z.string()`
    *   `url`: `z.string().url()`
    *   `size`: `z.number().optional()`
*   `createdAt`: `z.date()` - Date of lesson creation.
*   `updatedAt`: `z.date()` - Date of last update.

---

## II. Component-Specific & Derived Fields

These fields are used in specific frontend components. Some are direct subsets or transformations of the core schema, while others are purely for UI presentation or local component state.

### 1. `src/components/courses/CourseCard.tsx`

**`CourseCardProps` Fields:**

*   `title`: `string`
    *   **Mapping:** Directly maps to `Course.title`.
*   `image`: `string`
    *   **Mapping:** Directly maps to `Course.thumbnailUrl`.
*   `author`: `string`
    *   **Mapping:** Likely maps to a fetched instructor name using `Course.instructor` (which is a User ID). This is a derived field.
*   `authorAvatar`: `string`
    *   **Mapping:** Likely maps to a fetched instructor avatar URL using `Course.instructor`. This is a derived field.
*   `index`: `number?`
    *   **Mapping:** Frontend-specific. Used for determining `priority` for image loading. Not part of the core schema.
*   `priority`: `boolean?`
    *   **Mapping:** Frontend-specific. Used for image loading optimization. Not part of the core schema.

### 2. `src/app/courses/[slug]/page.tsx`

This page uses mock data (`courseData`) and defines local types for its curriculum display.

**`courseData` (Mock Data) Fields:**

*   `title`: `string`
    *   **Mapping:** Maps to `Course.title`.
*   `category`: `string` (e.g., "Security > Cyber Security")
    *   **Mapping:** This is a presentational string. The core `Course.category` is an enum. This is a derived/formatted field.
*   `description`: `string`
    *   **Mapping:** Maps to `Course.shortDescription` or a truncated version of `Course.description`.
*   `instructor`: `object`
    *   `name`: `string`
        *   **Mapping:** Derived. Corresponds to the name of the user referenced by `Course.instructor`.
    *   `image`: `string`
        *   **Mapping:** Derived. Corresponds to the avatar of the user referenced by `Course.instructor`.
*   `stats`: `object`
    *   `lectures`: `number`
        *   **Mapping:** Derived. Likely calculated from `Course.lessons.length`.
    *   `quizzes`: `number`
        *   **Mapping:** Frontend-specific or potentially a new field. The core schema does not explicitly list a quiz count at the course level, though quizzes might be a type of lesson or a separate feature.
    *   `duration`: `string` (e.g., "English")
        *   **Mapping:** This seems to represent language, not total course duration. The core schema has `Lesson.duration`. A total course duration would be a derived field by summing lesson durations. If this is language, it's a new field.
*   `includes`: `string[]` (e.g., "10.5 hours on-demand video", "Certificate of completion")
    *   **Mapping:** Frontend-specific. These are marketing points. Some might be derived (e.g., total video hours from sum of `Lesson.duration`), others are general statements.
*   `requirements`: `string[]`
    *   **Mapping:** Directly maps to `Course.requirements`.
*   `description_full`: `string`
    *   **Mapping:** Maps to `Course.description`.
*   `highlights`: `string[]`
    *   **Mapping:** Frontend-specific marketing/feature list. Not in the core schema.
*   `relatedCourses`: `Array` of objects with `id`, `title`, `author`, `authorAvatar`, `image`.
    *   **Mapping:** These are simplified `CourseCardProps`-like structures for related courses. `author` and `authorAvatar` are derived. `image` maps to `Course.thumbnailUrl`.
*   `whatYouWillLearn`: `string[]`
    *   **Mapping:** Maps to `Course.objectives`. The naming is different but the intent is similar.

**Local `Lecture` Interface (within `CurriculumAccordion` and `CurriculumSection`):**

*   `title`: `string`
    *   **Mapping:** Maps to `Lesson.title`.
*   `preview`: `boolean?`
    *   **Mapping:** Maps to `Lesson.isPreview`.
*   `duration`: `string` (e.g., "3:43")
    *   **Mapping:** Maps to `Lesson.duration`. The format might be slightly different (core is "HH:MM:SS").

**Local `CurriculumSection` Interface (within `CurriculumAccordion` and `CurriculumSection`):**

*   `title`: `string`
    *   **Mapping:** This represents a grouping of lessons. This concept is not explicitly in the core `Course` schema as a separate entity but could be implicitly derived if lessons have a "section" or "module" property.
*   `lectures`: `Lecture[]`
    *   **Mapping:** An array of the local `Lecture` interface, derived from `Course.lessons`.
*   `meta`: `string` (e.g., "7 Lectures • 86 Min")
    *   **Mapping:** Derived, frontend-specific string. Calculated from the lectures within the section (count and sum of durations).

### 3. `src/components/courses/LessonsList.tsx`

**`Lesson` Interface (Local to `LessonsList`):**

*   `id`: `string`
    *   **Mapping:** Directly maps to `Lesson.id` from the core schema.
*   `title`: `string`
    *   **Mapping:** Directly maps to `Lesson.title` from the core schema.
*   `duration`: `string`
    *   **Mapping:** Directly maps to `Lesson.duration` from the core schema.
*   `status`: `'completed' | 'current' | 'upcoming'`
    *   **Mapping:** Frontend-specific UI state. This would likely be derived based on user progress data (e.g., `CourseEnrollment.completedLessons` from `src/types/course.ts`) and the current lesson being viewed. Not part of the core `Lesson` schema itself.

### 4. `src/components/courses/tabs/OverviewTab.tsx`

This component uses its own internal mock `course` object.

**Internal `course` Object Fields:**

*   `whatYouWillLearn`: `string[]`
    *   **Mapping:** Corresponds to `Course.objectives`.
*   `requirements`: `string[]`
    *   **Mapping:** Corresponds to `Course.requirements`.
*   `description_full`: `string`
    *   **Mapping:** Corresponds to `Course.description`.

---

## III. Summary of Discrepancies and Potential Additions

*   **Instructor Information:** Multiple components use `instructor.name` and `instructor.image`/`authorAvatar`. The core `Course.instructor` is just an ID. This implies a need to fetch and join user data for display.
*   **Course Statistics:**
    *   `lectures` count (in `courseData.stats`): Easily derived from `Course.lessons.length`.
    *   `quizzes` count (in `courseData.stats`): This suggests quizzes might be a distinct content type or a special type of lesson. The core schema doesn't explicitly account for quizzes separately at the course level.
    *   Total course `duration` (e.g. "10.5 hours on-demand video" in `courseData.includes`): This would be derived by summing the durations of all `Lesson` objects in `Course.lessons`. The `Lesson.duration` is "HH:MM:SS", so conversion/formatting would be needed.
    *   Language (e.g. "English" in `courseData.stats.duration`): This field is missing from the core schema and might be a useful addition.
*   **Curriculum Sections:** `src/app/courses/[slug]/page.tsx` uses a `CurriculumSection` concept to group lessons. The core `Course` schema stores lessons as a flat array. To implement sections, lessons might need an additional `sectionId` or `module` property, or sections could be defined as a separate schema related to a course. The `meta` field (e.g., "7 Lectures • 86 Min") is a derived display string.
*   **Lesson Status:** `LessonsList.tsx` uses a `status` field ('completed', 'current', 'upcoming') for lessons. This is UI state derived from user progress, typically stored in a `CourseEnrollment` record (as seen in `src/types/course.ts` with `completedLessons`).
*   **Marketing/UI Fields:** Fields like `highlights`, `includes` (from `courseData`), and `CourseCardProps.index`/`priority` are primarily for frontend presentation and marketing and are not part of the core data model.
*   **Category Display:** `courseData.category` ("Security > Cyber Security") is a formatted string, while `Course.category` is an enum. This implies a mapping or formatting layer for display.

This consolidated view should help in refining the backend schema and understanding data flow to the frontend components.
```
