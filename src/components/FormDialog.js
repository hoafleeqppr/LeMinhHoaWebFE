import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function UserFormDialog({ open, onClose, onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });

  const selectedFile = watch("avatarFile");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const previewUrl = useMemo(() => {
    if (selectedFile?.length > 0) {
      return URL.createObjectURL(selectedFile[0]);
    }
    return defaultValues?.avatar || "";
  }, [selectedFile, defaultValues]);

  const handleFormSubmit = (data) => {
    if (selectedFile?.length > 0) {
      data.avatar = URL.createObjectURL(selectedFile[0]);
    }
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "primary.main",
        }}
      >
        {defaultValues?.id ? "Cập nhật người dùng" : "Thêm người dùng mới"}
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mt: 2 }}
        >
          <Avatar
            src={previewUrl}
            sx={{ width: 120, height: 120, border: "3px solid #1976d2", mb: 1 }}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none" }}
          >
            Tải ảnh lên
            <input type="file" hidden accept="image/*" {...register("avatarFile")} />
          </Button>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              label="Họ và tên"
              fullWidth
              {...register("name", {
                required: "Vui lòng nhập họ tên",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email không hợp lệ" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Stack>

          <DialogActions sx={{ justifyContent: "center", width: "100%" }}>
            <Button onClick={onClose} color="inherit" variant="outlined">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
