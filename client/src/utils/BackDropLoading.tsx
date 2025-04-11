import { Backdrop, CircularProgress } from "@mui/material";

const BackDropLoading = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop
      open={loading}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.3)",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDropLoading;
