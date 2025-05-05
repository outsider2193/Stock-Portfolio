import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  Menu,
  X,
  Play,
  Star,
  Check,
  ChevronRight,
  AlertTriangle,
  Zap,
  Shield,
  FileSpreadsheet,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ setFormType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();


  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-700">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900 shadow-md py-2 text-white" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setFormType("landing")}
                className="text-2xl font-heading font-bold text-white"
              >
            Portfolio Buddy
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-gray-300 hover:text-teal-400 transition-colors">
                Benefits
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-teal-400 transition-colors">
                Testimonials
              </a>
              {/* <a href="#pricing" className="text-gray-300 hover:text-teal-400 transition-colors">
                Pricing
              </a> */}
              <button
                onClick={() => navigate("/login")}
                className="text-teal-400 font-medium hover:text-teal-300 transition-colors"
              >
                Login
              </button>
              <motion.button
                onClick={() => navigate("/signup")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-400 transition-colors"
              >
                Sign Up
              </motion.button>
            </nav>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-gray-900"
              >
                <div className="px-4 py-4 flex flex-col space-y-4">
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-teal-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#benefits"
                    className="text-gray-300 hover:text-teal-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Benefits
                  </a>
                  <a
                    href="#testimonials"
                    className="text-gray-300 hover:text-teal-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Testimonials
                  </a>
                  {/* <a
                    href="#pricing" 
                    className="text-gray-300 hover:text-teal-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </a> */}
                  <button
                    onClick={() => {
                      setFormType("login");
                      setIsOpen(false);
                    }}
                    className="text-teal-400 font-medium hover:text-teal-300 transition-colors py-2 text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setFormType("signup");
                      setIsOpen(false);
                    }}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-400 transition-colors text-center"
                  >
                    Sign Up
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-900 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
              variants={fadeIn}
            >
              Master Your Stock Portfolio
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Real-time tracking, powerful analytics, and personalized insights for smarter investing.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={fadeIn}
            >
              <motion.button
                onClick={() => navigate("/signup")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-400 transition-all shadow-md"
              >
                Get Started
              </motion.button>
              {/* <motion.a
                href="#demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center gap-2"
              >
                <Play size={16} /> Watch Demo
              </motion.a> */}
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/istockphoto-1317587887-612x612.jpg" // Ensure this image is in public/
            alt="Stock Portfolio Dashboard Preview"
            className="rounded-xl shadow-2xl w-full"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Empower your investment strategy with these powerful tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="text-teal-500" size={32} />}
              title="Real-Time Tracking"
              description="Monitor your portfolio with live updates and performance metrics."
              delay={0}
            />
            <FeatureCard
              icon={<Eye className="text-teal-500" size={32} />}
              title="Custom Watchlists"
              description="Create tailored watchlists with price alerts and notifications."
              delay={0.1}
            />
            <FeatureCard
              icon={<PieChart className="text-teal-500" size={32} />}
              title="Portfolio Analysis"
              description="Analyze performance with detailed charts and ROI insights."
              delay={0.2}
            />
            <FeatureCard
              icon={<FileText className="text-teal-500" size={32} />}
              title="Transaction History"
              description="Access detailed trade logs and tax-ready reports."
              delay={0.3}
            />
            <FeatureCard
              icon={<DollarSign className="text-teal-500" size={32} />}
              title="Dividend Management"
              description="Track dividends and optimize reinvestment strategies."
              delay={0.4}
            />
            <FeatureCard
              icon={<TrendingUp className="text-teal-500" size={32} />}
              title="Market Insights"
              description="Stay updated with curated news and market trends."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                See StockMaster in Action
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Experience a seamless dashboard with real-time data and advanced analytics.
              </p>

              <div className="space-y-6">
                <DemoFeature
                  title="Real-Time Dashboard"
                  description="View live portfolio updates and performance metrics."
                />
                <DemoFeature
                  title="Customizable Insights"
                  description="Tailor your analytics to focus on key investment areas."
                />
                <DemoFeature
                  title="Actionable Alerts"
                  description="Receive notifications for market changes and opportunities."
                />
              </div>

              {/* <motion.a
                href="#demo-request"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-teal-500 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-400 transition-all flex items-center gap-2"
              >
                Request Demo <ChevronRight size={16} />
              </motion.a> */}
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="/images.jpg" // Ensure this image is in public/
                  alt="Dashboard Interface"
                  className="rounded-xl shadow-xl w-full"
                />
                <motion.div
                  className="absolute -top-4 -right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-medium">Portfolio Value</span>
                  <div className="text-2xl font-bold">$150,000</div>
                  <div className="text-white flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +8.7%
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose StockMaster</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Elevate your investment game with our cutting-edge platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <BenefitCard
              icon={<Zap className="text-teal-500" size={32} />}
              title="Real-Time Data"
              description="Access live market data to stay ahead of trends."
              delay={0}
            />
            <BenefitCard
              icon={<Clock className="text-teal-500" size={32} />}
              title="Time-Saving Tools"
              description="Automate analysis and focus on strategic decisions."
              delay={0.1}
            />
            <BenefitCard
              icon={<AlertTriangle className="text-teal-500" size={32} />}
              title="Risk Assessment"
              description="Identify risks with advanced predictive analytics."
              delay={0.2}
            />
            <BenefitCard
              icon={<FileSpreadsheet className="text-teal-500" size={32} />}
              title="Tax Optimization"
              description="Simplify tax reporting with automated calculations."
              delay={0.3}
            />
            <BenefitCard
              icon={<Eye className="text-teal-500" size={32} />}
              title="Full Transparency"
              description="Get clear insights into all your investments."
              delay={0.4}
            />
            <BenefitCard
              icon={<Shield className="text-teal-500" size={32} />}
              title="Secure Platform"
              description="Protect your data with top-tier security measures."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hear from investors who transformed their strategies with StockMaster.
            </p>
          </motion.div>

          <TestimonialSlider />
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Select a plan that suits your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Basic"
              price="$0"
              description="Perfect for beginners"
              features={[
                "Track up to 5 stocks",
                "Basic performance metrics",
                "Daily market updates",
              ]}
              buttonText="Get Started"
              buttonAction={() => navigate("/signup")}
              highlighted={false}
              delay={0}
            />
            <PricingCard
              title="Pro"
              price="$19"
              period="/mo"
              description="Ideal for active investors"
              features={[
                "Unlimited stock tracking",
                "Advanced analytics",
                "Real-time alerts",
                "Tax reporting",
                "Priority support",
              ]}
              buttonText="Start Trial"
              buttonAction={() => navigate("/signup")}
              highlighted={true}
              delay={0.1}
            />
            <PricingCard
              title="Premium"
              price="$49"
              period="/mo"
              description="For professional traders"
              features={[
                "All Pro features",
                "Custom API access",
                "Advanced backtesting",
                "Dedicated support",
                "Exclusive insights",
              ]}
              buttonText="Start Trial"
              buttonAction={() => navigate("/signup")}
              highlighted={false}
              delay={0.2}
            />
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Start Mastering Your Investments Today
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of investors who trust StockMaster for their portfolio success.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => navigate("/signup")}
                className="bg-teal-500 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-400 transition-colors inline-block"
              >
                Start Free Trial
              </button>
            </motion.div>
            <p className="mt-4">No credit card required. Cancel anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">StockMaster</h3>
              <p className="mb-4">Advanced tools for tracking and optimizing your stock portfolio.</p>
              <div className="flex space-x-4">
                <SocialIcon href="#" icon="twitter" />
                <SocialIcon href="#" icon="facebook" />
                <SocialIcon href="#" icon="linkedin" />
                <SocialIcon href="#" icon="instagram" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-heading font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#pricing">Pricing</FooterLink>
                <FooterLink href="#testimonials">Testimonials</FooterLink>
                <FooterLink href="#demo">Demo</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-heading font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <FooterLink href="#about">About Us</FooterLink>
                <FooterLink href="#careers">Careers</FooterLink>
                <FooterLink href="#blog">Blog</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-heading font-semibold text-white mb-4">Stay Updated</h4>
              <p className="mb-4">Subscribe for the latest market insights and updates.</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition-colors"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} StockMaster. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#terms" className="hover:text-teal-400 transition-colors">
                Terms
              </a>
              <a href="#privacy" className="hover:text-teal-400 transition-colors">
                Privacy
              </a>
              <a href="#security" className="hover:text-teal-400 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

