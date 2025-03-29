
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navbar */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">AuthLandia</h1>
          </div>
          <div>
            {currentUser ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Dashboard
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 hover:bg-blue-700"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Secure Authentication for Your Application
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            A complete authentication solution with multiple sign-in methods, security features, and seamless integration.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button 
              onClick={() => navigate('/signup')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Authentication Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Sign-In Methods</h3>
              <p className="text-gray-600">Email/password, phone OTP, and GitHub SSO authentication options.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Verification</h3>
              <p className="text-gray-600">Secure your application with email verification for new accounts.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Recovery</h3>
              <p className="text-gray-600">Easy and secure password reset process for your users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">AuthLandia</h2>
            <p className="text-gray-400 mb-6">Secure, reliable authentication for your applications</p>
            <p className="text-gray-500 text-sm">© 2023 AuthLandia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
