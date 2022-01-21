import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Provider} from 'react-redux';
import {store, persistor} from "./services/store";
import {PersistGate} from 'redux-persist/integration/react'
import {CrudProvider} from "@crud/react";
import {AlertDialog, ConfirmDialog, NotifySnackbar, ProgressIndicator, PromptDialog} from "react-material-crud";
import {crud} from "./services/crud";
import './App.css';
import Route from "./Routing/Route";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <CrudProvider crud={crud}>
                        <ProgressIndicator/>
                        <Route/>
                        <NotifySnackbar autoHideDuration={2000}/>
                        <AlertDialog/>
                        <PromptDialog/>
                        <ConfirmDialog/>
                    </CrudProvider>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
