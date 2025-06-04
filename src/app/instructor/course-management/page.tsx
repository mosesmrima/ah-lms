"use client";
import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import CourseCard from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/Button';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import type { Course } from '@/types/course';
import { CourseCategory, CourseLevel, CourseStatus } from '@/types/course';

const emptyCourse: Omit<Course, 'id'> = {
  title: '',
  slug: '',
  description: '',
  shortDescription: '',
  instructor: '',
  category: CourseCategory.TECHNOLOGY,
  level: CourseLevel.BEGINNER,
  status: CourseStatus.DRAFT,
  thumbnailUrl: '',
  price: 0,
  currency: 'USD',
  lessons: [],
  enrolledStudents: 0,
  rating: 0,
  totalRatings: 0,
  requirements: [],
  objectives: [],
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function CourseManagementPage() {
  const { courses, createCourse, updateCourse, deleteCourse, isCreating, isUpdating, isDeleting } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>("add");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers
  const openAddModal = () => {
    setModalMode('add');
    setSelectedCourse(null);
    setIsModalOpen(true);
  };
  const openEditModal = (course: Course) => {
    setModalMode('edit');
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);

  // Form state
  const [form, setForm] = useState<Omit<Course, 'id'>>(emptyCourse);
  React.useEffect(() => {
    setForm(modalMode === 'edit' && selectedCourse ? selectedCourse : emptyCourse);
  }, [modalMode, selectedCourse, isModalOpen]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Update slug when title changes
      ...(name === 'title' ? { slug: value.toLowerCase().replace(/\s+/g, '-') } : {}),
      // Update timestamps
      updatedAt: new Date()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      ...form,
      createdAt: modalMode === 'add' ? new Date() : form.createdAt,
      updatedAt: new Date()
    };
    
    if (modalMode === 'add') {
      createCourse(courseData);
    } else if (modalMode === 'edit' && selectedCourse) {
      updateCourse({ id: selectedCourse.id, data: courseData });
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) deleteCourse(deleteId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Courses</h1>
        <Button customVariant="primary" onClick={openAddModal}>Add New Course</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">No courses found.</div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="flex flex-col">
              <CourseCard
                title={course.title}
                description={course.description}
                modules={course.lessons?.length || 0}
                duration="0h 0m"
                imageUrl={course.thumbnailUrl}
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm" customVariant="secondary" onClick={() => openEditModal(course)}>Edit</Button>
                <Button size="sm" customVariant="primary" onClick={() => openDeleteModal(course.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} backdrop="blur" placement="center">
        <ModalContent className="p-0 w-full max-w-md">
          {() => (
            <>
              <ModalHeader className="text-center text-2xl font-medium leading-6 text-white mb-0 p-6 pb-0">
                {modalMode === 'add' ? 'Add New Course' : 'Edit Course'}
              </ModalHeader>
              <ModalBody className="p-6 pt-3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="text"
                    name="thumbnailUrl"
                    placeholder="Thumbnail URL"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={form.thumbnailUrl}
                    onChange={handleFormChange}
                  />
                  <Button type="submit" customVariant="primary" fullWidth disabled={isCreating || isUpdating}>
                    {modalMode === 'add' ? (isCreating ? 'Creating...' : 'Create') : (isUpdating ? 'Updating...' : 'Update')}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} backdrop="blur" placement="center">
        <ModalContent className="p-0 w-full max-w-md">
          {() => (
            <>
              <ModalHeader className="text-center text-2xl font-medium leading-6 text-white mb-0 p-6 pb-0">
                Delete Course
              </ModalHeader>
              <ModalBody className="p-6 pt-3">
                <div className="mb-4 text-white">Are you sure you want to delete this course?</div>
                <div className="flex gap-4">
                  <Button customVariant="primary" onClick={handleDelete} fullWidth disabled={isDeleting}>Delete</Button>
                  <Button customVariant="secondary" onClick={handleDeleteModalClose} fullWidth>Cancel</Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
} 