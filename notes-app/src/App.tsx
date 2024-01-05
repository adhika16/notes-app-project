import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./helpers/auth0-provider-with-navigate";
import { AuthenticationGuard } from "./helpers/authentication-guard";
import NotePage from "./pages/note-page";
import PublicPage from "./pages/public-page";

function App() {  
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/note" element={<AuthenticationGuard component={NotePage} />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;
