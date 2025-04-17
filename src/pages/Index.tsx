
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  BarChart3,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 ml-2">MedFlow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-primary">Benefits</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                  Enterprise Healthcare Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Streamline your medical practice with our comprehensive management portal
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                MedFlow provides an all-in-one solution for managing appointments, patients, doctors, messaging, claims, and more. Designed for medical professionals by medical professionals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="px-8" asChild>
                  <Link to="/auth/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8" asChild>
                  <a href="#features">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <ShieldCheck className="mr-1 h-4 w-4 text-green-500" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center">
                  <RefreshCw className="mr-1 h-4 w-4 text-green-500" />
                  99.9% Uptime
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-green-500/20 rounded-xl transform rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Doctor using MedFlow on laptop" 
                className="relative z-10 rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-gray-600">
              Our platform offers a complete solution for managing your medical practice, designed to save time and improve patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
              <p className="text-gray-600">
                Intelligent appointment scheduling with automatic conflict detection and calendar views. Support for recurring appointments and patient reminders.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Patient Management</h3>
              <p className="text-gray-600">
                Comprehensive patient records with medical history, appointment tracking, insurance details, and document storage.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Messaging</h3>
              <p className="text-gray-600">
                HIPAA-compliant messaging system between doctors, staff, and patients with file sharing and searchable history.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Claims Management</h3>
              <p className="text-gray-600">
                Streamlined insurance claims processing with tracking, approval workflows, and exportable records for accounting.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Data-driven insights with visual reports on patient growth, appointment metrics, revenue analytics, and operational efficiency.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Built with HIPAA compliance in mind, including data encryption, audit logs, and role-based access control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Medical professionals using MedFlow" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why healthcare providers choose MedFlow
              </h2>
              <div className="space-y-5">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Increased efficiency</h3>
                    <p className="mt-1 text-gray-600">
                      Reduce administrative workload by up to 40% with our automated scheduling, billing, and patient management tools.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Improved patient experience</h3>
                    <p className="mt-1 text-gray-600">
                      Enhance the patient journey with easy appointment booking, secure messaging, and access to medical records.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Faster insurance claim processing</h3>
                    <p className="mt-1 text-gray-600">
                      Reduce claim processing time by 60% and decrease rejection rates with our intelligent claims management system.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Data-driven decisions</h3>
                    <p className="mt-1 text-gray-600">
                      Leverage comprehensive analytics to optimize practice operations, staff scheduling, and resource allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Trusted by healthcare providers
            </h2>
            <p className="text-xl text-gray-600">
              See what medical professionals are saying about MedFlow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium">
                  JD
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Dr. James Davis</h3>
                  <p className="text-sm text-gray-500">Cardiology</p>
                </div>
              </div>
              <p className="text-gray-600">
                "MedFlow has transformed our practice. The appointment scheduling and patient management features have cut our administrative time in half."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium">
                  SM
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Dr. Sarah Mitchell</h3>
                  <p className="text-sm text-gray-500">Family Medicine</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The analytics dashboard gives me insights into my practice I never had before. I can now make informed decisions based on real data."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium">
                  RW
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Rachel White</h3>
                  <p className="text-sm text-gray-500">Office Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Claims management used to be a nightmare. With MedFlow, we've reduced our rejection rate and sped up the entire billing process."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <svg key={star} className={`h-5 w-5 fill-current ${i < 4 ? "text-yellow-500" : "text-gray-300"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your healthcare practice?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who are streamlining their operations and improving patient care with MedFlow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/register">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-white flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-white ml-2">MedFlow</span>
              </div>
              <p className="mt-4 text-gray-400">
                Enterprise healthcare management simplified.
              </p>
              <div className="flex mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 MedFlow. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
