import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "../layout";
import Connections from "../pages/connections/page";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/connections" element={<Connections />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
