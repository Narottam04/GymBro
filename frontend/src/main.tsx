import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Login from "./pages/Login.tsx";
import AllExercise from "./pages/AllExercise.tsx";
import Sidebar from "./components/lvl2Comps/Sidebar.tsx";
import ExerciseDetails from "./pages/ExerciseDetails.tsx";
import Signup from "./pages/Signup.tsx";
// import ProtectedRoute from "./components/ProtectedRoute.tsx";
// import AuthContextProvider from "./context/AuthContext.tsx";
import Dashbaord from "./pages/Dashbaord.tsx";
import SearchExercise from "./pages/SearchExercise.tsx";
import UserAllWorkout from "./pages/UserAllWorkout.tsx";
import UserWorkout from "./pages/UserWorkout.tsx";
import Chatbot from "./pages/Chatbot.tsx";
import Social from "./pages/Social.tsx";
import SocialCreatePost from "./pages/SocialCreatePost.tsx";
import SocialPostDetails from "./pages/SocialPostDetails.tsx";
import FilterExercise from "./pages/FilterExercise.tsx";
import FilterExerciseContextProvider from "./context/FilterExerciseContext.tsx";
import LogWorkout from "./pages/LogWorkout.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Sidebar />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashbaord />
      }
    ]
  },
  {
    path: "/app",
    element: (
      // <ProtectedRoute>
      <Sidebar />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "exercise",
        element: <AllExercise />
      }
    ]
  },
  {
    path: "/app/exercise",
    element: (
      // <ProtectedRoute>
      <Sidebar />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "search",
        element: <SearchExercise />
      }
    ]
  },
  {
    path: "/app/exercise",
    element: (
      // <ProtectedRoute>
      <Sidebar />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "filter",
        element: <FilterExercise />
      }
    ]
  },
  {
    path: "/app/exercise",
    element: <Sidebar />,
    children: [
      {
        path: ":id",
        element: <ExerciseDetails />
      }
    ]
  },
  {
    path: "/app/exercise",
    element: <Sidebar />,
    children: [
      {
        path: "workout",
        element: <UserAllWorkout />
      }
    ]
  },
  {
    path: "/app/exercise/workout",
    element: <Sidebar />,
    children: [
      {
        path: ":id",
        element: <UserWorkout />
      }
    ]
  },
  {
    path: "/app/exercise/workout/log",
    element: <Sidebar />,
    children: [
      {
        path: ":id",
        element: <LogWorkout />
      }
    ]
  },
  {
    path: "/app/chatbot",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <Chatbot />
      }
    ]
  },
  {
    path: "/app/social",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <Social />
      }
    ]
  },
  {
    path: "/app/social/new",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <SocialCreatePost />
      }
    ]
  },
  {
    path: "/app/social",
    element: <Sidebar />,
    children: [
      {
        path: ":id",
        element: <SocialPostDetails />
      }
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <AuthContextProvider> */}
      <FilterExerciseContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </FilterExerciseContextProvider>
      {/* </AuthContextProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
