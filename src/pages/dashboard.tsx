import { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [animatedScores, setAnimatedScores] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [appliedInvestors, setAppliedInvestors] = useState<number[]>([]);

  // Load applied investors from localStorage on mount and when component becomes visible
  useEffect(() => {
    const loadAppliedInvestors = () => {
      const saved = localStorage.getItem('appliedInvestors');
      if (saved) {
        setAppliedInvestors(JSON.parse(saved));
      }
    };
    
    loadAppliedInvestors();
    
    // Check when page becomes visible (user returns from payment)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadAppliedInvestors();
      }
    };
    
    // Listen for storage changes (cross-tab)
    const handleStorageChange = () => {
      loadAppliedInvestors();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadAppliedInvestors);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadAppliedInvestors);
    };
  }, []);

  const overallScore = 78.13;
  const scoreBreakdown = [
    { category: 'Business Profiling', score: 85, explanation: 'Strong business identity and clear market positioning' },
    { category: 'Business Model', score: 82, explanation: 'Well-defined revenue streams and scalable model' },
    { category: 'Growth Traction', score: 75, explanation: 'Good growth metrics with room for improvement' },
    { category: 'Founders Profile', score: 88, explanation: 'Experienced team with relevant domain expertise' },
    { category: 'Competitive Positioning', score: 72, explanation: 'Clear differentiation but needs stronger validation' },
    { category: 'Sustainability & Resilience', score: 70, explanation: 'Adequate risk management, improve contingency plans' },
    { category: 'Innovation & Differentiation', score: 80, explanation: 'Strong innovation with defensible IP' },
    { category: 'Product-Market Fit', score: 76, explanation: 'Good PMF indicators, continue customer validation' },
  ];

  const matchedInvestors = [
    {
      id: 1,
      name: 'Accel Partners',
      focus: 'SaaS, B2B',
      checkSize: '₹50L - ₹2Cr',
      matchScore: 92,
      location: 'Bangalore',
      description: 'Early stage investor focusing on SaaS and B2B startups',
      logo: 'A',
    },
    {
      id: 2,
      name: 'Sequoia Capital India',
      focus: 'Fintech, Consumer',
      checkSize: '₹1Cr - ₹5Cr',
      matchScore: 88,
      location: 'Mumbai',
      description: 'Leading VC firm investing in high-growth startups',
      logo: 'S',
    },
    {
      id: 3,
      name: 'Blume Ventures',
      focus: 'AI/ML, Edtech',
      checkSize: '₹50L - ₹1.5Cr',
      matchScore: 85,
      location: 'Delhi',
      description: 'Early stage fund backing innovative tech startups',
      logo: 'B',
    },
    {
      id: 4,
      name: 'Matrix Partners',
      focus: 'SaaS, Enterprise',
      checkSize: '₹1Cr - ₹3Cr',
      matchScore: 83,
      location: 'Bangalore',
      description: 'Focus on B2B SaaS and enterprise software companies',
      logo: 'M',
    },
  ];

  const companyInfo = {
    name: 'Star AI',
    industry: 'Artificial Intelligence / ML',
    location: 'Hyderabad',
    website: 'https://star.ai/',
    linkedin: 'https://linkedin.com/company/star-ai',
    twitter: '@starai',
    instagram: '@starai',
    businessModel: 'B2B - B2C',
    stage: 'MVP Stage',
    raising: 'Seed',
    targetRaise: '$250K - $500K',
  };

  const kpiMetrics = [
    { label: 'Revenue Growth', value: '10-20%', unit: 'MoM', color: 'text-green-600' },
    { label: 'Customer Growth', value: '10-20%', unit: 'MoM', color: 'text-green-600' },
    { label: 'Annual Revenue', value: '<$10K', unit: 'ARR', color: 'text-gray-700' },
    { label: 'TAM Size', value: '$1B+', unit: 'Addressable', color: 'text-gray-700' },
  ];

  useEffect(() => {
    setAnimatedScores(true);
    // Animate score counting like credit score
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = overallScore / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= overallScore) {
        setDisplayScore(overallScore);
        clearInterval(timer);
      } else {
        setDisplayScore(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const getScoreColorHex = (score: number) => {
    if (score >= 85) return '#10B981'; // green
    if (score >= 75) return '#3B82F6'; // blue
    return '#6B7280'; // gray
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return '#D1FAE5'; // light green
    if (score >= 75) return '#DBEAFE'; // light blue
    return '#F3F4F6'; // light gray
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 65) return 'Fair';
    return 'Needs Work';
  };

  // Check if investor is applied
  const isApplied = (investorId: number) => {
    return appliedInvestors.includes(investorId);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F4F2' }}>
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#111928' }}>
                <span className="text-white font-semibold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>Hi Founder</h1>
                <p className="text-xs text-gray-500">Welcome back</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/dealroom')}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                title="Dealroom"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5671A' }}></span>
              </button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer transition-colors" style={{ backgroundColor: '#111928' }}>
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Section - Startup Score - Data Oriented */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 sticky top-24 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* HScore - Half Circle Progress */}
              <div className="mb-6 pb-6 border-b border-gray-200/50">
                <div className="text-center mb-10">
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#111928' }}>HScore</h3>
                  <p className="text-xs text-gray-500">Holistic score of your startup</p>
                </div>
                
                {/* Half Circle Progress Bar - Credit Score Style */}
                <div className="relative flex items-center justify-center mb-6" style={{ height: '140px' }}>
                  <svg 
                    className="transform w-full max-w-[200px] mb-20" 
                    width="200" 
                    height="120" 
                    viewBox="0 0 200 120"
                    style={{ filter: animatedScores ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' : 'none' }}
                  >
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    {/* Progress arc with gradient effect */}
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5671A" stopOpacity="1" />
                        <stop offset="100%" stopColor="#F5671A" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={`${(displayScore / 100) * 251.2} 251.2`}
                      className="transition-all duration-300 ease-out"
                      style={{ 
                        strokeDashoffset: animatedScores ? 0 : 251.2,
                        filter: animatedScores ? 'drop-shadow(0 0 8px rgba(245, 103, 26, 0.4))' : 'none'
                      }}
                    />
                  </svg>
                  {/* Score Text - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div 
                      className="text-5xl font-bold transition-all duration-300"
                      style={{ 
                        color: '#F5671A',
                        textShadow: animatedScores ? '0 2px 8px rgba(245, 103, 26, 0.3)' : 'none'
                      }}
                    >
                      {Math.round(displayScore)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">/ 100</div>
                    <div 
                      className="text-xs font-medium mt-2 px-3 py-1 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: '#FEE2E2',
                        color: '#F5671A'
                      }}
                    >
                      {getScoreLabel(overallScore)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/report')}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                  style={{ 
                    backgroundColor: '#FFF7ED',
                    color: '#111928',
                    border: '1.5px solid #FED7AA'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FED7AA';
                    e.currentTarget.style.borderColor = '#F5671A';
                    e.currentTarget.style.color = '#F5671A';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 103, 26, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFF7ED';
                    e.currentTarget.style.borderColor = '#FED7AA';
                    e.currentTarget.style.color = '#111928';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>View Full Report</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Score Breakdown - Elegant Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Breakdown</h4>
                {scoreBreakdown.map((item, index) => {
                  const getCategoryIcon = (category: string) => {
                    const icons: Record<string, ReactElement> = {
                      'Business Profiling': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      'Business Model': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      ),
                      'Growth Traction': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ),
                      'Founders Profile': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ),
                      'Competitive Positioning': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      ),
                      'Sustainability & Resilience': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ),
                      'Innovation & Differentiation': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      ),
                      'Product-Market Fit': (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    };
                    return icons[category] || icons['Business Profiling'];
                  };

                  return (
                    <div
                      key={item.category}
                      className={`group transition-all duration-300 hover:shadow-sm rounded-xl p-4 border border-gray-100 hover:border-gray-200 cursor-pointer ${animatedScores ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        backgroundColor: '#FAFBFC'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FAFBFC';
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div 
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                          style={{ 
                            backgroundColor: getScoreBgColor(item.score),
                            color: getScoreColorHex(item.score)
                          }}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1.5">
                            <h5 className="text-sm font-semibold" style={{ color: '#111928' }}>
                              {item.category}
                            </h5>
                            <span 
                              className="text-lg font-bold ml-2"
                              style={{ color: getScoreColorHex(item.score) }}
                            >
                              {item.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Middle Section - Investor Matches */}
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: '#111928' }}>Matched Investors</h2>
                <p className="text-sm text-gray-600">
                  {matchedInvestors.length} investors matched with your profile
                  {appliedInvestors.length > 0 && (
                    <span className="ml-2 text-green-600 font-medium">
                      • {appliedInvestors.length} applied
                    </span>
                  )}
                </p>
              </div>
              {appliedInvestors.length > 0 && (
                <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-green-700">{appliedInvestors.length} Applied</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {matchedInvestors.map((investor, index) => (
                <div
                  key={investor.id}
                  className={`bg-white rounded-xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${animatedScores ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    borderColor: animatedScores ? undefined : 'rgba(229, 231, 235, 0.5)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center font-semibold text-lg transition-all duration-300 hover:scale-105 border border-gray-200" style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}>
                        {investor.logo}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold" style={{ color: '#111928' }}>{investor.name}</h3>
                            {isApplied(investor.id) && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Applied
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {investor.location}
                          </p>
                        </div>
                        {isApplied(investor.id) && (
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600 mb-0.5">Applied</div>
                            <div className="text-xs text-gray-500">Payment done</div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-lg" style={{ backgroundColor: '#F3F6FF', color: '#111928' }}>
                          {investor.focus}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
                          {investor.checkSize}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{investor.description}</p>

                      <div className="flex gap-2.5">
                        {isApplied(investor.id) ? (
                          <button
                            disabled
                            className="flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                            style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Application Submitted
                          </button>
                        ) : (
                          <button
                            onClick={() => router.push(`/quick-apply?investor=${investor.id}`)}
                            className="flex-1 text-white py-2.5 rounded-lg font-semibold text-sm transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
                            style={{ backgroundColor: '#F5671A' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a0f'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5671A'}
                          >
                            Quick Apply
                          </button>
                        )}
                        <button className="px-4 py-2.5 bg-gray-100 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Company Info & Quick Actions */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Company Info Overview */}
              <div className="bg-white rounded-xl border border-gray-200/50 p-5 hover:shadow-md transition-all duration-300 shadow-sm">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#111928' }}>Company Profile</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Company Name</div>
                    <div className="text-sm font-semibold" style={{ color: '#111928' }}>{companyInfo.name}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Registered Startup</span>
                  </div>


                  <div>
                    <div className="text-xs text-gray-500 mb-1">Startup Stage</div>
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-lg" style={{ backgroundColor: '#F3F6FF', color: '#111928' }}>{companyInfo.stage}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/company-profile')}
                  className="w-full text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
                  style={{ backgroundColor: '#F3F6FF', color: '#111928' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F6FF';
                  }}
                >
                  Edit Company Info →
                </button>
              </div>

              {/* Dealroom Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 p-5 hover:shadow-md transition-all duration-300 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1" style={{ color: '#111928' }}>Dealroom</h3>
                    <p className="text-xs text-gray-600 mb-3">Manage and share your documents</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/dealroom')}
                  className="w-full text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-white"
                  style={{ backgroundColor: '#3B82F6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                >
                  Open Dealroom
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* WhatsApp Community Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50 p-5 hover:shadow-md transition-all duration-300 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1" style={{ color: '#111928' }}>Join Community</h3>
                    <p className="text-xs text-gray-600 mb-3">Connect with founders & investors on WhatsApp</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-white"
                  style={{ backgroundColor: '#25D366' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20ba5a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                >
                  Join WhatsApp Group
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Book a Call Card */}
              <div className="bg-gradient-to-br from-[#F5671A]/5 to-orange-50/50 rounded-xl border border-orange-200/50 p-5 hover:shadow-md transition-all duration-300 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5671A' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1" style={{ color: '#111928' }}>Book a Call</h3>
                    <p className="text-xs text-gray-600 mb-3">Schedule a quick call with our team</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('https://calendly.com/htraction', '_blank')}
                  className="w-full text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-white"
                  style={{ backgroundColor: '#F5671A' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a0f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5671A'}
                >
                  Schedule Now
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

