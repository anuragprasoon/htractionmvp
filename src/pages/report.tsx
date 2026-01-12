import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface FormValue {
  name: string;
  value: string | string[] | any[];
  label: string;
  valueType: string;
  key: string;
}

interface FormData {
  formKey: string;
  formName: string;
  formValues: FormValue[];
}

interface ReportData {
  formWiseData: FormData[];
  score: string;
}

export default function Report() {
  const router = useRouter();
  const [animated, setAnimated] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  // Sample data - in production, this would come from props or API
  const reportData: ReportData = {
    formWiseData: [
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-0",
        formName: "Business Profiling",
        formValues: [
          { name: "Startup Name", value: "Star AI", label: "Name of your startup", valueType: "string", key: "htraction_startup_name" },
          { name: "Is Startup Registered", value: "Yes", label: "Are you a Registered Startup?", valueType: "string", key: "htraction_is_startup_registered" },
          { name: "Date of  Incorporation", value: "12/2025", label: "Date of  Incorporation", valueType: "string", key: "htraction_date_of_incorporation" },
          { name: "Headquarter Location", value: "Hyderabad", label: "Headquarter Location", valueType: "string", key: "htraction_headquarter_location" },
          { name: "Industry/Sector", value: "Artificial Intelligence / ML", label: "Industry/Sector", valueType: "string", key: "htraction_industry_sector" },
          { name: "Outreach Business Model", value: ["B2B", "B2C"], label: "Outreach Business Model", valueType: "string[]", key: "htraction_outreach_business_model" },
          { name: "Stage of Startup", value: "MVP (Minimum Viable Product)", label: "Stage of Startup", valueType: "string", key: "htraction_startup_stage" },
          { name: "Raised External Funding", value: "Yes", label: "Have you raised external funding before?", valueType: "string", key: "htraction_raise_funding_before" },
          { name: "Funding Type", value: "Angel", label: "Funding Type", valueType: "string", key: "htraction_funding_type" },
          { name: "Your last funding amount (in USD)", value: "100000", label: "Your last funding amount (in USD)", valueType: "string", key: "htraction_funding_amount" },
          { name: "Funding Source", value: "Peak XV", label: "Name Lead Investor(s) / Funding Source", valueType: "string", key: "htraction_funding_source" },
          { name: "Target Raise Amount", value: "$250K - $500K", label: "How much capital are you currently looking to raise (in USD)?", valueType: "string", key: "htraction_target_raise_amount" },
          { name: "Current Funding Round", value: "Seed", label: "Which funding round are you currently raising?", valueType: "string", key: "htraction_current_funding_round" },
          { name: "Website", value: "https://star.ai/", label: "Website URL", valueType: "url", key: "htraction_startup_website" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-1",
        formName: "Business Model",
        formValues: [
          { name: "Total Addressable Market", value: "$1B+ (with strong data backing)", label: "What is your Total Addressable Market (TAM)", valueType: "string", key: "htraction_total_addressable_market" },
          { name: "Projected Annual Growth Rate", value: "10% - 15%", label: "What is the projected annual growth rate (CAGR) of your target market over the next 5 years?", valueType: "string", key: "htraction_projected_annual_growth_rate" },
          { name: "Revenue Model", value: "Subscription-based", label: "What is your primary revenue model?", valueType: "string", key: "htraction_revenue_model" },
          { name: "Recurring / Repeatable Revenue", value: "Yes. Some repeat customers", label: "Do you currently have any recurring or repeatable revenue streams?", valueType: "string", key: "htraction_recurring_revenue" },
          { name: "Gross Margins", value: "50 - 70%", label: "How would you describe your gross margins (actual or projected)?", valueType: "string", key: "htraction_gross_margins" },
          { name: "CAC to LTV ratio", value: "LTV =2-3x CAC", label: "What is your CAC to LTV ratio (if known)?", valueType: "string", key: "htraction_cac_ltv_ratio" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-2",
        formName: "Growth Traction",
        formValues: [
          { name: "Annual Revenue Range", value: "<$10K", label: "What is your current annual revenue range?", valueType: "string", key: "htraction_annual_revenue_range" },
          { name: "Revenue Growth Trend", value: "10-20% MoM", label: "What has been your revenue growth trend over the last 6 months?", valueType: "string", key: "htraction_revenue_growth_trend" },
          { name: "Customer Base Grown", value: "10-20% MoM", label: "How has your user/customer base grown in the last 6 months?", valueType: "string", key: "htraction_customer_base_grown" },
          { name: "Repeat Customers Percent", value: "41-60%", label: "What percentage of your customers are repeat users or subscribers?", valueType: "string", key: "htraction_repeat_customers_percent" },
          { name: "Operating Region", value: "India & International", label: "Where are you currently operating?", valueType: "string", key: "htraction_operating_region" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-3",
        formName: "Founders Profile",
        formValues: [
          { name: "Cap Table", value: [{ Name: "P1", "Role/Category": "Founder", "% Ownership": "33", "Amount Invested (In USD)": "40000" }, { Name: "P2", "Role/Category": "Founder", "% Ownership": "33", "Amount Invested (In USD)": "30000" }, { Name: "P3", "Role/Category": "Founder", "% Ownership": "34", "Amount Invested (In USD)": "40000" }], label: "Create your current Cap Table", valueType: "table", key: "htraction_cap_table" },
          { name: "Founding Team Composition", value: [{ Name: "P1", "Role/Category": "CEO", "Linkedin Profile": "https://www.linkedin.com/in" }, { Name: "P2", "Role/Category": "COO", "Linkedin Profile": "https://www.linkedin.com/in" }, { Name: "P3", "Role/Category": "CFO", "Linkedin Profile": "https://www.linkedin.com/in" }], label: "What is the founding team composition?", valueType: "table", key: "htraction_founding_team_composition_table" },
          { name: "Founder Experience", value: "Yes, built a startup that didn't exit/scale but gained meaningful traction/learning.", label: "Do any founders have prior entrepreneurial experience (built or exited ventures)?", valueType: "string", key: "htraction_founder_experience" },
          { name: "Founding Team Functions", value: ["Tech", "Product", "Sales/Marketing", "Strategy/Operations", "Finance"], label: "What key functions are represented by the founding team?", valueType: "string[]", key: "htraction_founding_team_functions" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-4",
        formName: "Competitive Positioning",
        formValues: [
          { name: "Unique Value Proposition", value: "Technology/IP", label: "How does your offering differentiate from the competition?", valueType: "string", key: "htraction_unique_value_proposition" },
          { name: "Product Differentiation Validated", value: "Yes. Consistently validated", label: "Is your product/offering differentiation been validated by customers or users?", valueType: "string", key: "htraction_product_differentiation_validated" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-5",
        formName: "Sustainability & Resilience",
        formValues: [
          { name: "Current Cash Runway", value: "6-12 months", label: "What is your current cash runway based on average monthly burn?", valueType: "string", key: "htraction_current_cash_runway" },
          { name: "Multiple Revenue Streams", value: "Yes. Plans for future diversification", label: "Do you have multiple revenue streams or levers to support survival during downturns?", valueType: "string", key: "htraction_multiple_revenue_streams" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-6",
        formName: "Innovation & Differentiation",
        formValues: [
          { name: "Technology Role", value: "Technology is the core differentiator (deep tech/IP)", label: "Which of the following best describes the role of technology in your value proposition?", valueType: "string", key: "htraction_technology_role" },
          { name: "Defensible IP", value: "Yes. Patents/IP granted", label: "Do you currently own or are you building proprietary technology or defensible IP?", valueType: "string", key: "htraction_defensible_ip" },
        ]
      },
      {
        formKey: "1024910295-b5fd6191-e4b1-4774-ba3d-81a46eed5d8b-1760599905587-FORM-CONFIG-7",
        formName: "Product-Market Fit (PMF)",
        formValues: [
          { name: "PMF Status", value: "Advanced Validation", label: "What best describes your current level of product-market fit and customer validation?", valueType: "string", key: "htraction_pmf_status" },
          { name: "Net Promoter Score", value: "Healthy retention", label: "What best describes your current customer satisfaction and retention strength?", valueType: "string", key: "htraction_net_promoter_score" },
        ]
      }
    ],
    score: "78.13"
  };

  const overallScore = parseFloat(reportData.score);

  // Score breakdown data
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

  useEffect(() => {
    setAnimated(true);
    const duration = 2000;
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

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981'; // green
    if (score >= 75) return '#3B82F6'; // blue
    return '#6B7280'; // gray
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return '#D1FAE5'; // light green
    if (score >= 75) return '#DBEAFE'; // light blue
    return '#F3F4F6'; // light gray
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, ReactNode> = {
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

  // Helper function to get value by key
  const getValue = (key: string): string | string[] | any[] => {
    for (const form of reportData.formWiseData) {
      const found = form.formValues.find(v => v.key === key);
      if (found) return found.value;
    }
    return '-';
  };

  // Helper function to format value display
  const formatValue = (value: string | string[] | any[]): string => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        return `${value.length} items`;
      }
      return value.join(', ');
    }
    if (typeof value === 'string' && value.startsWith('http')) {
      return value;
    }
    return value || '-';
  };

  // Get key metrics for executive summary
  const companyName = getValue('htraction_startup_name') as string;
  const industry = getValue('htraction_industry_sector') as string;
  const stage = getValue('htraction_startup_stage') as string;
  const location = getValue('htraction_headquarter_location') as string;
  const targetRaise = getValue('htraction_target_raise_amount') as string;
  const fundingRound = getValue('htraction_current_funding_round') as string;
  const revenue = getValue('htraction_annual_revenue_range') as string;
  const revenueGrowth = getValue('htraction_revenue_growth_trend') as string;
  const tam = getValue('htraction_total_addressable_market') as string;
  const runway = getValue('htraction_current_cash_runway') as string;
  const grossMargins = getValue('htraction_gross_margins') as string;
  const ltvCac = getValue('htraction_cac_ltv_ratio') as string;
  const pmfStatus = getValue('htraction_pmf_status') as string;
  const capTable = getValue('htraction_cap_table') as any[];
  const team = getValue('htraction_founding_team_composition_table') as any[];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F4F2' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>Startup Report</h1>
                <p className="text-xs text-gray-500">Comprehensive evaluation & analysis</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50/30 rounded-2xl border border-orange-200/50 p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#111928' }}>{companyName}</h2>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">{industry}</span>
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">{location}</span>
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">{stage}</span>
              </div>
              <p className="text-gray-600 text-sm">Raising <span className="font-semibold text-orange-600">{targetRaise}</span> in <span className="font-semibold">{fundingRound}</span> round</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative" style={{ width: '160px', height: '120px' }}>
                <svg width="160" height="120" viewBox="0 0 200 120" className="transform" style={{ marginBottom: '20px' }}>
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#F5671A"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(displayScore / 100) * 251.2} 251.2`}
                    className="transition-all duration-300 ease-out"
                    style={{ filter: animated ? 'drop-shadow(0 0 8px rgba(245, 103, 26, 0.4))' : 'none' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 mt-10">
                  <div className="text-4xl font-bold" style={{ color: '#F5671A' }}>
                    {Math.round(displayScore)}
                  </div>
                  <div className="text-xs text-gray-400">HScore</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown Section */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-50" style={{ color: '#F5671A' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#111928' }}>Score Breakdown</h2>
              <p className="text-sm text-gray-500">Detailed evaluation across key categories</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreBreakdown.map((item, index) => (
              <div
                key={item.category}
                className={`p-4 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300 ${
                  animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  backgroundColor: '#FAFBFC'
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: getScoreBgColor(item.score),
                      color: getScoreColor(item.score)
                    }}
                  >
                    {getCategoryIcon(item.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: '#111928' }}>
                        {item.category}
                      </h3>
                      <div className="flex items-center gap-2 ml-3">
                        <span
                          className="text-xl font-bold"
                          style={{ color: getScoreColor(item.score) }}
                        >
                          {item.score}
                        </span>
                        <span className="text-xs text-gray-400">/100</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.explanation}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor: getScoreColor(item.score)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Annual Revenue"
            value={revenue}
            color="#10B981"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            label="Revenue Growth"
            value={revenueGrowth}
            color="#3B82F6"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            label="TAM"
            value={tam}
            color="#F5671A"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Cash Runway"
            value={runway}
            color="#8B5CF6"
          />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Financial & Business Model */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Health */}
            <SectionCard
              title="Financial Health"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            >
              <DataRow label="Annual Revenue" value={revenue} />
              <DataRow label="Revenue Growth (MoM)" value={revenueGrowth} />
              <DataRow label="Gross Margins" value={grossMargins} />
              <DataRow label="LTV:CAC Ratio" value={ltvCac} />
              <DataRow label="Cash Runway" value={runway} />
            </SectionCard>

            {/* Market Opportunity */}
            <SectionCard
              title="Market Opportunity"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <DataRow label="Total Addressable Market (TAM)" value={tam} />
              <DataRow label="Market Growth (CAGR)" value={formatValue(getValue('htraction_projected_annual_growth_rate'))} />
              <DataRow label="Market Shift Alignment" value={formatValue(getValue('htraction_market_shift_monitoring'))} />
            </SectionCard>

            {/* Business Model */}
            <SectionCard
              title="Business Model & Unit Economics"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            >
              <DataRow label="Revenue Model" value={formatValue(getValue('htraction_revenue_model'))} />
              <DataRow label="Recurring Revenue" value={formatValue(getValue('htraction_recurring_revenue'))} />
              <DataRow label="Gross Margins" value={grossMargins} />
              <DataRow label="LTV:CAC Ratio" value={ltvCac} />
              <DataRow label="Scalability" value={formatValue(getValue('htraction_scalability_factor'))} />
            </SectionCard>

            {/* Growth Traction */}
            <SectionCard
              title="Growth & Traction"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            >
              <DataRow label="Customer Growth (MoM)" value={formatValue(getValue('htraction_customer_base_grown'))} />
              <DataRow label="Repeat Customers" value={formatValue(getValue('htraction_repeat_customers_percent'))} />
              <DataRow label="Operating Region" value={formatValue(getValue('htraction_operating_region'))} />
              <DataRow label="Customer Acquisition Strategy" value={formatValue(getValue('htraction_defined_customer_acquisition_strategy'))} />
            </SectionCard>

            {/* Competitive Advantage */}
            <SectionCard
              title="Competitive Advantage"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            >
              <DataRow label="Unique Value Proposition" value={formatValue(getValue('htraction_unique_value_proposition'))} />
              <DataRow label="Differentiation Validated" value={formatValue(getValue('htraction_product_differentiation_validated'))} />
              <DataRow label="Technology Role" value={formatValue(getValue('htraction_technology_role'))} />
              <DataRow label="Defensible IP" value={formatValue(getValue('htraction_defensible_ip'))} />
            </SectionCard>
          </div>

          {/* Right Column - Team & PMF */}
          <div className="lg:col-span-1 space-y-6">
            {/* Team & Cap Table */}
            <SectionCard
              title="Founding Team"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            >
              {team && Array.isArray(team) && team.length > 0 ? (
                <div className="space-y-3">
                  {team.map((member: any, idx: number) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="font-semibold text-sm mb-1" style={{ color: '#111928' }}>{member.Name}</div>
                      <div className="text-xs text-gray-600 mb-2">{member['Role/Category']}</div>
                      {member['Linkedin Profile'] && member['Linkedin Profile'] !== '-' && member['Linkedin Profile'] !== 'https://www.linkedin.com/in' && (
                        <a href={member['Linkedin Profile']} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          View LinkedIn
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Team information not available</p>
              )}
              {getValue('htraction_founding_team_functions') && Array.isArray(getValue('htraction_founding_team_functions')) && (getValue('htraction_founding_team_functions') as string[]).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 mb-2">Team Functions</div>
                  <div className="flex flex-wrap gap-2">
                    {(getValue('htraction_founding_team_functions') as string[]).map((func: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">{func}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 mb-2">Team Functions</div>
                <div className="flex flex-wrap gap-2">
                  {(getValue('htraction_founding_team_functions') as string[]).map((func: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">{func}</span>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Cap Table */}
            {capTable && Array.isArray(capTable) && capTable.length > 0 && (
              <SectionCard
                title="Cap Table"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              >
                <div className="space-y-2">
                  {capTable.map((holder: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: '#111928' }}>{holder.Name}</div>
                        <div className="text-xs text-gray-500">{holder['Role/Category']}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ color: '#F5671A' }}>{holder['% Ownership']}%</div>
                        <div className="text-xs text-gray-500">${parseInt(holder['Amount Invested (In USD)']).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Product-Market Fit */}
            <SectionCard
              title="Product-Market Fit"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <DataRow label="PMF Status" value={pmfStatus} />
              <DataRow label="Customer Satisfaction" value={formatValue(getValue('htraction_net_promoter_score'))} />
              {getValue('htraction_customer_acquisition_channels') && Array.isArray(getValue('htraction_customer_acquisition_channels')) && (getValue('htraction_customer_acquisition_channels') as string[]).length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 mb-2">Acquisition Channels</div>
                  <div className="flex flex-wrap gap-2">
                    {(getValue('htraction_customer_acquisition_channels') as string[]).map((channel: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg">{channel}</span>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Funding History */}
            <SectionCard
              title="Funding History"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <DataRow label="Previous Funding" value={formatValue(getValue('htraction_raise_funding_before'))} />
              <DataRow label="Last Round Type" value={formatValue(getValue('htraction_funding_type'))} />
              <DataRow label="Last Round Amount" value={formatValue(getValue('htraction_funding_amount')) !== '-' ? `$${parseInt(formatValue(getValue('htraction_funding_amount')) as string).toLocaleString()}` : '-'} />
              <DataRow label="Lead Investor" value={formatValue(getValue('htraction_funding_source'))} />
              <DataRow label="Target Raise" value={targetRaise} />
              <DataRow label="Current Round" value={fundingRound} />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/50 p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
      </div>
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ color: '#111928' }}>{value}</div>
    </div>
  );
}

// Section Card Component
function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-orange-50" style={{ color: '#F5671A' }}>
          {icon}
        </div>
        <h3 className="text-lg font-bold" style={{ color: '#111928' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Data Row Component
function DataRow({ label, value }: { label: string; value: string }) {
  const isUrl = typeof value === 'string' && value.startsWith('http');
  
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="text-sm text-gray-600 flex-1">{label}</div>
      <div className="text-sm font-semibold text-right ml-4" style={{ color: '#111928' }}>
        {isUrl ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
            {value}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

