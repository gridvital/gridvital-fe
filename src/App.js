import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UserLogin from "./screens/UserLogin/UserLogin";
import UserSignUp from "./screens/UserLogin/UserSignUp";
import DigitalGold from "./screens/DigitalGold/DigitalGoldRoutes";
import Dashboard from "./screens/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import Profile from "./screens/UserProfile/Profile";
import ProtectedLayout from "./routes/ProtectedLayout";
import MainDashboard from "./screens/MainDashboard/MainDashboard";
import QRPatientAppointment from './screens/PatientScreen/Appointment/Appointment'
import AppointmentSuccess from './screens/PatientScreen/Appointment/AppointmentSuccess'
import ClinicPatientsList from "./screens/ClinicPatients/ClinicPatientsList/ClinicPatientsList";
import ClinicProfile from "./screens/ClinicProfile/ClinicProfile"
import CompleteProfile from "./screens/CompleteProfile/CompleteProfile"

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
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserSignUp />} />
          <Route path="/book-appointment" element={<QRPatientAppointment />} />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/patient-list" element={<ClinicPatientsList />} />
            <Route path="/digitalGold/*" element={<DigitalGold />} />
            <Route path="/Profile" element={<ClinicProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
