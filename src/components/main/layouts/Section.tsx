import { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import SectionContext from '../../../contexts/SectionsContext';
import { ISection } from '../../../constants';

type Props = {
  children: React.ReactNode;
  id: number;
};

export default (props: Props) => {
  const { children, id } = props;

  const { sections, updateSections, getSection } = useContext(SectionContext);

  const [screenWidth, updateScreenWidth] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>();
  const initialLoad = useRef<boolean>(false);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;

      updateScreenWidth(window.innerWidth);
      window.addEventListener('resize', resize);
    }

    if (sectionRef.current) {
      const section = getSection(id);
      const sectionIndex = sections.indexOf(section);
      const updatedSection = updateSectionScrollTo(section, sectionRef.current.getBoundingClientRect().y);
      const updatedSections = updateSectionsScrollTo(sections, sectionIndex, updatedSection);

      updateSections(updatedSections);
    }

    return () => window.removeEventListener('resize', resize);
  }, [screenWidth]);

  const resize = () => {
    let id: any;

    (() => {
      if (id) clearTimeout(id);

      id = setTimeout(() => updateScreenWidth(window.innerWidth), 10);
    })();
  };

  const updateSectionScrollTo = (section: ISection, scrollTo: number) => {
    section.scrollTo = scrollTo;
    return section;
  };

  const updateSectionsScrollTo = (sections: ISection[], index: number, section: ISection) => {
    sections[index] = section;
    return sections;
  };

  return (
    <Box width="100%" sx={{ my: '5px', position: 'relative' }} ref={sectionRef}>
      {children}
    </Box>
  );
};
