export interface CompanyType {
  company: Company;
}
export interface Company {
  id: number;
  companyName: string;
  companyImgUrl: string;
  location: string;
  companyScore: number;
  companyUrl: string;
  companyLikeCnt: number;
  address: string;
  phoneNumber: string;
  workHour: string;
  companyLikeCheck: boolean;
  totalReviewCnt: number;
  themeList: ThemeListType[];
}

export interface ThemeListType {
  id: number;
  themeImgUrl: string;
  themeName: string;
  difficulty: number;
  genre: string;
  genreFilter: string;
  playTime: number;
  synopsis: string;
  themeScore: number;
  themeUrl: string;
  minPeople: number;
  maxPeople: number;
  price: number;
  themeLikeCheck: boolean;
  totalLikeCnt: number;
  reviewCnt: number;
  companyName: string;
}

export interface CompanyThemeProps {
  theme: ThemeListType;
}

export interface CommentProps {
  id: number;
  nickname: string;
  playDate: string;
  score: number;
  success: boolean;
  difficulty: number;
  hint: number;
  comment: string;
}
export interface UserInfoInSessionStorage {
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  username: string;
}
export interface CommentEditType {
  playDate: string;
  score: number | string;
  success: boolean | string;
  difficulty: number | string;
  hint: number | string;
  comment: string;
}