// Demo Feature Component
const DemoFeature = ({ title, description }) => (
  <motion.div
    className="flex gap-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="mt-1 bg-teal-500/20 text-teal-500 rounded-full p-1">
      <Check size={18} />
    </div>
    <div>
      <h4 className="font-heading font-semibold">{title}</h4>
      <p className="text-gray-700">{description}</p>
    </div>
  </motion.div>
);

// Benefit Card Component
const BenefitCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="mb-4 bg-teal-500/10 p-4 rounded-full">{icon}</div>
    <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

// Testimonial Slider Component
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "John Doe",
      role: "Individual Investor",
      image: "/John Doe.jpg", // Ensure this image is in public/
      quote: "StockMaster has revolutionized my trading strategy with real-time data and insights.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Day Trader",
      image: "/Jane Smith.jpg", // Ensure this image is in public/
      quote: "The analytics tools are top-notch, saving me hours of manual work.",
      rating: 4,
    },
    {
      name: "Mike Lee",
      role: "Financial Advisor",
      image: "/Mike Lee.jpg", // Ensure this image is in public/
      quote: "Highly recommend for its ease of use and robust features.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <div className="flex mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].quote}"</p>
            <h4 className="font-heading font-bold">{testimonials[currentIndex].name}</h4>
            <p className="text-gray-700">{testimonials[currentIndex].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-teal-500" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ title, price, period, description, features, buttonText, buttonAction, highlighted, delay = 0 }) => (
  <motion.div
    className={`rounded-xl overflow-hidden ${
      highlighted ? "border-2 border-teal-500 shadow-xl relative" : "border border-gray-200 shadow-md"
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
  >
    {highlighted && (
      <div className="bg-teal-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {period && <span className="text-gray-700 ml-1">{period}</span>}
      </div>
      <p className="text-gray-700 mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={buttonAction}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`block w-full text-center py-2 px-4 rounded-md font-medium transition-colors ${
          highlighted
            ? "bg-teal-500 text-white hover:bg-teal-400"
            : "bg-white text-teal-500 border border-teal-500 hover:bg-teal-500/10"
        }`}
      >
        {buttonText}
      </motion.button>
    </div>
  </motion.div>
);

// Social Icon Component
const SocialIcon = ({ href, icon }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.2, color: "#14b8a6" }}
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-500 transition-colors"
    aria-label={`Follow us on ${icon}`}
  >
    <span className="sr-only">{icon}</span>
    <div className="w-5 h-5 bg-white rounded-sm"></div> {/* Placeholder; replace with actual icons */}
  </motion.a>
);

// Footer Link Component
const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="hover:text-teal-400 transition-colors">
      {children}
    </a>
  </li>
);

export default LandingPage;