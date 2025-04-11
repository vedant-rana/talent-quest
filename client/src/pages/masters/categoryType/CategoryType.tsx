import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataGrid";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { CategoryType } from "../../../types/masters/categoryTypeTypes";
import {
  deleteCategoryType,
  getAllCategoryTypes,
} from "../../../api/services/categoryTypeServices";
import { ApiResType } from "../../../types/apiReqResTypes";
import { toast } from "react-toastify";
import { confirm } from "../../../utils/confirmAlert";

const CategoryTypeList = () => {
  const navigate = useNavigate();
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bindListData = async () => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getAllCategoryTypes();

      if (result.success) {
        setCategoryTypes(result.data as CategoryType[]);
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
        "Are you sure you want to delete this category type?",
        "Delete"
      );
      if (!isConfirm) return;

      const result: ApiResType = await deleteCategoryType(id);
      if (result.success) {
        toast.success(result.message);
        bindListData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  const columns = [
    { field: "categoryTypeName", headerName: "Name", flex: 1, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Edit" arrow>
            <IconButton
              color="primary"
              onClick={() =>
                navigate(`/masters/category-type/manage/${params.row._id}`)
              }
              sx={{ color: "green" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row._id)}
              sx={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="overview">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mt-5">Category Type List</h4>

          <div className="text-right">
            <Link
              to={"/masters/category-type/manage"}
              className="master-button"
            >
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            {/* {isLoading ? (
              <p> Loading .... </p>
            ) : ( */}
            <DataTable
              columns={columns}
              data={categoryTypes}
              loading={isLoading}
            />
            {/* )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryTypeList;
