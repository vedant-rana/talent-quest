import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { LogoFormData } from "../../../types/masters/logoTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import { createLogo } from "../../../features/masters/logos/logosThunk";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ManageLogo = () => {
  const { id } = useParams();
  const { isLoading, logos } = useAppSelector((state) => state.master.logo);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LogoFormData>();

  const submitLogoForm = (data: LogoFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.logo) {
      formData.append("logo", data.logo[0]);
    }

    dispatch(createLogo(formData));
  };

  useEffect(() => {
    if (id) {
      const logo = logos.find((logo) => logo._id === id);

      if (logo) {
        reset({
          name: logo.name,
        });
      }
    }
  }, [id]);

  return (
    <>
      <section className="overview py-5 mt-5">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mb-2 mt-5">Logo</h4>

          <div
            className="row p-4 shadow-lg orderTable border rounded-lg"
            style={{ maxHeight: "600px" }}
          >
            <div className="col-md-12 mx-auto">
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(submitLogoForm)}
              >
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
                  <label asp-for="Logo1" className="control-label">
                    Image File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    {...register("logo", {
                      required: "Logo is required",
                    })}
                  />
                  {errors.logo && (
                    <span className="text-danger">{errors.logo.message}</span>
                  )}
                </div>

                <div className="form-group mt-4 d-flex justify-content-between">
                  <Link
                    to={"/masters/logos"}
                    className="btn backBtnBg w-50 mr-2"
                  >
                    Back to List
                  </Link>
                  <input
                    type="submit"
                    value="Create"
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

export default ManageLogo;
