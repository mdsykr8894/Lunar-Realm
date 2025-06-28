// src/routes/resources/chaptersRoutes.tsx
import { Route } from "react-router-dom";
import ChapterList from "../pages/Admin/Content/Chapters/ChapterList";

const chapterRoutes = (
  <>
    <Route path="contents/chapters" element={<ChapterList />} />
  </>
);

export default chapterRoutes;
