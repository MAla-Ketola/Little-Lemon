import React from "react";

function FormFieldComponent({
  id,
  label,
  icon: Icon,         // optional Lucide React icon component
  children,           // the <input> / <select> itself
  error,              // error message string
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-icon">
        {Icon && <Icon size={20} className="icon" />}
        {children}
      </div>
      {error && (
        <span id={`error-${id}`} role="alert" className="error">
          {error}
        </span>
      )}
    </div>
  );
}

export const FormField = React.memo(FormFieldComponent);