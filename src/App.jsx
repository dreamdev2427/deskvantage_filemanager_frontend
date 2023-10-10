import { StrictMode, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";

import { Spinner } from "@material-tailwind/react";

import { EventBus } from "./utils/function";
import { PREVENT_SELECT, SET_LOADING } from "./utils/constant";

function App() {
  const pages = useRoutes(Routes);

  const [isLoading, setIsLoading] = useState(false);
  const [isPreventSelect, setIsPreventSelect] = useState(false);

  const setLoading = (data) => {
    setIsLoading(data);
  };

  useEffect(() => {
    EventBus.on(PREVENT_SELECT, (flag) => setIsPreventSelect(flag));
    EventBus.on(SET_LOADING, (data) => {
      setLoading(data);
      setIsPreventSelect(data);
    });

    return () => {
      EventBus.remove(PREVENT_SELECT);
      EventBus.remove(SET_LOADING);
    };
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        <div className={`${isPreventSelect ? "select-none" : ""} w-full`}>
          {pages}
        </div>
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 999,
            top: 0,
            left: 0,
            display: `${isLoading ? "flex" : "none"}`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner color="blue" className="h-10 w-10" />
        </div>
      </Provider>
    </StrictMode>
  );
}

export default App;
