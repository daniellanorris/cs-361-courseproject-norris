import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";


export default function Login() {
  return (
    <FormControl>
      <InputLabel htmlFor="email">Email address</InputLabel>
      <Input id="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
}