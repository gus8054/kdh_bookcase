import axios from "axios";
import { reissueToken } from "./auth/authService";
import { useAuthStore } from "./auth/authStore";

export const getBookAPI = axios.create({
  method: "get",
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});

const serverAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터: access token을 붙임
serverAPI.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: access token 만료 시 refresh 후 재요청
serverAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // access token 만료 에러인지 확인 (예: 401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reissueToken();
        const token = useAuthStore.getState().accessToken;
        // 원래 요청에 새 access token을 붙여서 재요청
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return serverAPI(originalRequest);
      } catch (reFetchError) {
        const status = reFetchError.response?.status;
        const serverMessage = reFetchError.response?.data?.message;
        const message = reFetchError.message;
        return Promise.reject({ status, serverMessage, message });
      }
    }

    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    const message = error.message;
    return Promise.reject({ status, serverMessage, message });
  }
);

export const getUserBookContent = async (userId, bookId) => {
  const { data } = await serverAPI.get(`/users/${userId}/books/${bookId}`);
  return data;
};

export const checkAuthentication = async () => {
  await serverAPI.get("/token");
};

export const setChapters = async (userid, bookid, payload) => {
  await serverAPI.put(`/users/${userid}/books/${bookid}`, payload);
};

export const setSummary = async (userid, bookid, chapterUUID, payload) => {
  await serverAPI.put(
    `/users/${userid}/books/${bookid}/chapters/${chapterUUID}`,
    payload
  );
};

export const getSummary = async (userid, bookid, chapterUUID) => {
  const { data } = await serverAPI.get(
    `/users/${userid}/books/${bookid}/chapters/${chapterUUID}`
  );
  return data;
};

export const getUserBooks = async (userid) => {
  const { data } = await serverAPI.get(`/users/${userid}/books`);
  return data;
};

export const setReadCount = async (userid, bookid, read_count) => {
  await serverAPI.patch(`/users/${userid}/books/${bookid}`, read_count);
};

export const getChapters = async (userid, bookid) => {
  const { data } = await serverAPI.get(
    `/users/${userid}/books/${bookid}/chapters`
  );
  return data;
};

export const getChapter = async (userid, bookid, uuid) => {
  const { data } = await serverAPI.get(
    `/users/${userid}/books/${bookid}/chapters/${uuid}`
  );
  return data;
};

export const removeUser = async (userid) => {
  await serverAPI.delete(`/users/${userid}`);
};
