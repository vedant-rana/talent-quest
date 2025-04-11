import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Category,
  CategoryFormData,
} from "../../../types/masters/categoryTypes";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../../api/services/categoryServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../../types/masters/categoryTypeTypes";
import { getAllCategoryTypes } from "../../../api/services/categoryTypeServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import { loadAllLogos } from "../../../features/masters/logos/logosThunk";
import { STATIC_API } from "../../../config/envConstants";
import BackDropLoading from "../../../utils/BackDropLoading";

const ManageCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: logoLoading, logos } = useAppSelector(
    (state) => state.master.logo
  );
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CategoryFormData>();

  const selectedLogoId = watch("logo");
  const selectedLogo = logos.find((logo) => logo._id === selectedLogoId);

  const submitForm = async (data: CategoryFormData) => {
    try {
      const result: ApiResType = await (id
        ? updateCategory(id, data)
        : createCategory(data));

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/categories");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const bindDataObject = async (id: string) => {
    try {
      setIsLoading(true);
      const result: ApiResType = await getCategoryById(id);
      const dataObj = result.data as Category;
      if (result.success) {
        reset({
          categoryName: dataObj.categoryName,
          description: dataObj.description,
          logo: dataObj.logo._id,
          type: dataObj.type._id,
        });
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const bindCategoryTypesDropdown = async () => {
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
    if (logos.length <= 0) {
      dispatch(loadAllLogos());
    }
    bindCategoryTypesDropdown();
    if (id) {
      bindDataObject(id);
    } else {
      reset();
    }
  }, [id]);

  return (
    <>
      <section className="overview py-5 mt-5">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mb-2 mt-5">Manage Category</h4>

          <div
            className="row p-4 shadow-lg orderTable border rounded-lg"
            style={{ maxHeight: "600px" }}
          >
            <div className="col-md-12 mx-auto">
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="form-group mb-3">
                  <label asp-for="Name" className="control-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    {...register("categoryName", {
                      required: "Name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.categoryName && (
                    <span className="text-danger">
                      {errors.categoryName.message}
                    </span>
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
                  {errors.type && (
                    <span className="text-danger">{errors.type.message}</span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="typeDropdown" className="control-label">
                    Type
                  </label>
                  <select
                    id="typeDropdown"
                    className="form-control"
                    {...register("type", {
                      required: "Description is required",
                    })}
                  >
                    <option value="">Select Type</option>
                    {categoryTypes.map((type: CategoryType) => (
                      <option key={type._id} value={type._id}>
                        {type.categoryTypeName}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="text-danger">{errors.type.message}</span>
                  )}
                </div>

                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/categories"}
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

export default ManageCategory;
