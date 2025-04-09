import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    sortable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    sortable: true,
  },
  {
    field: "age",
    headerName: "Age",
    width: 110,
    sortable: true,
  },
];

const rows = [
  { id: 1, lastName: "Doe", firstName: "John", age: 35 },
  { id: 2, lastName: "Smith", firstName: "Jane", age: 42 },
  { id: 3, lastName: "Williams", firstName: "Alice", age: 29 },
  { id: 4, lastName: "Brown", firstName: "Charlie", age: 31 },
  { id: 1, lastName: "Doe", firstName: "John", age: 35 },
  { id: 2, lastName: "Smith", firstName: "Jane", age: 42 },
  { id: 3, lastName: "Williams", firstName: "Alice", age: 29 },
  { id: 4, lastName: "Brown", firstName: "Charlie", age: 31 },
];

export default function DataTable() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        className="table"
      />
    </Box>
  );
}
