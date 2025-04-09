import { Link } from "react-router-dom";
import DataTable from "../../../components/DataGrid";

const Logo = () => {
  return (
    <>
      <section className="overview">
        <div className="max-container container-fluid">
          <h4 className="title-h2 mt-5">Logo List</h4>

          <div className="text-right">
            <Link to={"/masters/logos/manage"} className="master-button">
              Create New
            </Link>
          </div>
          <br />
          <div
            className="orderTable shadow-lg p-4"
            style={{ maxHeight: "700px" }}
          >
            {/* <table className="table" id="LogoList"></table> */}
            <DataTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Logo;
