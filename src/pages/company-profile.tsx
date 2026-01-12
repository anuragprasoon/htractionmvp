import { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  options?: string[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  questions: Question[];
}

const sections: Section[] = [
  {
    id: 'business-profiling',
    title: 'Business Profiling',
    description: 'Define your business identity and market position',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_startup_name', question: 'Name of your startup', type: 'text' },
      { id: 'htraction_is_startup_registered', question: 'Are you a Registered Startup?', type: 'select', options: ['Yes', 'No'] },
      { id: 'htraction_date_of_incorporation', question: 'Date of Incorporation', type: 'text' },
      { id: 'htraction_headquarter_location', question: 'Headquarter Location', type: 'text' },
      { id: 'htraction_industry_sector', question: 'Industry/Sector', type: 'text' },
      { id: 'other_industry_sector', question: 'Please specify your Industry/Sector', type: 'text' },
      { id: 'htraction_outreach_business_model', question: 'Outreach Business Model', type: 'textarea' },
      { id: 'htraction_startup_stage', question: 'Stage of Startup', type: 'text' },
      { id: 'htraction_is_incubator_part', question: 'Are you currently or been part of any accelerator/incubator?', type: 'select', options: ['Yes', 'No'] },
      { id: 'htraction_incubator_name', question: 'Please name the accelerator/Incubator', type: 'text' },
      { id: 'htraction_raise_funding_before', question: 'Have you raised external funding before?', type: 'select', options: ['Yes', 'No'] },
      { id: 'htraction_funding_type', question: 'Funding Type', type: 'text' },
      { id: 'htraction_funding_amount', question: 'Your last funding amount (in USD)', type: 'number' },
      { id: 'htraction_funding_source', question: 'Name Lead Investor(s) / Funding Source', type: 'text' },
      { id: 'htraction_target_raise_amount', question: 'How much capital are you currently looking to raise (in USD)?', type: 'text' },
      { id: 'htraction_current_funding_round', question: 'Which funding round are you currently raising?', type: 'text' },
      { id: 'htraction_startup_pitch', question: 'The well-prepared pitch document is self-explanatory and should excite investors to shortlist a startup for presentation', type: 'text' },
      { id: 'htraction_startup_website', question: 'Website URL', type: 'text' },
      { id: 'htraction_startup_linkedin', question: 'LinkedIn Page', type: 'text' },
      { id: 'htraction_startup_instagram', question: 'Instagram Profile', type: 'text' },
      { id: 'htraction_startup_twitter', question: 'Twitter / X Handle', type: 'text' },
    ],
  },
  {
    id: 'business-model',
    title: 'Business Model',
    description: 'Explain how your business creates and captures value',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_total_addressable_market', question: 'What is your Total Addressable Market (TAM)', type: 'text' },
      { id: 'htraction_projected_annual_growth_rate', question: 'What is the projected annual growth rate (CAGR) of your target market over the next 5 years?', type: 'text' },
      { id: 'htraction_market_shift_monitoring', question: 'Is your startup aligned with any major industry inflection points or market shifts (e.g. AI adoption, sustainability mandates, regulatory changes)?', type: 'text' },
      { id: 'htraction_scalability_factor', question: 'Does your business model scale without a linear increase in cost?', type: 'text' },
      { id: 'htraction_revenue_model', question: 'What is your primary revenue model?', type: 'text' },
      { id: 'htraction_recurring_revenue', question: 'Do you currently have any recurring or repeatable revenue streams?', type: 'text' },
      { id: 'htraction_gross_margins', question: 'How would you describe your gross margins (actual or projected)?', type: 'text' },
      { id: 'htraction_cac_ltv_ratio', question: 'What is your CAC to LTV ratio (if known)?', type: 'text' },
      { id: 'htraction_cac_ltv_evidence_file', question: 'Please upload your calculation (.xls, .doc, or .pdf)', type: 'text' },
      { id: 'htraction_exit_strategy_mapped', question: 'Have you mapped your exit opportunities or strategic acquirers?', type: 'text' },
    ],
  },
  {
    id: 'growth-traction',
    title: 'Growth Traction',
    description: 'Showcase your progress, metrics, and momentum',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    questions: [
      { id: 'htraction_annual_revenue_range', question: 'What is your current annual revenue range?', type: 'text' },
      { id: 'htraction_revenue_growth_trend', question: 'What has been your revenue growth trend over the last 6 months?', type: 'text' },
      { id: 'htraction_customer_base_grown', question: 'How has your user/customer base grown in the last 6 months?', type: 'text' },
      { id: 'htraction_repeat_customers_percent', question: 'What percentage of your customers are repeat users or subscribers?', type: 'text' },
      { id: 'htraction_defined_customer_acquisition_strategy', question: 'Do you have a defined customer acquisition strategy in place?', type: 'text' },
      { id: 'htraction_infra_scale_readiness', question: 'Is your current tech/product/ops infrastructure capable of handling a 10x increase in users or customers?', type: 'text' },
      { id: 'htraction_growth_kpis_set', question: 'Have you established growth KPIs or milestones for the next 6-12 months?', type: 'text' },
      { id: 'htraction_partnerships_explored', question: 'Have you explored strategic partnerships to drive growth (distribution, sales, co-branding)?', type: 'text' },
      { id: 'htraction_operating_region', question: 'Where are you currently operating?', type: 'text' },
      { id: 'htraction_gtm_strategy', question: 'Brielfly explain your GTM strategy', type: 'textarea' },
    ],
  },
  {
    id: 'founders-profile',
    title: 'Founders Profile',
    description: 'Tell us about the founding team and their expertise',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_cap_table', question: 'Create your current Cap Table', type: 'textarea' },
      { id: 'htraction_founding_team_composition_table', question: 'What is the founding team composition?', type: 'textarea' },
      { id: 'htraction_founder_experience', question: 'Do any founders have prior entrepreneurial experience (built or exited ventures)?', type: 'text' },
      { id: 'htraction_founder_industry_experience', question: 'Do founders, individually or combined, have relevant experience in the target industry/domain?', type: 'text' },
      { id: 'htraction_founding_team_functions', question: 'What key functions are represented by the founding team?', type: 'textarea' },
      { id: 'htraction_core_team_experience', question: 'Has the core team worked together previously (past jobs, ventures, or projects)?', type: 'text' },
      { id: 'htraction_are_cofounders_fulltime', question: 'Are all co-founders currently full-time on the startup?', type: 'text' },
    ],
  },
  {
    id: 'competitive-positioning',
    title: 'Competitive Positioning',
    description: 'Define your competitive advantages and market position',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_unique_value_proposition', question: 'How does your offering differentiate from the competition?', type: 'text' },
      { id: 'htraction_product_differentiation_validated', question: 'Is your product/offering differentiation been validated by customers or users?', type: 'text' },
      { id: 'htraction_pricing_position_comparison', question: 'How well does your pricing strategy align with your target customers and value proposition?', type: 'text' },
    ],
  },
  {
    id: 'sustainability-resilience',
    title: 'Sustainability & Resilience',
    description: 'Demonstrate long-term viability and risk management',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_current_cash_runway', question: 'What is your current cash runway based on average monthly burn?', type: 'text' },
      { id: 'htraction_emergency_contingency_plan', question: 'If revenue drops and/or funding delays occur, what contingency measures are in place?', type: 'textarea' },
      { id: 'htraction_multiple_revenue_streams', question: 'Do you have multiple revenue streams or levers to support survival during downturns?', type: 'text' },
      { id: 'htraction_operational_pivot_experience', question: 'Has your leadership successfully navigated at least one major operational or financial challenge (e.g., pivot, crisis, founder change, down round)?', type: 'text' },
    ],
  },
  {
    id: 'innovation-differentiation',
    title: 'Innovation & Differentiation',
    description: 'Highlight your unique innovations and what sets you apart',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_technology_role', question: 'Which of the following best describes the role of technology in your value proposition?', type: 'text' },
      { id: 'htraction_defensible_ip', question: 'Do you currently own or are you building proprietary technology or defensible IP?', type: 'text' },
    ],
  },
  {
    id: 'product-market-fit',
    title: 'Product-Market Fit (PMF)',
    description: 'Prove that you have achieved or are close to product-market fit',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    questions: [
      { id: 'htraction_pmf_status', question: 'What best describes your current level of product-market fit and customer validation?', type: 'text' },
      { id: 'htraction_net_promoter_score', question: 'What best describes your current customer satisfaction and retention strength?', type: 'text' },
      { id: 'htraction_customer_acquisition_channels', question: 'Which best describes your primary customer acquisition channels?', type: 'textarea' },
      { id: 'htraction_pmf_feedback_loop', question: 'What feedback loops do you have in place to improve product-market fit?', type: 'textarea' },
    ],
  },
];

