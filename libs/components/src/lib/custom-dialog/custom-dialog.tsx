import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  DialogProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* eslint-disable-next-line */
export interface CustomDialogProps extends DialogProps {
  children: React.ReactNode;
  handleClose: () => void;
}

export function CustomDialog({
  children,
  handleClose,
  ...props
}: CustomDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { title } = props;

  return (
    <Dialog
      {...props}
      aria-labelledby={props["aria-labelledby"]}
      fullScreen={fullScreen}
      scroll="body"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">{title}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      {children}
    </Dialog>
  );
}

export default CustomDialog;
