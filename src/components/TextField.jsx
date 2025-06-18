import React from "react";
import { FormField } from "../components/FormField";
import { input } from "framer-motion/client";

export function TextFieldComponent({ id, label, register, validation, error, type = "text", placeholder, ...inputProps }) {
  return (
    <FormField id={id} label={label} error={error}>
      <input
        type={type}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${id}` : undefined}
        {...register(id, validation)}
        className={error ? "error-field" : ""}
        placeholder={placeholder}
        {...inputProps}
      />
    </FormField>
  );
}
export const TextField = React.memo(TextFieldComponent);