export default function CompanyProfile() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [animatedQuestions, setAnimatedQuestions] = useState<Record<number, boolean>>({});

  const currentSectionData = sections[currentSection];
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  useEffect(() => {
    // Animate questions when section changes
    const newAnimated: Record<number, boolean> = {};
    currentSectionData.questions.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedQuestions(prev => ({ ...prev, [index]: true }));
      }, index * 100);
    });
    setAnimatedQuestions({});
  }, [currentSection]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 py-8 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/20 to-yellow-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative inline-block mb-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2.5 tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto">
            Complete all questions across 8 sections to get matched with investors
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Disclaimer Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-900 mb-2">Disclaimer</h4>
                    <p className="text-xs text-gray-700 leading-relaxed mb-2">
                      All questions are mandatory and directly impact your scoring and evaluation.
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      False or unverifiable data may lead to disqualification during diligence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl shadow-xl p-5 overflow-hidden">
                <h3 className="text-sm font-bold text-white mb-4">Sections</h3>
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setCurrentSection(index);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-semibold text-left transition-all duration-200 transform hover:scale-[1.02] ${
                        index === currentSection
                          ? 'bg-white/20 text-white shadow-md shadow-white/20 border-2 border-white/30'
                          : 'bg-white/10 text-white/90 hover:bg-white/20 border-2 border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === currentSection
                            ? 'bg-white text-orange-600'
                            : 'bg-white/20 text-white'
                        }`}>
                          {section.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{section.title}</div>
                          <div className={`text-xs mt-0.5 ${
                            index === currentSection ? 'text-white' : 'text-white/70'
                          }`}>
                            {section.questions.length} questions
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Current Section Questions */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-7 md:p-9 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Section Header */}
              <div className="mb-7 pb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/30 transition-all duration-300">
                    {currentSectionData.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentSectionData.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{currentSectionData.description}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Section {currentSection + 1} of {sections.length} • {currentSectionData.questions.length} questions
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-5">
                {currentSectionData.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className={`transition-all duration-500 ${
                      animatedQuestions[qIndex]
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${qIndex * 100}ms` }}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {qIndex + 1}
                      </span>
                      {question.question}
                    </label>
                    {question.type === 'textarea' ? (
                      <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        rows={4}
                        className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm resize-none"
                        placeholder="Type your answer here..."
                      />
                    ) : question.type === 'select' ? (
                      <div className="relative">
                        <select
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm appearance-none cursor-pointer"
                        >
                          <option value="">Select an option</option>
                          {question.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <input
                        type={question.type}
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white/50 text-sm"
                        placeholder="Enter your answer"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mt-8 pt-6 border-t border-gray-200/50">
                <button
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {currentSection === sections.length - 1 ? (
                    <>
                      Complete Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next Section
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

