import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exam } from "../../../types/masters/examTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { QuestionWithAnswerFormData } from "../../../types/masters/questionTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  createQuestionWithOptions,
  getQuestionTypes,
} from "../../../api/services/questionServices";
import { toast } from "react-toastify";
import { getAllExams } from "../../../api/services/examServices";
import { DropDownListItem } from "../../../types/commonTypes";
import BackDropLoading from "../../../utils/BackDropLoading";
import { Link } from "react-router-dom";

const ManageQuestionWithOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [questionTypes, setQuestionTypes] = useState<DropDownListItem[]>([]);

  // =================================================================
  // loading state and Functions
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const startLoading = () => setLoadingCount((count) => count + 1);
  const stopLoading = () => setLoadingCount((count) => Math.max(0, count - 1));
  // =================================================================

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<QuestionWithAnswerFormData>({
    defaultValues: {
      question: {
        title: "",
        note: "",
        questionType: "",
        score: 0,
        exam: "",
      },
      options: [
        {
          _id: "",
          value: "",
          isCorrect: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const submitForm = async (data: QuestionWithAnswerFormData) => {
    try {
      console.log("data", data);
      startLoading();
      //   const result: ApiResType = await (id
      //     ? updateQuestion(id, data)
      //     : createQuestion(data));

      const result: ApiResType = await createQuestionWithOptions(data);

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/questions");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      stopLoading();
    }
  };

  //   const bindDataObject = async (id: string) => {
  //     try {
  //       startLoading();
  //       const result: ApiResType = await getQuestionById(id);
  //       const dataObj = result.data as Question;
  //       if (result.success) {
  //         reset({
  //           title: dataObj.title,
  //           note: dataObj.note,
  //           questionType: dataObj.questionType,
  //           score: dataObj.score,
  //           exam: dataObj.exam._id,
  //         });
  //       } else {
  //         toast.error(result.message);
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     } finally {
  //       stopLoading();
  //     }
  //   };

  const loadAllData = async () => {
    try {
      startLoading();
      const [allExams, types] = await Promise.all([
        getAllExams(),
        getQuestionTypes(),
      ]);

      if (allExams.success) {
        setExams(allExams.data as Exam[]);
      } else {
        toast.error(allExams.message);
      }
      if (types.success) {
        setQuestionTypes(types.data as DropDownListItem[]);
      } else {
        toast.error(types.message);
      }

      if (id) {
        // await bindDataObject(id);
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
          <h4 className="title-h2 mb-2 mt-5">Manage Question</h4>

          <div
            className="row p-4 shadow-lg orderTable border rounded-lg"
            style={{ minHeight: "1000px", height: "auto" }}
          >
            <div className="col-md-12 mx-auto">
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="form-group mb-3">
                  <label htmlFor="examDDL" className="control-label">
                    Exam
                  </label>
                  <select
                    id="examDDL"
                    className="form-control"
                    {...register("question.exam", {
                      required: "Exam is required",
                    })}
                  >
                    <option value="">Select Exam</option>
                    {exams.map((d: Exam) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {errors.question?.exam && (
                    <span className="text-danger">
                      {errors.question?.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label asp-for="Name" className="control-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    {...register("question.title", {
                      required: "Title is required",
                      maxLength: {
                        value: 255,
                        message: "Title cannot exceed 255 characters",
                      },
                    })}
                  />
                  {errors.question?.title && (
                    <span className="text-danger">
                      {errors.question?.title.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label asp-for="note" className="control-label">
                    Description
                  </label>
                  <input
                    className="form-control"
                    {...register("question.note", {
                      required: "Note is required",
                      maxLength: {
                        value: 255,
                        message: "Note cannot exceed 255 characters",
                      },
                    })}
                  />
                  {errors.question?.note && (
                    <span className="text-danger">
                      {errors.question?.note.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="typeDropdown" className="control-label">
                    Level
                  </label>
                  <select
                    id="typeDropdown"
                    className="form-control"
                    {...register("question.questionType", {
                      required: "Type is required",
                    })}
                  >
                    <option value="">Select Type</option>
                    {questionTypes.map((type: DropDownListItem) => (
                      <option key={type.value} value={type.value}>
                        {type.text}
                      </option>
                    ))}
                  </select>
                  {errors.question?.questionType && (
                    <span className="text-danger">
                      {errors.question?.questionType.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label asp-for="description" className="control-label">
                    Score
                  </label>
                  <input
                    className="form-control"
                    {...register("question.score", {
                      required: "Score is required",
                    })}
                  />
                  {errors.question?.score && (
                    <span className="text-danger">
                      {errors.question?.score.message}
                    </span>
                  )}
                </div>

                {fields.map((item, index) => (
                  <>
                    <div className="form-group mb-3">
                      <label asp-for="value" className="control-label">
                        Title
                      </label>
                      <input
                        className="form-control"
                        defaultValue={item.value}
                        {...register(`options.${index}.value`, {
                          required: "Value is required",
                          maxLength: {
                            value: 255,
                            message: "Value cannot exceed 255 characters",
                          },
                        })}
                      />
                      {errors.options?.[index]?.value && (
                        <span className="text-danger">
                          {errors.options[index].value?.message}
                        </span>
                      )}
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={item.isCorrect}
                        {...register(`options.${index}.isCorrect`)}
                      />
                      <label
                        className="form-check-label ml-2"
                        htmlFor="isCorrectAns"
                      >
                        Is Correct
                      </label>
                    </div>
                  </>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      _id: "",
                      value: "",
                      isCorrect: false,
                    })
                  }
                >
                  Add Option
                </button>

                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/questions"}
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

export default ManageQuestionWithOptions;
