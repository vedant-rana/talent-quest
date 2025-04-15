import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Exam } from "../../../types/masters/examTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import { deleteExam, getAllExams } from "../../../api/services/examServices";
import { toast } from "react-toastify";
import { confirm } from "../../../utils/confirmAlert";
import { STATIC_API } from "../../../config/envConstants";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataGrid";

const ExamList = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bindListData = async () => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getAllExams();

      if (result.success) {
        setExams(result.data as Exam[]);
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
        "Delete Exam",
        "Are you sure you want to delete this exam?",
        "Delete"
      );
      if (!isConfirm) return;

      const result: ApiResType = await deleteExam(id);
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
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    {
      field: "logo",
      headerName: "Logo",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <img
          src={`${STATIC_API}/${params.value.logoUrl}`}
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
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: true,
    },
    {
      field: "level",
      headerName: "Type",
      flex: 1,
      sortable: true,
      filterable: true,
    },
    {
      field: "categoryId",
      headerName: "Category",
      flex: 1,
      sortable: true,
      filterable: true,
      renderCell: (params: any) => {
        return params.value.categoryName;
      },
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
                navigate(`/masters/exams/manage/${params.row._id}`)
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
          <h4 className="title-h2 mt-5">Exam List</h4>

          <div className="text-right">
            <Link to={"/masters/exams/manage"} className="master-button">
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            <DataTable columns={columns} data={exams} loading={isLoading} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ExamList;
