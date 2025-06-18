import React from "react";
import { FormField } from "../components/FormField";
import { Clock } from "lucide-react"; // or pass icon as prop

export function SelectFieldComponent({
  id,
  label,
  icon: Icon = Clock,
  register,
  validation,
  error,
  options,          // [{ value, label }, …]
  placeholder,
}) {
  return (
    <FormField id={id} label={label} icon={Icon} error={error}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${id}` : undefined}
        {...register(id, validation)}
        className={error ? "error-field" : ""}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export const SelectField = React.memo(SelectFieldComponent);
