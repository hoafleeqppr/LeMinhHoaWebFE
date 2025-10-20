import React from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function UserTableHeader({
  searchTerm,
  emailFilter,
  onSearchChange,
  onEmailFilterChange,
}) {
  const theme = useTheme(); // ✅ Lấy theme hiện tại
  const isDark = theme.palette.mode === "dark";

  const clearFilters = () => {
    onSearchChange("");
    onEmailFilterChange("");
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
        alignItems: "center",
        bgcolor: isDark ? "#1e1e1e" : "#f8fafc", // dark/light mode
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color={isDark ? "grey.100" : "primary.main"}
      >
        👥 Danh sách người dùng
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          size="small"
          label="Tìm theo tên"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: isDark ? "#2c2c2c" : "white",
              color: isDark ? "#fff" : "#000",
              "& fieldset": {
                borderColor: isDark ? "#555" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#aaa" : "#1976d2",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: isDark ? "#bbb" : undefined }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => onSearchChange("")} size="small">
                  <ClearIcon sx={{ color: isDark ? "#fff" : "#000" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          size="small"
          label="Lọc theo email"
          value={emailFilter}
          onChange={(e) => onEmailFilterChange(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: isDark ? "#2c2c2c" : "white",
              color: isDark ? "#fff" : "#000",
              "& fieldset": {
                borderColor: isDark ? "#555" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#aaa" : "#1976d2",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon sx={{ color: isDark ? "#bbb" : undefined }} />
              </InputAdornment>
            ),
            endAdornment: emailFilter && (
              <InputAdornment position="end">
                <IconButton onClick={() => onEmailFilterChange("")} size="small">
                  <ClearIcon sx={{ color: isDark ? "#fff" : "#000" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {(searchTerm || emailFilter) && (
          <Tooltip title="Làm mới bộ lọc">
            <IconButton
              onClick={clearFilters}
              sx={{
                bgcolor: isDark ? "#333" : "#e3f2fd",
                "&:hover": { bgcolor: isDark ? "#444" : "#bbdefb" },
                color: isDark ? "#fff" : "inherit",
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
}
