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
        <IconButton size="small" onClick={view}>
          <VisibilityIcon />
        </IconButton>
      )}
      {lock && (
        <IconButton size="small" onClick={lock}>
          {isLock ? <LockOpenIcon /> : <LockIcon />}
        </IconButton>
      )}
      {edit && (
        <IconButton size="small" onClick={edit}>
          <EditIcon />
        </IconButton>
      )}
      {remove && (
        <IconButton size="small" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionTable;
