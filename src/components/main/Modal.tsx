import { styled, Paper, Container, Stack, Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  children: { header?: React.ReactNode; body: React.ReactNode; footer?: React.ReactNode };
  open: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closed: () => void;
}

export default (props: Props) => {
  const { children, open, size = 'lg', closed } = props;

  return (
    <Modal open={open}>
      <ModalContainer maxWidth={size}>
        <StyledPaper>
          <Header>
            {children?.header}
            <CloseButton size="small" onClick={closed}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <ModalContent>
            <Box>{children?.body}</Box>
            <Box>{children?.footer}</Box>
          </ModalContent>
        </StyledPaper>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(Container)({
  position: 'absolute',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
});

const StyledPaper = styled(Paper)({
  fontFamily: 'Roboto',
  padding: '5% 5% 0 5%',
  position: 'relative',
});

const Header = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CloseButton = styled(Button)({
  paddingLeft: '20px',
  width: '30px',
  minWidth: '30px',
  cursor: 'pointer',
});

const ModalContent = styled(Box)({
  maxHeight: '70vh',
  overflow: 'scroll',
  paddingBottom: '10%',
});
