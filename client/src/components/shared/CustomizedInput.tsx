import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};
export const CustomizedInput = (props: Props) => {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
};
