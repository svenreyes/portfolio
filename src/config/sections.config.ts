// sections config - ids and labels for nav cards

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
  },
  {
    id: 'about',
    index: '01',
    label: 'About',
  },
  {
    id: 'approach',
    index: '02',
    label: 'Approach',
  },
  {
    id: 'experience',
    index: '03',
    label: 'Experience',
  },
  {
    id: 'projects',
    index: '04',
    label: 'Projects',
  },
  {
    id: 'contact',
    index: '05',
    label: 'Contact',
  },
];

export const getSectionById = (id: string): Section | undefined => {
  return SECTIONS.find((section) => section.id === id);
};

export const getSectionIndex = (id: string): number => {
  return SECTIONS.findIndex((section) => section.id === id);
};
