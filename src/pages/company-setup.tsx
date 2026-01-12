import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CompanySetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    logo: null as File | null,
    isIncorporated: false,
    incorporationDate: '',
    incorporationName: '',
    hq: '',
    industry: [] as string[],
    termsAccepted: false,
  });
  const [animatedFields, setAnimatedFields] = useState([false, false, false, false, false, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    'SaaS',
    'E-commerce',
    'Fintech',
    'Healthtech',
    'Edtech',
    'AI/ML',
    'Blockchain',
    'Consumer',
    'B2B',
    'Other',
  ];

  useEffect(() => {
    animatedFields.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedFields(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 100);
    });
  }, []);

  const toggleIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry.includes(industry)
        ? prev.industry.filter(i => i !== industry)
        : [...prev.industry, industry]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/company-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 py-8 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/20 to-yellow-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Animated Header with Illustration */}
        <div className={`text-center mb-9 transition-all duration-700 ${
          animatedFields[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="relative inline-block mb-5">
            {/* Company Building Illustration */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2.5 tracking-tight">
            Setup Your Company
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto">
            Let's start with some basic information about your startup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-7 md:p-9 space-y-5">
          {/* Logo Upload - First */}
          <div className={`transition-all duration-500 ${
            animatedFields[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Company Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-7 text-center bg-gradient-to-br from-gray-50 to-white hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-white transition-all duration-300 group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, logo: file });
                }}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                  <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                  {formData.logo ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formData.logo.name}
                    </span>
                  ) : (
                    'Click to upload logo or drag and drop'
                  )}
                </span>
                <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
              </label>
            </div>
          </div>

          {/* Company Name */}
          <div className={`transition-all duration-500 delay-100 ${
            animatedFields[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm"
              placeholder="Enter your company name"
            />
          </div>

          {/* Incorporation Status */}
          <div className={`transition-all duration-500 delay-200 ${
            animatedFields[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Is your company incorporated? *
            </label>
            <div className="flex gap-3.5">
              <label className="flex-1 cursor-pointer group">
                <input
                  type="radio"
                  name="incorporated"
                  checked={formData.isIncorporated === true}
                  onChange={() => setFormData({ ...formData, isIncorporated: true })}
                  className="hidden"
                />
                <div className={`p-3.5 rounded-xl border-2 transition-all duration-200 ${
                  formData.isIncorporated === true
                    ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/20'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.isIncorporated === true
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.isIncorporated === true && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`font-medium text-sm ${
                      formData.isIncorporated === true ? 'text-orange-700' : 'text-gray-700'
                    }`}>Yes</span>
                  </div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer group">
                <input
                  type="radio"
                  name="incorporated"
                  checked={formData.isIncorporated === false}
                  onChange={() => setFormData({ ...formData, isIncorporated: false, incorporationDate: '', incorporationName: '' })}
                  className="hidden"
                />
                <div className={`p-3.5 rounded-xl border-2 transition-all duration-200 ${
                  formData.isIncorporated === false
                    ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/20'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.isIncorporated === false
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.isIncorporated === false && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`font-medium text-sm ${
                      formData.isIncorporated === false ? 'text-orange-700' : 'text-gray-700'
                    }`}>No</span>
                  </div>
                </div>
              </label>
            </div>
            
            {/* Conditional Incorporation Fields - Name first, then Date */}
            {formData.isIncorporated && (
              <div className="mt-3.5 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Legal Company Name *
                  </label>
                  <input
                    type="text"
                    required={formData.isIncorporated}
                    value={formData.incorporationName}
                    onChange={(e) => setFormData({ ...formData, incorporationName: e.target.value })}
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm"
                    placeholder="Enter legal company name as per incorporation documents"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Incorporation Date *
                  </label>
                  <input
                    type="date"
                    required={formData.isIncorporated}
                    value={formData.incorporationDate}
                    onChange={(e) => setFormData({ ...formData, incorporationDate: e.target.value })}
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Headquarters */}
          <div className={`transition-all duration-500 delay-300 ${
            animatedFields[4] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Headquarters Location *
            </label>
            <input
              type="text"
              required
              value={formData.hq}
              onChange={(e) => setFormData({ ...formData, hq: e.target.value })}
              className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm"
              placeholder="e.g., Mumbai, India"
            />
          </div>

          {/* Industry Type - Multi-select Chips */}
          <div className={`transition-all duration-500 delay-400 ${
            animatedFields[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Industry Type * <span className="text-xs font-normal text-gray-500">(Select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => {
                const isSelected = formData.industry.includes(industry);
                return (
                  <button
                    key={industry}
                    type="button"
                    onClick={() => toggleIndustry(industry)}
                    className={`px-3.5 py-2 rounded-xl font-medium text-xs transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/30'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {industry}
                      {isSelected && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {formData.industry.length === 0 && (
              <p className="text-xs text-gray-500 mt-1.5">Please select at least one industry</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className={`transition-all duration-500 delay-500 ${
            animatedFields[6] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="hidden"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  formData.termsAccepted
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-gray-300 group-hover:border-orange-400'
                }`}>
                  {formData.termsAccepted && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-5">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.industry.length === 0}
              className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="mt-7 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Step 1 of 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

