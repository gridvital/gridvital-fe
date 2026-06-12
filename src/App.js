import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UserLogin from "./screens/UserLogin/UserLogin";
import UserSignUp from "./screens/UserLogin/UserSignUp";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./routes/ProtectedLayout";
import Dashboard from "./screens/MainDashboard/MainDashboard";
import QRPatientAppointment from "./screens/PatientScreen/Appointment/Appointment";
import AppointmentSuccess from "./screens/PatientScreen/Appointment/AppointmentSuccess";
import ClinicPatientsList from "./screens/ClinicPatients/ClinicPatientsList/ClinicPatientsList";
import ClinicProfile from "./screens/ClinicProfile/ClinicProfile";
import CompleteProfile from "./screens/CompleteProfile/CompleteProfile";
import OPSLogin from "./screens/OPSScreen/OPSLogin/OPSLogin";
import OPSClinicsList from "./screens/OPSScreen/OPSClinicsList/OPSClinicsList";
import OPSClinicDetail from "./screens/OPSScreen/OPSClinicDetail/OPSClinicDetail";
import OPSRegisterRM from "./screens/OPSScreen/OPSRegisterRM/OPSRegisterRM";
import HomePage from "./screens/HomePage/HomePage";
import TermsPage from "./screens/PolicyPages/TermsPage";
import PrivacyPage from "./screens/PolicyPages/PrivacyPage";
import RefundPage from "./screens/PolicyPages/RefundPage";
import ContactPage from "./screens/PolicyPages/ContactPage";
import AboutPage from "./screens/PolicyPages/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
        containerStyle={{
          zIndex: 99999999,
        }}
      />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/refund-policy" element={<RefundPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<UserSignUp />} />
          <Route path="/book-appointment" element={<QRPatientAppointment />} />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />
          <Route path="/opslogin" element={<OPSLogin />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patient-list" element={<ClinicPatientsList />} />
            <Route path="/Profile" element={<ClinicProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/ops/clinics" element={<OPSClinicsList />} />
          <Route path="/ops/clinics/:id" element={<OPSClinicDetail />} />
          <Route path="/ops/register-rm" element={<OPSRegisterRM />} />
        </Route>

        <Route path="*" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
