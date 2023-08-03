import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ActionTable = ({ view, edit, remove, lock, isLock = false }) => {
  return (
    <Box display="flex">
      {view && (
        <IconButton value="view" size="small" onClick={view}>
          <VisibilityIcon />
        </IconButton>
      )}
      {lock && (
        <IconButton value="lock" size="small" onClick={lock}>
          {isLock ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
      )}
      {edit && (
        <IconButton value="edit" size="small" onClick={edit}>
          <EditIcon />
        </IconButton>
      )}
      {remove && (
        <IconButton value="remove" size="small" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionTable;
