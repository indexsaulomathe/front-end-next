// @/pages/_app.tsx or wherever your main app component is located
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toastConfig from "@/config/toastConfig";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer {...toastConfig} />{" "}
    </Provider>
  );
}

export default MyApp;
