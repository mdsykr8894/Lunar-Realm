// src/routes/resources/usersRoutes.tsx
import { Route } from "react-router-dom";
import UserList from "../pages/Admin/Management/Users/UserList";
import UserShow from "../pages/Admin/Management/Users/UserShow";
import UserCreate from "../pages/Admin/Management/Users/UserCreate";
import UserEdit from "../pages/Admin/Management/Users/UserEdit";

const userRoutes = (
  <>
    <Route path="management/users" element={<UserList />} />
    <Route path="management/users/create" element={<UserCreate />} />
    <Route path="management/users/:userId" element={<UserShow />} />
    <Route path="management/users/:userId/edit" element={<UserEdit />} />
  </>
);

export default userRoutes;
