import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import HomePage from "./HomePage/HomePage";
import SearchPage from "./SearchPage/SearchPage";
import LayoutPage from "./LayoutPage/LayoutPage";
import LoginPage from "./LoginPage/LoginPage";
import BookDetailPage from "./BookDetailPage/BookDetailPage";
import EditBookPage from "./EditBookPage/EditBookPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LayoutPage />}>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/books/:bookid" element={<BookDetailPage />} />
        <Route
          path="/users/:userid/books/:bookid/edit"
          element={<EditBookPage />}
        />
      </Route>
      {/* <Route path="/users/:userid"/>
      <Route path="/users/:userid/books" />
      <Route path="/users/:userid/books/:bookid"/>
      <Route path="/login" element={<LoginPage />} /> */}
    </>
  )
);
export default router;
