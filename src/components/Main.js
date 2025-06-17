import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";

export default function Main({ children }) {

  return (
    <main>
      { children }
    </main>
  );
}
