import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { theme } from "./store/theme.ts";
import ThemeComponent from "./components/ThemeComponent.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
const Auth = React.lazy(() => import("./pages/Auth.tsx"));
const App = React.lazy(() => import("./App.tsx"));
const Home = React.lazy(() => import("./pages/Home.tsx"));
const Post = React.lazy(() => import("./pages/Post.tsx"));
const User = React.lazy(() => import("./pages/User.tsx"));
const Feed = React.lazy(() => import("./pages/Feed.tsx"));

export const MainApp = () => {
  const ThemeMode = useRecoilValue(theme);

  return (
    <main
      className={`${ThemeMode} text-foreground bg-background h-screen w-full`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />}>
            <Route index element={<Feed />} />
            <Route path="posts" element={<Post />} />x
            <Route path="users" element={<User />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
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
