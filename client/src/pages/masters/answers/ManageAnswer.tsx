import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Answer, AnswerFormData } from "../../../types/masters/answerTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  createAnswer,
  getAnswerById,
  getQuestionsForNonDescriptiveAns,
  updateAnswer,
} from "../../../api/services/answerServices";
import { toast } from "react-toastify";
import { DropDownListItem } from "../../../types/commonTypes";
import BackDropLoading from "../../../utils/BackDropLoading";
import { Link } from "react-router-dom";

const ManageAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<DropDownListItem[]>([]);

  // =================================================================
  // loading state and Functions
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const startLoading = () => setLoadingCount((count) => count + 1);
  const stopLoading = () => setLoadingCount((count) => Math.max(0, count - 1));
  // =================================================================

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnswerFormData>();

  const submitForm = async (data: AnswerFormData) => {
    try {
      startLoading();
      const result: ApiResType = await (id
        ? updateAnswer(id, data)
        : createAnswer(data));

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/answers");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      stopLoading();
    }
  };

  const bindDataObject = async (id: string) => {
    try {
      startLoading();
      const result: ApiResType = await getAnswerById(id);
      const dataObj = result.data as Answer;
      if (result.success) {
        reset({
          question: dataObj.question._id,
          value: dataObj.value,
          isCorrect: dataObj.isCorrect,
        });
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      stopLoading();
    }
  };

  const loadAllData = async () => {
    try {
      startLoading();
      const [allQuestions] = await Promise.all([
        getQuestionsForNonDescriptiveAns(),
      ]);

      if (allQuestions.success) {
        setQuestions(allQuestions.data as DropDownListItem[]);
      } else {
        toast.error(allQuestions.message);
      }

      if (id) {
        await bindDataObject(id);
      } else {
        reset();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    loadAllData();
  }, [id]);

  return (
    <>
      <section className="overview py-5 mt-5">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mb-2 mt-5">Manage Answer</h4>

          <div
            className="row p-4 shadow-lg orderTable border rounded-lg"
            style={{ maxHeight: "800px" }}
          >
            <div className="col-md-12 mx-auto">
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="form-group mb-3">
                  <label htmlFor="questionDDL" className="control-label">
                    Question
                  </label>
                  <select
                    id="questionDDL"
                    className="form-control"
                    {...register("question", {
                      required: "Question is required",
                    })}
                  >
                    <option value="">Select Question</option>
                    {questions.map((d: DropDownListItem) => (
                      <option key={d.value} value={d.value}>
                        {d.text}
                      </option>
                    ))}
                  </select>
                  {errors.question && (
                    <span className="text-danger">
                      {errors.question.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label asp-for="value" className="control-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    {...register("value", {
                      required: "Value is required",
                      maxLength: {
                        value: 255,
                        message: "Value cannot exceed 255 characters",
                      },
                    })}
                  />
                  {errors.value && (
                    <span className="text-danger">{errors.value.message}</span>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isCorrectAns"
                    {...register("isCorrect")}
                  />
                  <label
                    className="form-check-label ml-2"
                    htmlFor="isCorrectAns"
                  >
                    Is Active
                  </label>
                </div>

                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/answers"}
                    className="btn backBtnBg w-50 mr-2"
                  >
                    Back to List
                  </Link>
                  <input
                    type="submit"
                    value={id ? "Update" : "Create"}
                    className="btn actionBtnBg w-50 ml-2 text-white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <BackDropLoading loading={isLoading} />
    </>
  );
};

export default ManageAnswer;
