import api from "./index";

//
export const getAchieve = async () => {
  const data = await api.get("/main/achieve");
  return data.data.data;
};

export const getBest = async () => {
  const data = await api.get("/main/best");
  return data.data.data;
};

export const getRecommended = async () => {
  const data = await api.get("/main/random");
  return data.data.data;
};

export const getHOf = async () => {
  const data = await api.get("/main/hof/new");
  return data.data.data;
};

export const getDetailNotice = async (id) => {
  const { data } = await api.get(`/notice/${id}`);
  return data;
};

export const getNoticeList = async () => {
  const { data } = await api.get("/notices");
  return data;
};
