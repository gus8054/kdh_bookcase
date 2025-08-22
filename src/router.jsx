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
import MyBookPage from "./pages/MyBookPage/MyBookPage";
import RequireAuth from "./auth/RequireAuth";
import RequireNotAuth from "./auth/RequireNotAuth";
import { OAuthErrorPage } from "./pages/OAuthErrorPage/OAuthErrorPage";
import OAuthRegisterPage from "./pages/OAuthRegisterPage/OAuthRegisterPage";
import { NotFound } from "./pages/NotFound/NotFound";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayoutPage />}>
      <Route
        index={true}
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/books/:bookid"
        element={
          <RequireAuth>
            <BookDetailPage />
          </RequireAuth>
        }
      />
      <Route
        path="/users/:userid/books/:bookid/edit"
        element={
          <RequireAuth>
            <EditBookPage />
          </RequireAuth>
        }
      />
      <Route
        path="/users/:userid/books"
        element={
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        }
      />
      <Route
        path="/users/:userid/books/:bookid"
        element={
          <RequireAuth>
            <MyBookPage />
          </RequireAuth>
        }
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
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export default router;
