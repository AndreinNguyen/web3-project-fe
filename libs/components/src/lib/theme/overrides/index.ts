import { Theme } from "@mui/material";
// Input. Ref: https://mui.com/material-ui/react-autocomplete/
import Button from "./input/Button";
import Checkbox from "./input/Checkbox";
import Radio from "./input/Radio";
import Select from "./input/Select";
import Switch from "./input/Switch";
// import TextField from "./input/TextField";
import FloatActionButton from "./input/FloatActionButton";
import Rating from "./input/Rating";
import Slider from "./input/Slider";

// Data display. Ref: https://mui.com/material-ui/react-avatar/
import Avatar from "./data-display/Avatar";
import MaterialIcon from "./data-display/MuiSvgIcon";
import Badge from "./data-display/Badge";
import Chip from "./data-display/Chip";
import Divider from "./data-display/Divider";
import Table from "./data-display/Table";
import Tooltip from "./data-display/Tooltip";
import Typography from "./data-display/Typography";
import List from "./data-display/List";

// Feed back. Ref: https://mui.com/material-ui/react-alert/
import Alert from "./feedback/Alert";
import Dialog from "./feedback/Dialog";
import Progress from "./feedback/Progress";
import Skeleton from "./feedback/Skeleton";
import Snackbar from "./feedback/Snackbar";

// Mui-x. Ref: https://mui.com/x/react-date-pickers/getting-started/
import DatePicker from "./mui-x/DatePicker";

// Navigation. Ref: https://mui.com/material-ui/react-pagination/#main-content
import Pagination from "./navigation/Pagination";
import Tabs from "./navigation/Tabs";

// Surface. Ref: https://mui.com/material-ui/react-accordion/
import AppBar from "./surfaces/AppBar";
import Card from "./surfaces/Card";

// Utils. Ref: https://mui.com/material-ui/react-click-away-listener/
import Popover from "./utils/Popover";
import Popper from "./utils/Popper";
import CssBaseline from "./utils/CssBaseline";
import Container from "./surfaces/Container";
import AutoComplete from "./input/AutoComplete";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    // Input.
    Button(theme),
    // TextField(theme),
    Checkbox(theme),
    Radio(theme),
    Select(theme),
    FloatActionButton(theme),
    Rating(theme),
    Switch(theme),
    Slider(theme),
    Chip(theme),
    AutoComplete(theme),
    // Data display.
    Avatar(theme),
    MaterialIcon(theme),
    Badge(theme),
    Chip(theme),
    Divider(theme),
    Table(theme),
    Tooltip(theme),
    Typography(theme),
    List(theme),
    // Surface; Navigation; Mui-x
    AppBar(theme),
    Card(theme),
    DatePicker(theme),
    Container(theme),
    // Feed back
    Alert(theme),
    Dialog(theme),
    Progress(theme),
    Skeleton(theme),
    Snackbar(theme),
    // Navigation.
    Pagination(theme),
    Tabs(theme),
    // Utils.
    Popover(theme),
    Popper(theme),
    CssBaseline(theme)
  );
}
