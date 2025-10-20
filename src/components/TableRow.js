import React from "react";
import { TableRow, TableCell, Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserTableRow({ user, index, onEdit, onDelete }) {
  return (
    <TableRow
      hover
      sx={{
        transition: "all 0.2s ease-in-out",
        "&:hover": { backgroundColor: "#f6faff", transform: "scale(1.01)" },
      }}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 46, height: 46, border: "2px solid #1976d2" }}
        />
      </TableCell>
      <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell align="center">
        <Tooltip title="Chỉnh sửa" arrow>
          <IconButton color="primary" onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa người dùng" arrow>
          <IconButton color="error" onClick={onDelete} size="small">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
