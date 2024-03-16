import { CategoriesType } from "../models";

export const OPTIONS_EN: CategoriesType[] = [
  { label: "General", value: "general" },
  { label: "World", value: "world" },
  { label: "Nation", value: "nation" },
  { label: "Business", value: "business" },
  { label: "Technology", value: "technology" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Sports", value: "sports" },
  { label: "Science", value: "science" },
  { label: "Health", value: "health" },
];

export const OPTIONS_ZH: CategoriesType[] = [
  { label: "综合", value: "general" },
  { label: "国际", value: "world" },
  { label: "国内", value: "nation" },
  { label: "商业", value: "business" },
  { label: "科技", value: "technology" },
  { label: "娱乐", value: "entertainment" },
  { label: "体育", value: "sports" },
  { label: "科学", value: "science" },
  { label: "健康", value: "health" },
];

export const LANGUEAGE_OPTIONS = ["en", "zh"];
export const LANGUEAGE = { EN: "en", ZH: "zh" };

export const HTTP_STATUS = {
  SUCCESS: 200,
  FAIL: 400,
  NOTFOUND: 404,
  SERVER_ERROR: 500,
};

export const PAGINATION = {
  PAGE_SIZE: 2,
  DEFAULT_CURRENT: 1,
  DEFAULT_TOTAL: 10,
  SHOW_SIZR_CHANGER: false,
};
