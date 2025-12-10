import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Route/Routes";

const App = () => {
  return (
    <div className="mx-auto mt-2">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
