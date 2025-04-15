import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import { Exam, ExamFormData } from "../../../types/masters/examTypes";
import { useForm } from "react-hook-form";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  createExam,
  getExamById,
  getExamTypes,
  updateExam,
} from "../../../api/services/examServices";
import { toast } from "react-toastify";
import { DropDownListItem } from "../../../types/commonTypes";
import { loadAllLogos } from "../../../features/masters/logos/logosThunk";
import BackDropLoading from "../../../utils/BackDropLoading";
import { Link } from "react-router-dom";
import { STATIC_API } from "../../../config/envConstants";
import { getAllCategories } from "../../../api/services/categoryServices";
import { Category } from "../../../types/masters/categoryTypes";

const ManageExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [examLevels, setExamLevels] = useState<DropDownListItem[]>([]);
  const { isLoading: logoLoading, logos } = useAppSelector(
    (state) => state.master.logo
  );
  const dispatch = useAppDispatch();

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
    watch,
    reset,
  } = useForm<ExamFormData>();

  const selectedLogoId = watch("logo");
  const selectedLogo = logos.find((logo) => logo._id === selectedLogoId);

  const submitForm = async (data: ExamFormData) => {
    try {
      startLoading();
      const result: ApiResType = await (id
        ? updateExam(id, data)
        : createExam(data));

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/exams");
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
      const result: ApiResType = await getExamById(id);
      const dataObj = result.data as Exam;
      if (result.success) {
        reset({
          name: dataObj.name,
          description: dataObj.description,
          level: dataObj.level,
          logo: dataObj.logo._id,
          categoryId: dataObj.categoryId._id,
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

  // const getCategoriesDDL = async () => {
  //   try {
  //     startLoading();
  //     const result: ApiResType = await getAllCategories();

  //     if (result.success) {
  //       setCategories(result.data as Category[]);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   } finally {
  //     stopLoading();
  //   }
  // };

  // const bindExamLevelDropdown = async () => {
  //   try {
  //     startLoading();
  //     const result: ApiResType = await getExamTypes();

  //     if (result.success) {
  //       setExamLevels(result.data as DropDownListItem[]);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   } finally {
  //     stopLoading();
  //   }
  // };

  const loadAllData = async () => {
    try {
      startLoading();
      const [allCateg, lvls] = await Promise.all([
        getAllCategories(),
        getExamTypes(),
      ]);

      if (allCateg.success) {
        setCategories(allCateg.data as Category[]);
      } else {
        toast.error(allCateg.message);
      }
      if (lvls.success) {
        setExamLevels(lvls.data as DropDownListItem[]);
      } else {
        toast.error(lvls.message);
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
    if (logos.length <= 0) {
      dispatch(loadAllLogos());
    }
    loadAllData();
  }, [id]);

  return (
    <>
      <section className="overview py-5 mt-5">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mb-2 mt-5">Manage Exam</h4>

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
                  <label htmlFor="categoryDropdown" className="control-label">
                    Category
                  </label>
                  <select
                    id="categoryDropdown"
                    className="form-control"
                    {...register("categoryId", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((d: Category) => (
                      <option key={d._id} value={d._id}>
                        {d.categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <span className="text-danger">
                      {errors.categoryId.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label asp-for="Name" className="control-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="logoDdl" className="control-label">
                    Logo
                  </label>
                  <select
                    id="logoDdl"
                    className="form-control"
                    {...register("logo", {
                      required: "Logo is required",
                    })}
                  >
                    <option value="">Select Logo</option>
                    {logos.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="dropdown-img-div"
                    style={{ objectFit: "cover" }}
                  >
                    {selectedLogo && (
                      <img
                        id="logoImage"
                        src={`${STATIC_API}/${selectedLogo.logoUrl}`}
                        alt={selectedLogo.name}
                        className="maxImgHeight mt-2"
                        height="100"
                      />
                    )}
                  </div>
                  {errors.logo && (
                    <span className="text-danger">{errors.logo.message}</span>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label asp-for="description" className="control-label">
                    Description
                  </label>
                  <input
                    className="form-control"
                    {...register("description", {
                      required: "Description is required",
                      maxLength: {
                        value: 255,
                        message: "Name cannot exceed 255 characters",
                      },
                    })}
                  />
                  {errors.description && (
                    <span className="text-danger">
                      {errors.description.message}
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
                    {...register("level", {
                      required: "Level is required",
                    })}
                  >
                    <option value="">Select Level</option>
                    {examLevels.map((type: DropDownListItem) => (
                      <option key={type.value} value={type.value}>
                        {type.text}
                      </option>
                    ))}
                  </select>
                  {errors.level && (
                    <span className="text-danger">{errors.level.message}</span>
                  )}
                </div>

                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/exams"}
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
      <BackDropLoading loading={isLoading || logoLoading} />
    </>
  );
};

export default ManageExam;
