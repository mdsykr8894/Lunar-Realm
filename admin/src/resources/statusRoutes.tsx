// src/routes/resources/StatusRoutes.tsx
import { Route } from "react-router-dom";
import StatusList from "../pages/Admin/Content/Statuses/StatusList";

const statusRoutes = (
  <>
    <Route path="contents/status" element={<StatusList />} />
  </>
);

export default statusRoutes;
