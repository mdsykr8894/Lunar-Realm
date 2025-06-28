// src/routes/resources/genresRoutes.tsx
import { Route } from "react-router-dom";
import GenreList from "../pages/Admin/Content/Genres/GenreList";

const genreRoutes = (
  <>
    <Route path="contents/genres" element={<GenreList />} />
  </>
);

export default genreRoutes;
