import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ToastNotification from "./components/ToastNotification.jsx";
import Loader from "./components/Loader.jsx";
import LandingPage from "./LandingPage.jsx"; // Adjusted import path
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [formType, setFormType] = useState("landing"); // Default to landing page
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [userProfile, setUserProfile] = useState({
    id: "USR123",
    name: "Alexander Mitchell",
    email: "alexander.mitchell@example.com",
    portfolioScore: 87.5,
    activePortfolios: 3,
    recentTransactions: [
      { id: "TRX1", type: "buy", amount: 5000, company: "TechVision Global", date: "2025-03-24" },
      { id: "TRX2", type: "sell", amount: 3000, company: "GreenEnergy Solutions", date: "2025-03-23" },
    ],
  });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleLogout = () => {
    showToast("Successfully logged out", "success");
    setFormType("landing"); // Return to landing page on logout
  };

  const renderForm = () => {
    switch (formType) {
      case "landing":
        return <LandingPage setFormType={setFormType} />;
      case "signup":
        return <Signup setFormType={setFormType} setIsLoading={setIsLoading} showToast={showToast} />;
      case "login":
        return <Login setFormType={setFormType} setIsLoading={setIsLoading} showToast={showToast} />;
      case "forgot":
        return <ForgotPassword setFormType={setFormType} setIsLoading={setIsLoading} showToast={showToast} />;
      case "change":
        return <ChangePassword setFormType={setFormType} setIsLoading={setIsLoading} showToast={showToast} />;
      case "dashboard":
        return (
          <Dashboard
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onLogout={handleLogout}
            showToast={showToast}
          />
        );
      default:
        return <LandingPage setFormType={setFormType} />; // Fallback to landing page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading && <Loader />}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
      {renderForm()}
    </div>
  );
};

export default App;