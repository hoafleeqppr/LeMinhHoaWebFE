import React, { useEffect, useState } from "react";
import { userService } from "../services/api";
import UserTable from "../components/Table";
import UserFormDialog from "../components/FormDialog";
import UserConfirmDialog from "../components/ConfirmDeleteDialog";
import UserTableHeader from "../components/TableHeader";

import {
  Container,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    userService.getAll().then((res) => setUsers(res.data)).catch(() =>
      setAlert({ open: true, message: "Không thể tải danh sách người dùng!", severity: "error" })
    );
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await userService.update(editingUser.id, data);
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)));
        setAlert({ open: true, message: "Cập nhật thành công!", severity: "success" });
      } else {
        const res = await userService.create(data);
        setUsers((prev) => [res.data, ...prev]);
        setAlert({ open: true, message: "Thêm mới thành công!", severity: "success" });
      }
      setOpenDialog(false);
      setEditingUser(null);
    } catch {
      setAlert({ open: true, message: "Lỗi khi lưu dữ liệu!", severity: "error" });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await userService.delete(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setAlert({ open: true, message: "Xóa thành công!", severity: "success" });
    } catch {
      setAlert({ open: true, message: "Lỗi khi xóa!", severity: "error" });
    } finally {
      setOpenConfirm(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      u.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="false" sx={{ mt: 4, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={700}>
            Quản lý người dùng
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Thêm người dùng
          </Button>
        </Box>

        <UserTableHeader
          searchTerm={searchTerm}
          emailFilter={emailFilter}
          onSearchChange={setSearchTerm}
          onEmailFilterChange={setEmailFilter}
        />

        <Divider sx={{ my: 2 }} />

        <UserTable
          users={paginatedUsers}
          onEdit={(u) => {
            setEditingUser(u);
            setOpenDialog(true);
          }}
          onDelete={(u) => {
            setUserToDelete(u);
            setOpenConfirm(true);
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          totalUsers={users.length}
        />

        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Số dòng mỗi trang:"
        />
      </Paper>

      <UserFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmit}
        defaultValues={editingUser || { name: "", email: "", avatar: "" }}
      />

      <UserConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
      />

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
