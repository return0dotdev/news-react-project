import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal, Pagination, Select } from "antd";
import { useEffect, useState } from "react";

import { DatePicker } from "antd";
import {
  HTTP_STATUS,
  LANGUEAGE,
  LANGUEAGE_OPTIONS,
  OPTIONS_EN,
  OPTIONS_ZH,
  PAGINATION,
} from "./constants";
import { ApiRequest, ApiResponse, CategoriesType, HandleError } from "./models";

import { useTranslation } from "react-i18next";
import fetchData from "./api";

import moment from "moment";
import "moment-timezone";
import { formatDate, sortedArticles } from "./utils";

const { RangePicker } = DatePicker;

const App = () => {
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<CategoriesType[]>(OPTIONS_EN);
  const indexOfLastItem: number = page * 2;
  const indexOfFirstItem: number = indexOfLastItem - 2;

  const [responseData, setResponseData] = useState<
    ApiResponse | undefined | null
  >({
    status: HTTP_STATUS.SUCCESS,
    totalArticles: 0,
    articles: [],
  });

  const [requestData, setRequestData] = useState<ApiRequest>({
    keywords: "",
    categories: "",
    from: "",
    to: "",
    lang: "en",
  });

  const [errorDetails, setErrorDetails] = useState<HandleError>({
    open: false,
    title: "",
    details: "",
  });

  const changeLanguage = (lang: string) => {
    if (lang === LANGUEAGE.EN) {
      setCategories(OPTIONS_EN);
    } else {
      setCategories(OPTIONS_ZH);
    }
    handleFetch({ ...requestData, lang });
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    handleFetch(requestData);
  }, []);

  const handleFetch = async (req: ApiRequest) => {
    setRequestData(req);
    setPage(1);
    const response: ApiResponse | undefined = await fetchData(req);

    switch (response?.status) {
      case HTTP_STATUS.SUCCESS: {
        // success
        setResponseData({
          ...response,
          articles: sortedArticles(response),
        });
        break;
      }
      case HTTP_STATUS.NOTFOUND: {
        // data_not_found
        setResponseData(response);
        setErrorDetails({
          open: true,
          title: t("modal-handle-errors.notfound-title"),
          details: t("modal-handle-errors.notfound-details"),
        });
        break;
      }
      case HTTP_STATUS.SERVER_ERROR: {
        // internal_server_error
        setResponseData(response);
        setErrorDetails({
          open: true,
          title: t("modal-handle-errors.server-error-title"),
          details: t("modal-handle-errors.server-error-details"),
        });
        break;
      }
    }
  };

  const handleDateRangeChange = (
    _dates: any,
    dateStrings: [string, string]
  ) => {
    const from = moment.utc(dateStrings[0]).format("YYYY-MM-DDTHH:mm:ss[Z]");
    const to = moment.utc(dateStrings[1]).format("YYYY-MM-DDTHH:mm:ss[Z]");

    handleFetch({ ...requestData, from, to });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetch(requestData);
      event.preventDefault();
    }
  };

  return (
    <div className="container">
      <div className="header poppins-semibold">{t("logo")}</div>
      <div className="content-container">
        {/* headers */}
        <div className="content-wrapper">
          <div className="content-header-wrapper">
            <div className="logo poppins-medium">{t("news")}</div>
            <div className="multilg">
              <Select
                size={"middle"}
                defaultValue={LANGUEAGE.EN}
                onChange={(value) => changeLanguage(value)}
                options={LANGUEAGE_OPTIONS.map((lang) => ({
                  label: lang,
                  value: lang,
                }))}
              />
            </div>
          </div>

          {/* search */}
          <div className="search-wrapper">
            <Input
              size="large"
              placeholder={t("search")}
              prefix={<SearchOutlined />}
              value={requestData.keywords}
              onChange={(e) => {
                if (!e.target.value) {
                  handleFetch({ ...requestData, keywords: e.target.value });
                }
                setRequestData({ ...requestData, keywords: e.target.value });
              }}
              onKeyPress={handleKeyPress}
            />
            <Select
              size={"large"}
              placeholder={t("categories")}
              value={requestData.categories ? requestData.categories : null}
              onChange={(value) =>
                handleFetch({ ...requestData, categories: value })
              }
              options={categories}
            />
            <div>
              <RangePicker
                style={{ width: "100%" }}
                size={"large"}
                picker="date"
                placeholder={[t("start-date"), t("end-date")]}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>

          {/* news list */}
          {responseData?.status === HTTP_STATUS.SUCCESS ? (
            <div className="news-wrapper">
              {responseData?.articles
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .map((items, index) => (
                  <div className="card-wrapper" key={index}>
                    <div className="image">
                      <img
                        src={`${items.image}`}
                        width={"100%"}
                        height={"100%"}
                      ></img>
                    </div>
                    <div className="details">
                      <p>{formatDate(items.publishedAt, requestData.lang)}</p>
                      <p className="poppins-medium">{items.title}</p>
                      <p className="poppins-regular">{items.description}</p>
                    </div>
                    <div className="bottom">{items.source.name}</div>
                  </div>
                ))}
            </div>
          ) : (
            <p></p>
          )}

          {/* pagination */}
          <div className="pagination-wrapper">
            <Pagination
              disabled={responseData?.status !== HTTP_STATUS.SUCCESS}
              defaultCurrent={PAGINATION.DEFAULT_CURRENT}
              current={page}
              pageSize={PAGINATION.PAGE_SIZE}
              total={responseData?.articles?.length || PAGINATION.DEFAULT_TOTAL}
              showSizeChanger={PAGINATION.SHOW_SIZR_CHANGER}
              onChange={(page) => setPage(page)}
            />
          </div>

          {/* modal handle error */}
          <Modal
            title={errorDetails.title}
            open={errorDetails.open}
            okText={t("modal-handle-errors.ok")}
            cancelText={t("modal-handle-errors.cancel")}
            onOk={() => {
              handleFetch({
                ...requestData,
                keywords: "",
                categories: "",
                from: "",
                to: "",
              });
              setErrorDetails({ ...errorDetails, open: false });
            }}
            onCancel={() => setErrorDetails({ ...errorDetails, open: false })}
            maskClosable={false}
          >
            <p>{errorDetails.details}</p>
          </Modal>
        </div>
      </div>
      <div className="footer">
        <div className="copy-right">{t("copyright")}</div>
        <div className="menu-footer">
          <a href="#">{t("privacy-policies")}</a>
          <a href="#">{t("term-of-use")}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
