import React from "react";
import { useNavigate } from "react-router-dom";

export default function useRouteOnClick() {
  const navigator = useNavigate();
  const onClickToRoute = (path: string) => {
    navigator(`${path}`);
  };
  return onClickToRoute;
}
