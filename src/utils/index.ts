import moment from "moment";
import { ApiResponse } from "../models";
import { LANGUEAGE } from "../constants";

export const sortedArticles = (data: ApiResponse) => {
  const result = data.articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  return result;
};

export const formatDate = (dateString: string, lang: string): string => {
  const parsedDate = moment(dateString);

  if (lang == LANGUEAGE.EN) {
    return parsedDate.format("MMMM D, YYYY hh:mm A");
  } else {
    return parsedDate
      .format("YYYY年MM月DD日 hh:mm A")
      .replace("PM", "下午")
      .replace("AM", "是。");
  }
};
