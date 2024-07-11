import Alert from "@mui/material/Alert";

interface ErrorType {
  text?: string;
}

const Error = (props: ErrorType) => {
  const { text } = props;
  return <Alert severity="error">{text}</Alert>;
};

export default Error;
