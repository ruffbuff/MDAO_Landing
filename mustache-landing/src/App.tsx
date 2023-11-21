import { RouterProvider } from "react-router-dom";
import mainRouter from "routes";
import GlobalStyle from "style/globalStyle";

function App() {

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
