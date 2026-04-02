import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Button from "./components/Button.jsx";
import Footer from "./components/footer.jsx";
import OurServices from "./components/Our_services.jsx";
import Subscription from "./components/Subscription.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Testimonials from "./components/Testimonials.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Services from "./pages/Services.jsx";
import ServiceCard from "./components/ServiceCard.jsx";
import OilChange from "./pages/OilChange";
import BookingForm from "./components/BookingForm";
import AccidentalRepair from "./pages/AccidentalRepair";
import Contact from "./pages/Contact";


import "./App.css";
import SpareParts from "./pages/SpareParts.jsx";
import RSAServicePage from "./pages/RSAServicePage.jsx";
import EngineRepairPage from "./pages/EngineRepairPage.jsx";
import TireServices from "./pages/TireServices.jsx";
import Team from "./pages/Team.jsx";
import Careers from "./pages/Careers.jsx";
import Blog from "./pages/Blog.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import Register from "./pages/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <WhyChooseUs />
              <HowItWorks />
              <OurServices />
              <Testimonials />
              <Subscription /> 
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/oil-change" element={<OilChange />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/services/accidental-repair" element={<AccidentalRepair />} />
        <Route path="/services/spare-parts" element={<SpareParts />} />
        <Route path="/services/ras-service-page" element={<RSAServicePage />}/>
        <Route path="/services/engine-repair" element={<EngineRepairPage />} />
        <Route path="/services/tire-services" element={<TireServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />}/>
        <Route path="/careers" element={<Careers />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/login" element={<Login />}/>  
        {/* <Route path="/"  */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
