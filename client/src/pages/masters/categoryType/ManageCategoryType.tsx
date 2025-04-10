import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoryTypeFormData } from "../../../types/masters/categoryTypes";
import { useEffect } from "react";
import {
  createCategoryType,
  getCatoryTypeById,
  updateCategoryType,
} from "../../../api/services/categoryTypeServices";
import { ApiResType } from "../../../types/apiReqResTypes";
import { toast } from "react-toastify";

const ManageCategoryType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryTypeFormData>();

  const submitForm = async (data: CategoryTypeFormData) => {
    try {
      console.log("Data => ", data);
      const result: ApiResType = await (id
        ? updateCategoryType(id, data)
        : createCategoryType(data));

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/category-type");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const bindDataObject = async (id: string) => {
    try {
      const result: ApiResType = await getCatoryTypeById(id);

      if (result.success) {
        reset({
          categoryTypeName: (result.data as CategoryTypeFormData)
            .categoryTypeName,
        });
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
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
          <h4 className="title-h2 mb-2 mt-5">Category Type</h4>

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
                    {...register("categoryTypeName", {
                      required: "Name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.categoryTypeName && (
                    <span className="text-danger">
                      {errors.categoryTypeName.message}
                    </span>
                  )}
                </div>
                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/category-type"}
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
    </>
  );
};

export default ManageCategoryType;
