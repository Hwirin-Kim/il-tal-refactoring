import { atom } from "recoil";

//Recoil로 만든 전역상태 보관 Store..

//장르필터 전역 스테이트
export const genreState = atom<string[]>({
  key: "genreState",
  default: ["전체"],
});

//지역필터 전역 스테이트

export const locationState = atom<string[]>({
  key: "locationState",
  default: ["전체"],
});

//인원필터 전역 스테이트
export const peopleState = atom<string[]>({
  key: "peopleState",
  default: ["전체"],
});

//별점필터 전역 스테이트
export const scoreState = atom<number[]>({
  key: "scoreState",
  default: [0, 5],
});

//난이도필터 전역 스테이트
export const difficultyState = atom<number[]>({
  key: "difficultyState",
  default: [1, 5],
});

//업체별 지역필터 전역 스테이트
export const companyLocation = atom<string>({
  key: "companyLocation",
  default: "",
});

//업체별 페이지 전역 스테이트
export const companyPages = atom({
  key: "companyPage",
  default: 0,
});

//
export const headerClicked = atom({
  key: "clicked",
  default: 0,
});

export const genreTend = atom({
  key: "GenreTend",
  default: [],
});

export const questTend = atom({
  key: "questTend",
  default: [],
});

//테마별 페이지 전역 스테이트
export const themePages = atom({
  key: "themePages",
  default: 0,
});

//테마페이지 예약 시간 전역 스테이트
export const timeState = atom<string[]>({
  key: "timeState",
  default: ["", ""],
});

//테마페이지 예약 날짜 전역 스테이트
export const dayState = atom({
  key: "dayState",
  default: "1",
});

//테마페이지 정렬 스테이트
export const sortState = atom({
  key: "sort",
  default: "reviewCnt",
});

//테마페이지 정렬 토글 스테이트
export const onSortState = atom({
  key: "onSort",
  default: "review",
});

//검색어 스테이트
export const searchState = atom({
  key: "searchState",
  default: "",
});

//검색 테마 페이지 전역 스테이트
export const searchThemePages = atom({
  key: "searchThemePage",
  default: 0,
});

//검색 업체 페이지 전역 스테이트
export const searchComPages = atom({
  key: "searchComPage",
  default: 0,
});

//댓글 페이지 전역 스테이트
export const commnetPages = atom({
  key: "commentPages",
  default: 0,
});

export const myReviewPages = atom({
  key: "myReviewPages",
  default: 0,
});
