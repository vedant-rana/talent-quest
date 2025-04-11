import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../types/masters/userRoleTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  deleteRole,
  getAllRoles,
} from "../../../api/services/userRolesServices";
import { toast } from "react-toastify";
import { confirm } from "../../../utils/confirmAlert";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataGrid";

const RolesList = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bindListData = async () => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getAllRoles();

      if (result.success) {
        setRoles(result.data as UserRole[]);
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    bindListData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const isConfirm = await confirm(
        "Delete Category Type",
        "Are you sure you want to delete this Role ?",
        "Delete"
      );
      if (!isConfirm) return;

      const result: ApiResType = await deleteRole(id);

      if (result.success) {
        toast.success(result.message);
        console.log(result);
        bindListData();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { field: "roleCode", headerName: "Role Code", flex: 1, sortable: true },
    { field: "roleName", headerName: "Role Name", flex: 1, sortable: true },
    { field: "isActive", headerName: "Is Active", flex: 1, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        const isDisabled = params.row.isDeactivatable as boolean;
        return (
          <>
            <Tooltip title="Edit" arrow>
              <IconButton
                color="primary"
                onClick={() =>
                  navigate(`/masters/user-roles/manage/${params.row._id}`)
                }
                sx={{ color: "green" }}
                disabled={!isDisabled}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton
                color="error"
                onClick={() => handleDelete(params.row._id)}
                sx={{ color: "red" }}
                // disabled={!isDisabled}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <section className="overview">
      <div className="max-container container-fluid">
        <h4 className="title-h2 mt-5">Category Type List</h4>

        <div className="text-right">
          <Link to={"/masters/user-roles/manage"} className="master-button">
            Create New
          </Link>
        </div>
        <br />
        <div
          className="orderTable shadow-lg p-4"
          style={{ maxHeight: "700px" }}
        >
          <DataTable columns={columns} data={roles} loading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default RolesList;
