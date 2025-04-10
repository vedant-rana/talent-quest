import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import DataTable from "../../../components/DataGrid";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import { useEffect } from "react";
import {
  deleteLogo,
  loadAllLogos,
} from "../../../features/masters/logos/logosThunk";
import { STATIC_API } from "../../../config/envConstants";
import { confirm } from "../../../utils/confirmAlert";
import { Tooltip } from "@mui/material";

const Logo = () => {
  const { isLoading, logos } = useAppSelector((state) => state.master.logo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      const isConfirm = await confirm(
        "Delete Logo",
        "Are you sure you want to delete this logo?",
        "Delete"
      );

      if (!isConfirm) return;

      const result = await dispatch(deleteLogo(id)).unwrap();
      if (result.success) {
        toast.success(result.message || "Logo Deleted Successfully");
        dispatch(loadAllLogos());
      } else {
        toast.error(result.message || "Logo Deletion Failed");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };
  const columns = [
    // { field: "_id", headerName: "ID", hide: true },
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    {
      field: "logoUrl",
      headerName: "Logo Image",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <img
          src={`${STATIC_API}/${params.value}`}
          alt="logo"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
            margin: "auto",
          }}
        />
      ),
    },
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
                navigate(`/masters/logos/manage/${params.row._id}`)
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

  useEffect(() => {
    // if (logos.length === 0) {
    dispatch(loadAllLogos());
    // }
  }, [dispatch]);

  return (
    <>
      <section className="overview">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mt-5">Logo List</h4>

          <div className="text-right">
            <Link to={"/masters/logos/manage"} className="master-button">
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            {/* <table className="table" id="LogoList"></table> */}
            {/* {isLoading ? (
              <p> Loading .... </p>
            ) : ( */}
            <DataTable columns={columns} data={logos} loading={isLoading} />
            {/* )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Logo;
