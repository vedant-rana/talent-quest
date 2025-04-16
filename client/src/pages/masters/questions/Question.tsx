import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../../types/masters/questionTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  deleteQuestion,
  getAllQuestions,
} from "../../../api/services/questionServices";
import { toast } from "react-toastify";
import { confirm } from "../../../utils/confirmAlert";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataGrid";

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bindListData = async () => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getAllQuestions();

      if (result.success) {
        setQuestions(result.data as Question[]);
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
        "Delete Question",
        "Are you sure you want to delete this Question?",
        "Delete"
      );
      if (!isConfirm) return;

      const result: ApiResType = await deleteQuestion(id);
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
    { field: "title", headerName: "Title", flex: 1, sortable: true },
    { field: "note", headerName: "Note", flex: 1, sortable: true },
    { field: "questionType", headerName: "Type", flex: 1, sortable: true },
    { field: "score", headerName: "Score", flex: 1, sortable: true },
    {
      field: "exam",
      headerName: "Exam",
      flex: 1,
      sortable: true,
      filterable: true,
      renderCell: (params: any) => {
        return params.value.name;
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
                navigate(`/masters/questions/manage/${params.row._id}`)
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
            <Link to={"/masters/questions/manage"} className="master-button">
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            <DataTable columns={columns} data={questions} loading={isLoading} />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionList;
