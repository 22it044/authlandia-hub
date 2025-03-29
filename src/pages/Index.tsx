
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Layers, ShieldCheck, QrCode, Users, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 dark:text-white transition-colors duration-300">
      {/* Header/Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed top-0 w-full z-10 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">SupplyChain</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {currentUser ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Dashboard
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Blockchain-Powered Supply Chain Management
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            A decentralized blockchain-based platform designed to enhance transparency, security, and efficiency 
            in supply chain management. Enable tracking and verification of product authenticity, 
            transactions, and logistics in real-time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/signup')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg px-8 transition-colors"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 text-lg px-8 transition-colors"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Tracking</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Track products at every stage of the supply chain from manufacturing to delivery with immutable blockchain records.</p>
            </div>
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Contracts</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Automate agreements between parties with secure, transparent smart contracts that execute when conditions are met.</p>
            </div>
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <QrCode className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">QR Verification</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Easily verify product authenticity and track history with QR codes linked to blockchain records.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Roles</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Specialized interfaces for manufacturers, suppliers, distributors, and consumers with appropriate permissions.</p>
            </div>
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction Logs</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive transaction records with real-time notifications for all supply chain activities.</p>
            </div>
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg transition-all hover:shadow-md duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-full">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-lg"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l border-gray-300 dark:border-gray-700 ml-3">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full -left-3 ring-8 ring-white dark:ring-slate-800">
                  <span className="text-blue-800 dark:text-blue-300 font-bold">1</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Product Registration</h3>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">Manufacturers register products on the blockchain with detailed specifications and unique identifiers.</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full -left-3 ring-8 ring-white dark:ring-slate-800">
                  <span className="text-blue-800 dark:text-blue-300 font-bold">2</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Supply Chain Transfers</h3>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">Each transfer of goods between parties is recorded as a transaction on the blockchain with timestamps.</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full -left-3 ring-8 ring-white dark:ring-slate-800">
                  <span className="text-blue-800 dark:text-blue-300 font-bold">3</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Verification Points</h3>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">QR codes allow verification at any point in the supply chain to confirm authenticity and view history.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full -left-3 ring-8 ring-white dark:ring-slate-800">
                  <span className="text-blue-800 dark:text-blue-300 font-bold">4</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Consumer Access</h3>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">End users can scan product QR codes to verify authenticity and view the complete supply chain journey.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Supply Chain?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Join the growing network of businesses using blockchain technology to create transparent, 
            secure, and efficient supply chains.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/signup')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('#contact', '_self')}
              size="lg"
              className="border-white text-white hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">SupplyChain</h2>
            <p className="text-gray-400 mb-6">Secure, transparent blockchain solutions for modern supply chains</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-sm" id="contact">© 2023 SupplyChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
