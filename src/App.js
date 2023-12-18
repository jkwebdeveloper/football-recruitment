import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HowWeWork from "./pages/HowWeWork";
import WhoWeAre from "./pages/WhoWeAre";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import SuccessFull from "./pages/SuccessFull";
// import FAQ from "./pages/FAQ";
import TermsAndCondition from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FindJob from "./pages/FindJob";
import JobDetails from "./pages/JobDetails";
import MyAccount from "./pages/MyAccount";
import Services from "./pages/Services";
import PrivateRoute from "./pages/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        {/* SignIn Form */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* SignUp Form */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/success" element={<SuccessFull />} />
        {/* <Route path="/faq" element={<FAQ />} /> */}
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/current-vacancies" element={<FindJob />} />
        <Route path="/job-detail/:id" element={<JobDetails />} />
        {/* My Account */}

        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
