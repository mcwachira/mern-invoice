"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  FileText,
  Receipt,
  Calculator,
  Clock,
  Shield,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Download,
  Globe,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Professional Invoices",
      description:
        "Create stunning, professional invoices in seconds with customizable templates and automated calculations.",
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "Digital Receipts",
      description:
        "Generate instant digital receipts for all transactions with automatic tax calculations and customer details.",
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Smart Quotations",
      description:
        "Build detailed quotations with line items, discounts, and terms that convert prospects into customers.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description:
        "Track your business performance with detailed insights on revenue, outstanding payments, and customer trends.",
    },
  ];

  const benefits = [
    "Save 5+ hours per week on paperwork",
    "Get paid 40% faster with automated reminders",
    "Reduce billing errors by 95%",
    "Professional brand image",
    "Real-time payment tracking",
    "Multi-currency support",
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "MERN Invoice transformed how I handle billing. What used to take hours now takes minutes!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Small Business Owner",
      content:
        "The automated reminders alone have improved my cash flow by 40%. Absolutely essential tool.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Consultant",
      content:
        "Clean, professional invoices that make my business look established. My clients love the easy payment options.",
      rating: 5,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <Zap className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-emerald-300 text-sm font-medium">
                  Trusted by 10,000+ businesses worldwide
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                MERN{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  INVOICE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                Whatever business you run, creating invoices, receipts, and
                quotations is made easy with our app.
              </p>

              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who save time, get paid faster,
                and grow their business with professional billing automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button
                  onClick={() => router.push("/auth/register")}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  <Download className="mr-2 w-5 h-5" />
                  View Demo
                </Button>
              </div>

              <div className="text-center text-gray-400">
                <p className="text-sm mb-4">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
                <div className="flex justify-center items-center space-x-6 text-xs">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-emerald-400" />
                    Bank-level security
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1 text-emerald-400" />
                    150+ countries
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-1 text-emerald-400" />
                    Mobile ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything you need to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {" "}
                  streamline billing
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Powerful features designed to save you time and help you get
                paid faster
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-emerald-400 mb-4 group-hover:text-emerald-300 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Why businesses choose
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    MERN Invoice
                  </span>
                </h2>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center group">
                      <CheckCircle className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <Button
                    onClick={() => router.push("/auth/register")}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-600/30">
                <div className="bg-slate-900/50 p-6 rounded-2xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      Monthly Performance
                    </h3>
                    <div className="text-emerald-400 text-sm font-medium">
                      +40% growth
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Invoices Sent</span>
                      <span className="text-white font-semibold">247</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Revenue Generated</span>
                      <span className="text-emerald-400 font-semibold">
                        $24,670
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Average Payment Time</span>
                      <span className="text-white font-semibold">12 days</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">
                    "Since switching to MERN Invoice, I've reduced my billing
                    time by 80% and improved cash flow significantly."
                  </p>
                  <p className="text-emerald-400 font-semibold mt-2">
                    - Alex Thompson, CEO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Loved by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  10,000+
                </span>{" "}
                businesses
              </h2>
              <p className="text-xl text-gray-400">
                See what our customers are saying
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-emerald-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your billing process?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of businesses already saving time and getting paid
              faster with MERN Invoice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                onClick={() => router.push("/auth/register")}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-gray-500 text-sm">
              14-day free trial • No setup fees • Cancel anytime
            </p>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-emerald-600/10 backdrop-blur-sm border-t border-emerald-500/20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-emerald-500 text-white p-2 rounded-lg mr-2">
                $
              </div>
              <span className="text-emerald-300 font-medium">
                Because Money is as important as oxygen!
              </span>
              <div className="bg-emerald-500 text-white p-2 rounded-lg ml-2">
                $
              </div>
            </div>

            <div className="text-emerald-400 text-sm mb-4">
              ♡ Made with passion for invoicing excellence ♡
            </div>

            <div className="text-gray-500 text-sm mb-4">
              © MERN Invoice 2025 • All rights reserved
            </div>

            <div className="flex justify-center space-x-6 text-gray-400 text-sm">
              <button className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </button>
              <button className="hover:text-emerald-400 transition-colors">
                Support
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
