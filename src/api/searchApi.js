import api from "./index";

export const getSearchTheme = async ({ searchWord, searchThemePage }) => {
  const { data } = await api.get(
    `/themes/search?themeName=${searchWord}&page=${searchThemePage}`
  );
  return data;
};

export const getSearchCompany = async ({ searchWord, searchComPage }) => {
  const { data } = await api.get(
    `companies/search?companyName=${searchWord}&page=${searchComPage}`
  );
  return data;
};
