import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { theme } from "./store/theme.ts";
import ThemeComponent from "./components/ThemeComponent.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.tsx";

export const MainApp = () => {
  const ThemeMode = useRecoilValue(theme);

  return (
    <main
      className={`${ThemeMode} text-foreground bg-background h-screen w-full`}
    >
      <Routes>
        <Route path="/" element={<App />} />
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
