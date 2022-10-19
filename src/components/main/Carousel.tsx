import { useEffect, useRef, useState } from 'react';
import { styled, Box, Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useBreakpoint } from '../../hooks';
import { range } from '../../helpers/HelperFunctions';

interface Props {
  children: React.ReactNode[];
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  gap: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  numberShown?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export default (props: Props) => {
  const { children } = props;
  const width = useBreakpoint(props.width);
  const gap = useBreakpoint(props.gap);
  const numberShown = useBreakpoint(props.numberShown) as number;

  const [selectedItems, updateSelectedItems] = useState<number[]>([0]);

  const carouselRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (numberShown == 1) return;
    updateSelectedItems(range(0, numberShown - 1));
  }, []);

  const selectItems = (index: number) => {
    const updatedSelectedItems = (() => {
      if (numberShown == 1) return [index];
      if (index >= children.length - numberShown) return range(children.length - numberShown, children.length - 1);
      return range(index, index + (numberShown - 1));
    })();

    if (updatedSelectedItems.includes(-1) || updatedSelectedItems.includes(children.length)) return;

    const childWidth = carouselRef!.current!.firstElementChild!.clientWidth;
    carouselRef!.current!.style.transform = `translateX(calc(-${childWidth}px * ${updatedSelectedItems[0]}))`;
    updateSelectedItems(updatedSelectedItems);
  };

  return (
    <Container width={width}>
      <Carousel width={`calc((100% / ${numberShown} * ${children.length}))`} ref={carouselRef}>
        {children.map((child, index) => (
          <Child key={index} px={`calc(${gap} / 2)`}>
            {child}
          </Child>
        ))}
      </Carousel>
      {!(numberShown === children.length) && (
        <Buttons gap={{ xs: '15px', md: '20px' }}>
          <SlideLeft
            sx={selectedItems.includes(0) ? { opacity: 0, cursor: 'auto' } : { opacity: 1, cursor: 'pointer' }}
            onClick={() => selectItems(selectedItems[0] - 1)}
          />
          {children.map((c, index) => (
            <Button key={index} sx={{ transform: selectedItems.includes(index) ? 'scale(1.25)' : '' }} onClick={() => selectItems(index)} />
          ))}
          <SlideRight
            sx={selectedItems.includes(children.length - 1) ? { opacity: 0, cursor: 'auto' } : { opacity: 1, cursor: 'pointer' }}
            onClick={() => selectItems(selectedItems[0] + 1)}
          />
        </Buttons>
      )}
    </Container>
  );
};

const Container = styled(Box)({
  overflow: 'hidden',
});

const Carousel = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  transition: 'transform 500ms ease-in-out',
});

const Child = styled(Box)({
  width: '100%',
});

const Buttons = styled(Stack)({
  width: '100%',
  marginTop: '10px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const Button = styled(Box)({
  cursor: 'pointer',
  height: '10px',
  aspectRatio: '1 / 1',
  backgroundColor: '#333333',
  borderRadius: '50%',
  transition: 'transform 500ms ease-in-out',
});

const SlideLeft = styled(ArrowBackIosIcon)({
  cursor: 'pointer',
  height: '30px',
  color: '#333333',
});

const SlideRight = styled(ArrowForwardIosIcon)({
  cursor: 'pointer',
  height: '30px',
  color: '#333333',
});
