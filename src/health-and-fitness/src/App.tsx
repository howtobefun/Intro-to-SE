import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WorkoutPlans from "./pages/WorkoutPlans";
import WorkoutPlanDetails from "./pages/WorkoutPlanDetails";
import MyPlans from "./pages/MyPlans";
import MyPlansEdit from "./pages/MyPlansEdit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <MyPlans />
  </StrictMode>
);

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/workout-plans",
        element: <WorkoutPlans />,
      },
      {
        path: "/workout-plans/:id",
        element: <WorkoutPlanDetails />,
      },
      {
        path: "/my-plans",
        element: <MyPlans />,
      },
      {
        path: "/my-plans-edit/:id",
        element: <MyPlansEdit />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
