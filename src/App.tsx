import { Fragment } from "react";
import { AppRouter } from "./routes/RouterProvider";
import { PropsProvider } from "./context/PropsContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Fragment>
      <PropsProvider>
        <Toaster />
        <AppRouter />
      </PropsProvider>
    </Fragment>
  );
}

export default App;
