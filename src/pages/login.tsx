import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const validateField = (name: string, value: string) => {
    const newErrors: Record<string, string> = { ...errors };

    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Please enter a valid email';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const validationErrors: Record<string, string> = {};
    if (!formData.email) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Please enter a valid email';
    
    if (!formData.password) validationErrors.password = 'Password is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/onboarding');
    } else {
      setIsSubmitting(false);
    }
  };

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 4);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between px-8 sm:px-12 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#CC471D] to-[#b03d18] rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">H</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back to HTraction
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email and password to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 hover:border-orange-400 ${
                  errors.email && touched.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && touched.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 hover:border-orange-400 ${
                    errors.password && touched.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors duration-200 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.036m0 0L21 21" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#CC471D] border-gray-300 rounded focus:ring-[#CC471D]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or login with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="#0077B5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/onboarding')}
                  className="text-orange-600 hover:text-orange-700 hover:underline font-semibold transition-colors duration-200"
                >
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="w-full max-w-md mx-auto mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">
            © 2024 HTraction Inc. All rights reserved.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Founders Reviews */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 overflow-y-auto relative">
        {/* Fire-like gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/20 via-transparent to-orange-400/10 pointer-events-none"></div>
        
        <div className="w-full max-w-4xl mx-auto relative z-10">
          {/* Stats Section - Above Reviews */}
          <div className="mb-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="group">
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">500+</div>
                <div className="text-xs text-gray-600 font-medium">Startups Funded</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">₹200Cr+</div>
                <div className="text-xs text-gray-600 font-medium">Capital Raised</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">4.9/5</div>
                <div className="text-xs text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">What Founders Say</h2>
            <p className="text-white/90 text-sm">Real experiences from startups that raised funding</p>
          </div>

          {/* Animated Review Container */}
          <div className="relative h-[420px]">
            {[
              {
                initials: 'RK',
                gradient: 'from-[#CC471D] to-[#b03d18]',
                name: 'Rajesh Kumar',
                title: 'Founder & CEO, TechStart',
                funding: 'Raised ₹2Cr in Seed Round',
                review: "HTraction completely transformed our fundraising process. The AI matching algorithm connected us with investors whose thesis perfectly aligned with our SaaS startup. We got responses from 3 out of 5 investors within a week, and closed our ₹2Cr seed round in just 2 months. The platform saved us countless hours of research and cold emails."
              },
              {
                initials: 'PM',
                gradient: 'from-blue-500 to-blue-600',
                name: 'Priya Mehta',
                title: 'Co-founder, HealthTech Solutions',
                funding: 'Raised ₹1.5Cr in Pre-Seed Round',
                review: "As a first-time founder, I was overwhelmed by the fundraising process. HTraction made it so simple - I just filled out my profile, got matched with relevant investors, and applied. The detailed startup report helped me understand my strengths and weaknesses. We raised ₹1.5Cr from Blume Ventures, and the entire process took less than 6 weeks."
              },
              {
                initials: 'AS',
                gradient: 'from-green-500 to-green-600',
                name: 'Arjun Sharma',
                title: 'Founder, FinTech Innovations',
                funding: 'Raised ₹5Cr in Series A',
                review: "The best part about HTraction is the quality of investor matches. We were connected with VCs who actually understood our fintech space and had relevant portfolio companies. The dealroom feature made sharing documents seamless. We closed our Series A of ₹5Cr through connections made on the platform. Highly recommend to any startup looking to raise capital efficiently."
              },
              {
                initials: 'NS',
                gradient: 'from-purple-500 to-purple-600',
                name: 'Neha Singh',
                title: 'CEO, EdTech Platform',
                funding: 'In discussions for ₹3Cr Seed Round',
                review: "I've tried multiple platforms for fundraising, but HTraction stands out. The holistic startup score helped us identify areas to improve before approaching investors. The quick apply feature saved us so much time, and the response rate was incredible - 4 out of 6 investors responded within 48 hours. We're now in advanced discussions with Sequoia Capital India."
              }
            ].map((review, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  currentReview === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 h-full flex flex-col hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${review.gradient} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg hover:scale-110 transition-transform duration-300`}>
                        {review.initials}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">5.0</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                        "{review.review}"
                      </p>
                      <div className="mt-auto">
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-600">{review.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{review.funding}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  currentReview === index
                    ? 'w-8 bg-white shadow-lg'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
