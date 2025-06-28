// src/routes/resources/mediaRoutes.tsx
import { Route } from "react-router-dom";
import MediaList from "../pages/Admin/Management/Media/MediaList";

const mediaRoutes = (
  <>
    <Route path="management/media" element={<MediaList />} />
  </>
);

export default mediaRoutes;
