import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { ChangeEvent, ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface BuyInputSectionProps {
  topLeftLabel: string;
  topLeftValue?: string;
  topRightLabel?: string;
  topRightValue?: string;
  onClickTopRightLabel?: () => void;
  inputValue?: number | string;
  onInputValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickMax?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showMaxButton?: boolean;
  staticInput?: boolean;
  children?: ReactNode;
  onSelectToken?: (tokenAddress: string) => void;
}

const commonPropsPaper = {
  elevation: 3,
  sx: { padding: 3 },
};

export function BuyInputSection(props: BuyInputSectionProps) {
  const {
    topLeftLabel,
    topLeftValue,
    topRightLabel,
    topRightValue,
    onClickTopRightLabel,
    inputValue,
    onInputValueChange,
    onClickMax,
    onFocus,
    onBlur,
    showMaxButton,
    staticInput,
    children,
    onSelectToken,
  } = props;

  const { showModal } = useModal();

  return (
    <Paper {...commonPropsPaper}>
      {/* Currency input panel top */}
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={14} color="text.secondary">
          {topLeftLabel} {topLeftValue}
        </Typography>
        <Typography
          fontSize={14}
          color="text.secondary"
          onClick={onClickTopRightLabel}
          sx={{ cursor: onClickTopRightLabel ? "pointer" : "initial" }}
        >
          <span>{topRightLabel}</span>&nbsp;
          <span>{topRightValue}</span>
        </Typography>
      </Box>
      {/* Currency input panel bottom */}
      <Box display="flex" gap={1} alignItems="end">
        {!staticInput && (
          <TextField
            type="number"
            margin="dense"
            value={inputValue}
            onChange={onInputValueChange}
            onFocus={onFocus}
            onBlur={onBlur}
            name="fromValue"
            placeholder="0.0"
            variant="standard"
            fullWidth
          />
        )}
        {staticInput && <Typography>{inputValue}</Typography>}
        {showMaxButton && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onClickMax}
          >
            MAX
          </Button>
        )}
        {children}
      </Box>
    </Paper>
  );
}

export default BuyInputSection;
