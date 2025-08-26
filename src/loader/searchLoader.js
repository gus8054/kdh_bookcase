import axios from "axios";
import { routeGuard } from "../util";

const googleSearchAPI = axios.create({
  method: "get",
  baseURL: "https://www.googleapis.com/books/v1/volumes",
  params: {
    printType: "books",
    langRestrict: "ko",
    orderBy: "newest",
    maxResults: 20,
    startIndex: 0,
  },
});

const searchLoader = async ({ request }) => {
  await routeGuard();
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get("q");
  if (!keyword) return [];
  try {
    const { data } = await googleSearchAPI.get("", {
      params: {
        q: `${keyword} intitle:${keyword}`,
      },
    });
    const books = data.items.map((item) => ({
      id: item?.id,
      title: item?.volumeInfo?.title || "데이터 없음",
      authors: item?.volumeInfo?.authors || ["데이터 없음"],
      publisher: item?.volumeInfo?.publisher || "데이터 없음",
      publishedDate: item?.volumeInfo?.publishedDate || "데이터 없음",
      pageCount: item?.volumeInfo?.pageCount || "데이터 없음",
      thumbnail: item?.volumeInfo?.imageLinks?.thumbnail,
    }));
    return books;
  } catch (err) {
    throw { message: "google api 오류", error: err };
  }
};
export default searchLoader;
