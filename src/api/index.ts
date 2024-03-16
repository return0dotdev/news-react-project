import { ApiRequest, ApiResponse } from "../models";
import { dataMocks } from "../mocks/response";
import { HTTP_STATUS } from "../constants";

// you can change USING_MOCK value = true; when you want to using mock mode
const USING_MOCK: boolean = true;

const API_KEY = "YOUR_API_KEY";
const PATH = "https://gnews.io/api/v4/top-headlines";

const fetchData = async (req: ApiRequest): Promise<ApiResponse | undefined> => {
  try {
    if (USING_MOCK) {
      return { ...dataMocks, status: HTTP_STATUS.SUCCESS };
    }

    const params = `?q=${req.keywords}&category=${req.categories}&lang=${req.lang}&from=${req.from}&to=${req.to}&apikey=${API_KEY}`;
    const apiUrl = `${PATH + params}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return {
        totalArticles: 0,
        articles: [],
        status: HTTP_STATUS.SERVER_ERROR,
      };
    }

    const data: ApiResponse = await response.json();

    if (data.totalArticles > 0) {
      return { ...data, status: HTTP_STATUS.SUCCESS };
    } else {
      return { ...data, status: HTTP_STATUS.NOTFOUND };
    }
  } catch (error) {
    return {
      totalArticles: 0,
      articles: [],
      status: HTTP_STATUS.SERVER_ERROR,
    };
  }
};

export default fetchData;
