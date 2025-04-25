import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answer } from "../../../types/masters/answerTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  deleteAnswer,
  getAllAnswers,
} from "../../../api/services/answerServices";
import { toast } from "react-toastify";
import { confirm } from "../../../utils/confirmAlert";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataGrid";

const AnswerList = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bindListData = async () => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getAllAnswers();

      if (result.success) {
        setAnswers(result.data as Answer[]);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bindListData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const isConfirm = await confirm(
        "Delete Answer",
        "Are you sure you want to delete this Answer?",
        "Delete"
      );
      if (!isConfirm) return;

      const result: ApiResType = await deleteAnswer(id);
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
    {
      field: "question",
      headerName: "Question",
      flex: 1.5,
      sortable: true,
      filterable: true,
      renderCell: (params: any) => {
        return params.value?.title ?? "";
      },
    },
    { field: "value", headerName: "Option Value", flex: 1, sortable: true },
    {
      field: "isCorrect",
      headerName: "Is Correct",
      flex: 0.5,
      sortable: true,
      filterable: true,
      renderCell: (params: any) => {
        return params.value == true ? "Yes" : "No";
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
                navigate(`/masters/answers/manage/${params.row._id}`)
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
            <Link to={"/masters/answers/manage"} className="master-button">
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            <DataTable columns={columns} data={answers} loading={isLoading} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AnswerList;
