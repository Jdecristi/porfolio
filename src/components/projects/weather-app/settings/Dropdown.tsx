//Imports
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

interface Props {
   darkMode?: boolean;
   items: string[];
   selected: string;
   updateSelected: (selected: string) => void;
}

const Dropdown: React.FC<Props> = (props) => {
   const { darkMode, items, selected, updateSelected } = props;

   const [open, updateOpen] = useState<boolean>(false);

   return (
      <>
         <div className="container">
            <Button onClick={() => updateOpen(!open)}>{selected.toUpperCase()}</Button>
            {open ? (
               <Box
                  sx={{
                     width: '8em',
                     padding: '0.5em',
                     color: '#333333',
                     bgcolor: 'primary.main',
                     borderRadius: '5px',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '0.5em',
                     alignItems: 'flex-start',
                     position: 'absolute',
                     bottom: '3.5rem',
                  }}
               >
                  {items.map((item) => (
                     <Button
                        key={items.indexOf(item)}
                        sx={{ width: '100%' }}
                        onClick={() => {
                           updateSelected(item);
                           updateOpen(!open);
                        }}
                     >
                        {item.toUpperCase()}
                     </Button>
                  ))}
               </Box>
            ) : null}
         </div>
         <style jsx>
            {`
               .dropdown-btn,
               .list-item {
                  background-color: #${!darkMode ? '555555' : 'DDDDDD'};
                  color: #${!darkMode ? 'FFFFFF' : '333333'};
                  border: none;
                  border-radius: 0.25em;
                  height: 2.5em;
                  font-size: 0.75em;
                  cursor: pointer;
               }
               .dropdown-btn {
                  padding: 0 1em;
               }

               .dropdown-btn:hover,
               .list-item:hover {
                  background-color: #${!darkMode ? '666666' : 'CCCCCC'};
               }

               .dropdown-container {
                  width: 8em;
                  padding: 0.5em;
                  color: #${!darkMode ? 'FFFFFF' : '333333'};
                  background-color: #${!darkMode ? '333333' : 'EEEEEE'};
                  border-radius: 0.25em;
                  display: flex;
                  flex-direction: column;
                  gap: 0.5em;
                  align-items: flex-start;
                  position: absolute;
                  bottom: 3.5em;
               }

               .list-item {
                  width: 100%;
                  padding: 0.75em;
                  list-style-type: none;
               }
            `}
         </style>
      </>
   );
};
export default Dropdown;
