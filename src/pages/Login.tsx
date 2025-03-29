
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { GithubIcon, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();
  const { login, signInWithGithub } = useAuth();

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrors({ general: "Invalid email or password" });
      } else if (error.code === "auth/too-many-requests") {
        setErrors({ general: "Too many failed login attempts. Please try again later." });
      } else {
        setErrors({ general: error.message || "Failed to log in" });
      }
      toast.error("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await signInWithGithub();
      toast.success("Successfully logged in with GitHub");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("GitHub login error:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        setErrors({ general: "An account already exists with the same email address but different sign-in credentials." });
      } else {
        setErrors({ general: error.message || "Failed to log in with GitHub" });
      }
      toast.error("Failed to log in with GitHub");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-slate-900 px-4 transition-colors duration-300">
      <div className="absolute top-4 left-4 flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-gray-800 dark:bg-slate-800 dark:text-gray-100 transition-colors duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In to SupplyChain</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.general && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${errors.email ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.email && <p className="text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${errors.password ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.password && <p className="text-sm text-red-500 dark:text-red-400">{errors.password}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="dark:bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                onClick={handleGithubLogin}
                disabled={loading}
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                onClick={() => navigate('/phone-login')}
                disabled={loading}
              >
                Phone Number
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
