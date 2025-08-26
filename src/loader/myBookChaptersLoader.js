import { getChapters } from "../apis";
import { routeGuard } from "../util";

const myBookChaptersLoader = async ({ params }) => {
  await routeGuard();
  const { userid, bookid } = params;
  try {
    const { data } = await getChapters(userid, bookid);
    return data;
  } catch (err) {
    throw { message: "google api 오류", error: err };
  }
};
export default myBookChaptersLoader;
