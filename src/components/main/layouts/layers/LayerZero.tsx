import { useContext, useEffect, useState } from 'react';
import { styled, Box, Typography } from '@mui/material';
import type { ISection, ISectionItem } from '../../../../constants';
import SectionsContext from '../../../../contexts/SectionsContext';

export default () => {
  const { sections, getSection, getSectionItems } = useContext(SectionsContext);

  const [yOffset, updateYOffset] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => updateYOffset(window.pageYOffset);

  const showContent = (minimum: number, maximum: number) => {
    return yOffset >= minimum - window.innerHeight * 0.4 && yOffset <= maximum - window.innerHeight * 0.4 ? 1 : 0;
  };

  return (
    <Container sx={{ transform: 'translateY(' + yOffset * 0.4 + 'px)' }}>
      {sections?.map((section: ISection) => {
        const gridItems = getSectionItems(section.id);
        return gridItems.map((gridItem: ISectionItem, index: number) => (
          <Writing
            key={index}
            variant={gridItem.typography}
            sx={{
              ...gridItem?.sx,
              whiteSpace: 'noWrap',
              top: {
                xs: `calc(${section.scrollTo * 0.6}px + ${gridItem?.placement.top.xs})`,
                sm: `calc(${section.scrollTo * 0.6}px + ${gridItem?.placement.top.sm})`,
                md: `calc(${section.scrollTo * 0.6}px + ${gridItem?.placement.top.md})`,
                lg: `calc(${section.scrollTo * 0.6}px + ${gridItem?.placement.top.lg})`,
                xl: `calc(${section.scrollTo * 0.6}px + ${gridItem?.placement.top.xl})`,
              },
              left: gridItem?.placement.left || undefined,
              right: gridItem?.placement.right || undefined,
              opacity: showContent(section.scrollTo, getSection(section.id + 1)?.scrollTo || 5000),
            }}
          >
            {gridItem?.content}
          </Writing>
        ));
      })}
    </Container>
  );
};

const Container = styled(Box)({
  position: 'relative',
  zIndex: 0,
});

const Writing = styled(Typography)({
  position: 'absolute',
  opacity: 0,
  transition: 'opacity 750ms ease-in-out',
});
