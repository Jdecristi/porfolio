import { useContext, useState } from 'react';
import { Drawer, Button, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ISection } from '../../../../constants';
import SectionsContext from '../../../../contexts/SectionsContext';

interface Props {
  scrollTo: (scrollTo: number) => void;
}

export default (props: Props) => {
  const { scrollTo } = props;

  const { sections } = useContext(SectionsContext);

  const [open, updateOpen] = useState<boolean>(false);

  const handleClick = (section: ISection) => {
    updateOpen(false);
    scrollTo(section.scrollTo);
  };

  const styles = {
    list: {
      width: open ? { xs: '75vw', md: '50vw' } : 0,
      height: '100%',
      backgroundColor: '#EFEFEF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'width 250ms ease-in-out',
    },
    listItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  };

  return (
    <>
      <Drawer open={open} onClose={() => updateOpen(false)}>
        <List sx={styles.list}>
          {sections.map((section: ISection, index: number) => (
            <ListItem key={index} sx={styles.listItem}>
              <Button sx={{ width: '100%', fontSize: '20px' }} onClick={() => handleClick(section)}>
                {section.name}
              </Button>
            </ListItem>
          ))}
          <ListItem sx={styles.listItem}>
            <a style={{ width: '100%', textDecoration: 'none' }} href="/jdecristi-resume.pdf" download>
              <Button sx={{ width: '100%', fontSize: '20px' }} variant="red">
                Download Resume
              </Button>
            </a>
          </ListItem>
        </List>
      </Drawer>
      {!open && (
        <Button onClick={() => updateOpen(!open)}>
          <MenuIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, cursor: 'pointer' }} />
        </Button>
      )}
    </>
  );
};
