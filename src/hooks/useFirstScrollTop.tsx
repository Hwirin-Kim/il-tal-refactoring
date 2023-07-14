import React, { useEffect } from "react";
/**
 * 처음 화면 진입 시 스크롤 최 상단 유지
 */
export default function useFirstScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
