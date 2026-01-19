import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
import Protected from "./pages/Protected";

// Implementation of lazy loading/ code splitting
// whenever vite(webpack) will see this, it will split the code
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import { CitiesProvider } from "./contexts/citiescontext";
import { AuthProvider } from "./contexts/authcontext";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* BroserRouter is kind of like a box on the web screen, to render different things
        just a react router dom syntax to be followed. Inside browser router different components will be displayed and changed. */}
        <BrowserRouter>
          {/* Suspense will suspend the routing when the page is being fetched in the backend due to lazy loading, in the meantime, it will show the spinner */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              {/* writing index means, it is the default path of the app */}
              <Route index element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              {/* Whenever the url mathces '/product' render the Product element/page/component */}
              <Route
                path="app"
                element={
                  <Protected>
                    <AppLayout />
                  </Protected>
                }
              >
                {/* localhost:3000/app/ after this url, react router will further find the child urls and display component where <Outlet /> is written
              Usually outlet is written in the parent component.In this app, it is inside App Layout -> Sidebar component.
               */}
                {/* Navigate to="cities" will replace the url to app/cities and then the CityList component will be rendered
               Without the replace word, the back button of the browser will not work.
               */}
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                {/* www.something.com/app/cities/lisbon?lat=2&lng=4 */}
                {/*        --Domain--/--path--/--params--/--queryString--     */}
                {/* If there is something after /app/cities then render the City component */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>

          </Suspense>

        </BrowserRouter>
        
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
