import { getUserBooks } from "../apis";
import { routeGuard } from "../util";

const myLoader = async ({ params }) => {
  await routeGuard();
  const { userid } = params;
  try {
    const { data } = await getUserBooks(userid);
    const myBooks = data.map((mybook) => ({
      authors: mybook.authors || "데이터 없음",
      google_book_id: mybook.google_book_id,
      id: mybook.id,
      last_opened_at: mybook.last_opened_at,
      rating: mybook.rating,
      read_count: mybook.read_count || 0,
      thumbnail: mybook.thumbnail_url || null,
      title: mybook.title || "데이터 없음",
    }));
    return myBooks;
  } catch (err) {
    throw { message: "google api 오류", error: err };
  }
};
export default myLoader;
