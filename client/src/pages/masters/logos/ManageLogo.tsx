import { useForm } from "react-hook-form";
import { LogoFormData } from "../../../types/masters/logoTypes";
import { useAppDispatch } from "../../../hooks/reduxStateHooks";
import { createLogo } from "../../../features/masters/logos/logosThunk";

const ManageLogo = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogoFormData>();

  const submitLogoForm = (data: LogoFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.logo) {
      formData.append("logo", data.logo[0]);
    }

    dispatch(createLogo(formData));
  };

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
                  <a asp-action="Index" className="btn backBtnBg w-50 mr-2">
                    Back to List
                  </a>
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
