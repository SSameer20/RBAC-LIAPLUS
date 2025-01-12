import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { theme } from "./store/theme.ts";
import ThemeComponent from "./components/ThemeComponent.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Post from "./pages/Post.tsx";
import User from "./pages/User.tsx";
import Feed from "./pages/Feed.tsx";

export const MainApp = () => {
  const ThemeMode = useRecoilValue(theme);

  return (
    <main
      className={`${ThemeMode} text-foreground bg-background h-screen w-full`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />}>
          <Route index element={<Feed />} />
          <Route path="user/posts" element={<Post />} />
          <Route path="admin/posts" element={<Post />} />
          <Route path="admin/users" element={<User />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ThemeComponent className="absolute bottom-0 right-0 m-10" />
    </main>
  );
};

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <NextUIProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </NextUIProvider>
  </RecoilRoot>
);
