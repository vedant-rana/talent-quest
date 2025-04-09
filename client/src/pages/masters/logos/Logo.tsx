import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DataTable from "../../../components/DataGrid";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import { useEffect } from "react";
import { loadAllLogos } from "../../../features/masters/logos/logosThunk";
import { STATIC_API } from "../../../config/envConstants";

const Logo = () => {
  const { isLoading, logos } = useAppSelector((state) => state.master.logo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {};
  const columns = [
    { field: "_id", headerName: "ID", width: 90, hide: true },
    { field: "name", headerName: "Name", width: 150, sortable: true },
    {
      field: "logoUrl",
      headerName: "Logo Image",
      width: 150,
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
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/masters/logos/manage/${params.row._id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (logos.length === 0) {
      dispatch(loadAllLogos());
    }
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
            {isLoading ? (
              <p> Loading .... </p>
            ) : (
              <DataTable columns={columns} data={logos} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Logo;
