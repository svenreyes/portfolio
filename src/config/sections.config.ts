/**
 * Section Configuration
 * Single source of truth for all portfolio sections
 */

export interface Section {
  id: string;
  index: string;
  label: string;
  description?: string;
}

export const SECTIONS: Section[] = [
  {
    id: 'hero',
    index: '00',
    label: 'Sven Reyes',
    description: 'Software Engineer',
  },
  {
    id: 'welcome',
    index: '01',
    label: 'Welcome',
    description: 'About me',
  },
  {
    id: 'approach',
    index: '02',
    label: 'Approach',
    description: 'How I work',
  },
  {
    id: 'work',
    index: '03',
    label: 'Work',
    description: 'Experience',
  },
  {
    id: 'projects',
    index: '04',
    label: 'Projects',
    description: 'Selected work',
  },
  {
    id: 'contact',
    index: '05',
    label: 'Contact',
    description: 'Get in touch',
  },
  {
    id: 'resume',
    index: '06',
    label: 'Resume',
    description: 'Download CV',
  },
];

// Helper to get section by id
export const getSectionById = (id: string): Section | undefined => {
  return SECTIONS.find((section) => section.id === id);
};

// Helper to get section index
export const getSectionIndex = (id: string): number => {
  return SECTIONS.findIndex((section) => section.id === id);
};
