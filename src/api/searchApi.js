import api from "./index";

export const getSearchTheme = async ({ searchWord, searchThemePage }) => {
  const { data } = await api.get(
    `/themes/newsearch?themeName=${searchWord}&page=${searchThemePage}`
  );
  return data;
};

export const getSearchCompany = async ({ searchWord, searchComPage }) => {
  const { data } = await api.get(
    `companies/newsearch?companyName=${searchWord}&page=${searchComPage}`
  );
  return data;
};
