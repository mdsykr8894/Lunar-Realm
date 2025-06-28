// src/routes/resources/authorsRoutes.tsx
import { Route } from "react-router-dom";
import AuthorList from "../pages/Admin/Content/Authors/AuthorList";

const authorRoutes = (
  <>
    <Route path="contents/authors" element={<AuthorList />} />
  </>
);

export default authorRoutes;
