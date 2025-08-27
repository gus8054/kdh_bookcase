import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import EditBookPage from "./pages/EditBookPage/EditBookPage";
import MyPage from "./pages/MyPage/MyPage";
import { OAuthErrorPage } from "./pages/OAuthErrorPage/OAuthErrorPage";
import OAuthRegisterPage from "./pages/OAuthRegisterPage/OAuthRegisterPage";
import searchLoader from "./loader/searchLoader";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import bookDetailLoader from "./loader/bookDetailLoader";
import RequireAuth from "./auth/RequireAuth";
import editBookLoader from "./loader/editBookLoader";
import myLoader from "./loader/myLoader";
import MyBookChaptersPage from "./pages/MyBookChaptersPage/MyBookChaptersPage";
import myBookChaptersLoader from "./loader/myBookChaptersLoader";
import RequireNotAuth from "./auth/RequireNotAuth";
const router = createBrowserRouter(
  createRoutesFromElements(
    // 데이터 패칭 있을 때는 로더에서 라우트 가드(컴포넌트 보다 로더가 먼저 실행되니 불필요한 api호출발생), 없을땐 컴포넌트에서 가드(UI 부드러움)
    <Route element={<LayoutPage />}>
      {/* 데이터 패칭 없이 홈 화면 꾸미기  */}
      <Route
        index={true}
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      {/* 데이터 패칭 전에 토큰 재인증 구현완료.  */}
      <Route
        path="/search"
        element={<SearchPage />}
        loader={searchLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/books/:bookid"
        loader={bookDetailLoader}
        errorElement={<ErrorPage />}
        element={<BookDetailPage />}
      />
      <Route
        path="/users/:userid/books/:bookid/edit"
        loader={editBookLoader}
        element={<EditBookPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/users/:userid/books"
        loader={myLoader}
        element={<MyPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/users/:userid/books/:bookid/chapters"
        loader={myBookChaptersLoader}
        element={<MyBookChaptersPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/login"
        element={
          <RequireNotAuth>
            <LoginPage />
          </RequireNotAuth>
        }
      />
      <Route path="/oauth-register" element={<OAuthRegisterPage />} />
      <Route path="/oauth-login/error" element={<OAuthErrorPage />} />
      <Route path="*" element={<ErrorPage content="404 Not Found" />} />
    </Route>
  )
);
export default router;
