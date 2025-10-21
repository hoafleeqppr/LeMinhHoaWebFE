import React from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Tooltip, Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserTable({users, onDelete, page, rowsPerPage, totalUsers}) {
    return (
        <Box sx={{width: "100%", mt: 2}}>
            <Paper elevation={3} sx={{p: 2, borderRadius: 3}}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Birthday</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.length > 0 ? (
                                users.map((u, index) => (
                                    <TableRow key={u.id} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            {u.name}
                                        </TableCell>
                                        <TableCell>
                                            {u.name}
                                        </TableCell>
                                        <TableCell>
                                            {u.email}
                                        </TableCell>
                                        <TableCell>
                                            {u.birthday}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="error" size="small">Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        <Typography color="text.secondary">Không có người dùng nào.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="body2" align="right" sx={{mt: 1, color: "text.secondary"}}>
                    Hiển thị <b>{users.length}</b> / Tổng <b>{totalUsers}</b> người dùng
                </Typography>
            </Paper>
        </Box>
    );
}
