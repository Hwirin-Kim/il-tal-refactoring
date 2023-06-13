import { useQuery } from "@tanstack/react-query";
import { getBest } from "api/mainApi";
import React from "react";
import { useNavigate } from "react-router-dom";
import BestTheme from "./component/BestTheme/BestTheme";
import MainBanner from "./component/MainBanner/MainBanner";
import RecommendedTheme from "./component/RecommendedTheme/RecommendedTheme";

export default function ReMain() {
  return (
    <>
      <MainBanner />
      <BestTheme />
      <RecommendedTheme />
    </>
  );
}
