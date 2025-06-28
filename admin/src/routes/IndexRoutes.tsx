// src/routes/IndexRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import Setting from "../pages/Admin/Setting/Setting";
import novelRoutes from "../resources/novelsRoutes";
import chapterRoutes from "../resources/chaptersRoutes";
import genreRoutes from "../resources/genresRoutes";
import tagRoutes from "../resources/tagsRoutes";
import languageRoutes from "../resources/languagesRoutes";
import authorRoutes from "../resources/authorsRoutes";
import statusRoutes from "../resources/statusRoutes";
import mediaRoutes from "../resources/mediaRoutes";
import userRoutes from "../resources/usersRoutes";

const IndexRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Setting />} />

        {novelRoutes}
        {chapterRoutes}
        {genreRoutes}
        {tagRoutes}
        {languageRoutes}
        {authorRoutes}
        {statusRoutes}
        {mediaRoutes}
        {userRoutes}
      </Route>
    </Routes>
  );
};

export default IndexRoutes;
