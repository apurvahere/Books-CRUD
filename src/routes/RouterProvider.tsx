import { FC, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, NotFoundPage } from "../pages";
import { ClipLoader } from "react-spinners";
import { Layout } from "../components";

const Homepage = lazy(() =>
  import("../pages").then((module) => module.Homepage)
);

const LogInPage = lazy(() => import("../pages").then((module) => module.LogIn));

const SignUpPage = lazy(() =>
  import("../pages").then((module) => module.SignUp)
);

const Dashboard = lazy(() =>
  import("../pages").then((module) => module.Dashboard)
);

const Book = lazy(() => import("../pages").then((module) => module.Book));
const Pintrest = lazy(() =>
  import("../pages").then((module) => module.Pinterest)
);
const Tic = lazy(() => import("../pages").then((module) => module.Tic));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <Homepage />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <LogInPage />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <SignUpPage />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <Dashboard />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/p",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <Pintrest />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tic",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <Tic />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/book/:id",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>
          <Book />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <NotFoundPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

export const AppRouter: FC = () => <RouterProvider router={router} />;
