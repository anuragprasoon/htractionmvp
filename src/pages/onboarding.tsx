import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Onboarding() {
  const router = useRouter();
  const [animatedSteps, setAnimatedSteps] = useState([false, false, false, false]);

  const steps = [
    { 
      number: 1, 
      title: 'Setup Company', 
      description: 'Basic company information',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      number: 2, 
      title: 'Complete Profile', 
      description: 'Answer 40 questions about your startup',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      number: 3, 
      title: 'Get Matched', 
      description: 'Find investors aligned with your startup',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      number: 4, 
      title: 'Apply & Connect', 
      description: 'Apply to matched investors',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative inline-block mb-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-9 h-9 text-white animate-in zoom-in duration-500 delay-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Welcome to htraction! 🎉
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto">
            Let's get your startup profile set up in a few simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-gray-200/50 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group ${
                animatedSteps[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => {
                if (index === 0) router.push('/company-setup');
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center font-bold text-base transition-all duration-300 group-hover:scale-110 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-orange-100 group-hover:to-orange-200'
                }`}>
                  {index === 0 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ) : step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    {index === 0 && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                        Next
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index > 0 && (
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs font-semibold text-orange-600">Step 1 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push('/company-setup')}
            className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-3 px-5 rounded-lg font-semibold hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-7 text-center">
          <p className="text-xs text-gray-500">
            This will only take a few minutes. You can always come back to complete your profile later.
          </p>
        </div>
      </div>
    </div>
  );
}

