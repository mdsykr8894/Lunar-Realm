// src/routes/resources/novelsRoutes.tsx
import { Route } from "react-router-dom";
import NovelList from "../pages/Admin/Content/Novels/NovelList";

const novelRoutes = (
  <>
    <Route path="contents/novels" element={<NovelList />} />
  </>
);

export default novelRoutes;
