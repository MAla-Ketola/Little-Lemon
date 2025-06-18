import React from "react";
import { FormField } from "../components/FormField";
import { Calendar } from "lucide-react";

export function DateFieldComponent({ register, error, todayString }) {
  return (
    <FormField
      id="res-date"
      label="Date"
      icon={Calendar}
      error={error}
    >
      <input
        type="date"
        id="res-date"
        aria-invalid={!!error}
        aria-describedby={error ? "error-res-date" : undefined}
        {...register("date", { required: "Please select a date" })}
        min={todayString}
        className={error ? "error-field" : ""}
      />
    </FormField>
  );
}

export const DateField = React.memo(DateFieldComponent);
