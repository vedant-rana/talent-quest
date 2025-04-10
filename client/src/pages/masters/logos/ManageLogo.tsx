import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { LogoFormData } from "../../../types/masters/logoTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxStateHooks";
import {
  createLogo,
  loadLogo,
  updateLogo,
} from "../../../features/masters/logos/logosThunk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { STATIC_API } from "../../../config/envConstants";
import { toast } from "react-toastify";

const ManageLogo = () => {
  const { id } = useParams();
  const { logos } = useAppSelector((state) => state.master.logo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LogoFormData>();

  const submitLogoForm = async (data: LogoFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.logo && data.logo.length > 0 && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    try {
      const result = await (id
        ? dispatch(updateLogo({ id, formData }))
        : dispatch(createLogo(formData))
      ).unwrap();

      if (result.success) {
        toast.success(result.message || "Logo Operation done Successfully");
        reset();
        navigate("/masters/logos");
      } else {
        toast.error(result.message || "Logo Operation Failed");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    console.log("logo useEffect");
    if (id) {
      const logo = logos.find((logo) => logo._id === id);

      if (logo) {
        setLogoUrl(logo.logoUrl);
        reset({
          name: logo.name,
        });
      } else {
        dispatch(loadLogo(id));
      }
    }
  }, [id, logoUrl, logos, reset, dispatch]);

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
                    {...register("logo")}
                  />
                  {errors.logo && (
                    <span className="text-danger">{errors.logo.message}</span>
                  )}
                </div>
                <div className="form-group mb-3">
                  {id && (
                    <img
                      src={`${STATIC_API}/${logoUrl}`}
                      className="img-thumbnail"
                      alt="Current Logo"
                      style={{ width: "150px", height: "auto" }}
                    />
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
