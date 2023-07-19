import api from "./index";

export const getThemes = async () => {
  const { data } = await api.get("/themes");
  return data;
};

//테마 페이지 테마리스트 GET요청 (무한스크롤)
export const getFilterTheme = async ({
  genreFilter,
  location,
  themeScore,
  people,
  difficulty,
  page,
  sort,
  day,
  time,
}) => {
  const fixParams = (parameter: string) => {
    if (parameter === "전체") {
      return "";
    }
    return parameter;
  };

  const { data } = await api.get(
    `/themes?location=${fixParams(location)}&genreFilter=${fixParams(
      genreFilter
    )}&people=${fixParams(
      people
    )}&themeScore=${themeScore}&difficulty=${difficulty}&sort=${sort}&page=${page}&day=${day}&time=${time}`
  );
  return data;
};

//디테일테마 페이지 테마리스트 GET요청
export const getDetailTheme = async (id) => {
  const { data } = await api.get(`/theme/${id}`);
  return data;
};

//디테일테마 페이지 댓글작성 POST요청
export const postComment = async (payload) => {
  const { data } = await api.post(`/theme/${payload.id}/review`, payload.data);
  return data;
};

//디테일테마 페이지 댓글조회 GET요청
export const getComment = async ({ id, commentPage }) => {
  const { data } = await api.get(`/theme/${id}/reviews?page=${commentPage}`);
  return data;
};

//디테일테마 페이지 댓글수정 PUT요청
export const putComment = async (payload) => {
  const { data } = await api.put(`/theme/review/${payload.id}`, payload.data);
  return data;
};

//디테일테마 페이지 댓글삭제 DELETE요청
export const delComment = async (id) => {
  const { data } = await api.delete(`/theme/review/${id}`);
  return data;
};

//테마&디테일테마 페이지 찜하기 POST요청
export const wishTheme = async (payload) => {
  const { data } = await api.post("/theme/wish", { themeId: payload });
  return data;
};

//테마 필터 적용시 미리 개수 보여주는 GET요청
interface FilterCntParameterType {
  genre: string[];
  location: string[];
  themeScore: number[];
  people: string[];
  difficulty: number[];
  day: string;
  time: string[];
  themePagenation?: number;
  sort?: string;
}
export const getFilterCnt = async ({
  genre,
  location,
  themeScore,
  people,
  difficulty,
  day,
  time,
}: FilterCntParameterType) => {
  const fixParameter = (param: string[]) => {
    if (param.includes("전체")) {
      return "";
    }
    return param;
  };
  const { data } = await api.get(
    `/themes/filterCnt?location=${fixParameter(
      location
    )}&genreFilter=${fixParameter(genre)}&people=${fixParameter(
      people
    )}&themeScore=${themeScore}&difficulty=${difficulty}&day=${day}&time=${time}`
  );
  return data;
};

export const postBadgeCheck = async () => {
  const { data } = await api.post("/badge/check");
  return data;
};
