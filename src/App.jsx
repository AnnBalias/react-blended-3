import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'))
const SearchCountry = lazy(() => import('./pages/SearchCountry'))
const Country = lazy(() => import('./pages/Country'))

import Header from "./components/Header/Header";

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<SearchCountry />} />
          <Route path="/country/:countryId" element={<Country />} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </Suspense>
    </>
  );
};
