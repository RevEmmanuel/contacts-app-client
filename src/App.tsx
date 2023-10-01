import React from 'react';
import RootNavigation from "./navigation";
import {persistor, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "react-query";
import authService from "./services/auth.service";
import {Toaster} from "react-hot-toast";

interface IProps {
}

const queryClient = new QueryClient();

function App(props: IProps) {
  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={async () => await authService.reAuthenticate()}
        loading={<></>}
        persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RootNavigation/>
          <Toaster toastOptions={{
            position: "bottom-left",
            duration: 10_000,
          }}/>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
