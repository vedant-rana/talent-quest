import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Box, CircularProgress } from "@mui/material";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "firstName",
//     headerName: "First name",
//     width: 150,
//     sortable: true,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     sortable: true,
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     width: 110,
//     sortable: true,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Doe", firstName: "John", age: 35 },
//   { id: 2, lastName: "Smith", firstName: "Jane", age: 42 },
//   { id: 3, lastName: "Williams", firstName: "Alice", age: 29 },
//   { id: 4, lastName: "Brown", firstName: "Charlie", age: 31 },
//   { id: 1, lastName: "Doe", firstName: "John", age: 35 },
//   { id: 2, lastName: "Smith", firstName: "Jane", age: 42 },
//   { id: 3, lastName: "Williams", firstName: "Alice", age: 29 },
//   { id: 4, lastName: "Brown", firstName: "Charlie", age: 31 },
// ];

export default function DataTable({
  columns,
  data,
  loading,
}: {
  columns: any[];
  data: any[];
  loading: boolean;
}) {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        getRowHeight={() => 100}
        pagination
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        className="table"
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          border: "1px solid #e0e0e0",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#efe8f9 !important",
            color: "#333",
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "#333",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ddd",
            fontSize: "0.95rem",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f5f5ff",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f9f9f9",
          },
        }}
      />

      <Backdrop
        open={loading}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.3)",
          height: "100%",
          width: "100%",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
