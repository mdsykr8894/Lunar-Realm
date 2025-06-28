// src/routes/resources/languagesRoutes.tsx
import { Route } from "react-router-dom";
import LanguageList from "../pages/Admin/Content/Languages/LanguageList";

const languageRoutes = (
  <>
    <Route path="contents/languages" element={<LanguageList />} />
  </>
);

export default languageRoutes;
