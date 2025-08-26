import DOMPurify from "dompurify";
import { getBookAPI } from "../apis";
import { routeGuard } from "../util";

const bookDetailLoader = async ({ params }) => {
  await routeGuard();
  const bookid = params.bookid;
  try {
    const { data } = await getBookAPI.get(`/${bookid}`);
    let description = "데이터 없음";
    if (data?.volumeInfo?.description) {
      description = DOMPurify.sanitize(data.volumeInfo.description);
    }
    const book = {
      id: data?.id,
      title: data?.volumeInfo?.title || "데이터 없음",
      subtitle: data?.volumeInfo?.subtitle,
      authors: data?.volumeInfo?.authors || ["데이터 없음"],
      publisher: data?.volumeInfo?.publisher || "데이터 없음",
      publishedDate: data?.volumeInfo?.publishedDate || "데이터 없음",
      description,
      pageCount: data?.volumeInfo?.pageCount || "데이터 없음",
      categories: data?.volumeInfo?.categories || [],
      thumbnail: data?.volumeInfo?.imageLinks?.thumbnail,
      buyLink: data?.volumeInfo?.previewLink,
      canonicalVolumeLink: data?.volumeInfo?.canonicalVolumeLink,
      webReaderLink: data?.accessInfo?.webReaderLink,
    };
    return book;
  } catch (err) {
    throw { message: "google api 오류", error: err };
  }
};
export default bookDetailLoader;
