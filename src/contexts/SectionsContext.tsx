import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Sections, SectionItems } from '../constants';
import type { ISection, ISectionItem } from '../constants';

interface ISectionContextProviderProps {
  children: React.ReactNode;
}

const SectionContext = createContext({} as any);

export const SectionContextProvider = (props: ISectionContextProviderProps) => {
  const { children } = props;

  const [sections, updateSections] = useState<ISection[]>(Sections);
  const [sectionItems, updateSectionItems] = useState<ISectionItem[]>(SectionItems);

  const getSection = (id: number): ISection | undefined => sections.find((section: ISection) => section.id === id);
  const getSectionItems = (id: number): ISectionItem[] | undefined => sectionItems.filter((sectionItem: ISectionItem) => sectionItem.sectionId === id);

  return (
    <SectionContext.Provider value={{ sections, updateSections, sectionItems, updateSectionItems, getSection, getSectionItems }}>{children}</SectionContext.Provider>
  );
};
export default SectionContext;
