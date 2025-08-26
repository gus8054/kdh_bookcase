import { getBookAPI, getUserBookContent } from "../apis";
import { v4 as uuidv4 } from "uuid";
import { routeGuard } from "../util";

const editBookLoader = async ({ params }) => {
  await routeGuard();
  const bookid = params.bookid;
  const userid = params.userid;
  try {
    const { data: googleData } = await getBookAPI.get(`/${bookid}`);
    const { data: serverData } = await getUserBookContent(userid, bookid);
    return {
      google_book_id: googleData?.id || null,
      book_title: googleData?.volumeInfo?.title || "데이터 없음",
      book_authors: googleData?.volumeInfo?.authors?.join("|") || null,
      book_thumbnail: `https://play.google.com/books/publisher/content/images/frontcover/${bookid}?fife=w480-h690`,
      rating: serverData.rating || 0,
      memo: serverData.memo || "",
      chapters: serverData?.chapters?.toSorted(
        (a, b) => a.position - b.position
      ) || [{ uuid: uuidv4(), position: 1, title: "", dialogOpen: false }],
    };
  } catch (err) {
    throw { message: "google api 오류", error: err };
  }
};
export default editBookLoader;
