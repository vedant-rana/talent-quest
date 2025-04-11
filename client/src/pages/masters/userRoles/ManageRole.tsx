import { useNavigate, useParams } from "react-router-dom";
import {
  UserRole,
  UserRoleFormData,
} from "../../../types/masters/userRoleTypes";
import { useForm } from "react-hook-form";
import { ApiResType } from "../../../types/apiReqResTypes";
import {
  createRole,
  getRoleById,
  updateRole,
} from "../../../api/services/userRolesServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ManageRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRoleFormData>();

  const submitForm = async (data: UserRoleFormData) => {
    try {
      const result: ApiResType = await (id
        ? updateRole(id, data)
        : createRole(data));

      if (result.success) {
        toast.success(result.message);
        reset();
        navigate("/masters/user-roles");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const bindDataObject = async (id: string) => {
    try {
      const result: ApiResType = await getRoleById(id);
      const dataObj: UserRole = result.data as UserRole;
      if (result.success) {
        reset({
          roleName: dataObj.roleName,
          isActive: dataObj.isActive,
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
                    {...register("roleName", {
                      required: "Name is required",
                      maxLength: {
                        value: 20,
                        message: "Name cannot exceed 20 characters",
                      },
                    })}
                  />
                  {errors.roleName && (
                    <span className="text-danger">
                      {errors.roleName.message}
                    </span>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("isActive")}
                  />
                  <label
                    className="form-check-label ml-2"
                    htmlFor="flexCheckDefault"
                  >
                    Is Active
                  </label>
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

export default ManageRole;
