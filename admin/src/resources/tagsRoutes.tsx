// src/routes/resources/tagsRoutes.tsx
import { Route } from "react-router-dom";
import TagsList from "../pages/Admin/Content/Tags/TagList";

const tagRoutes = (
  <>
    <Route path="contents/tags" element={<TagsList />} />
  </>
);

export default tagRoutes;
