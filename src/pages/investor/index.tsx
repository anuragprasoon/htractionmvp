import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface StartupApplication {
  id: number;
  name: string;
  industry: string;
  stage: string;
  location: string;
  hScore: number;
  targetRaise: string;
  fundingRound: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted';
}

export default function InvestorDashboard() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'reviewed' | 'shortlisted'>('all');

  // Mock startup applications data
  const startupApplications: StartupApplication[] = [
    {
      id: 1,
      name: 'Star AI',
      industry: 'Artificial Intelligence / ML',
      stage: 'MVP Stage',
      location: 'Hyderabad',
      hScore: 78,
      targetRaise: '$250K - $500K',
      fundingRound: 'Seed',
      submittedDate: '2024-01-15',
      status: 'pending',
    },
    {
      id: 2,
      name: 'CloudSync',
      industry: 'SaaS / B2B',
      stage: 'Early Stage',
      location: 'Bangalore',
      hScore: 85,
      targetRaise: '$500K - $1M',
      fundingRound: 'Seed',
      submittedDate: '2024-01-12',
      status: 'reviewed',
    },
    {
      id: 3,
      name: 'HealthTech Pro',
      industry: 'Healthcare / HealthTech',
      stage: 'Growth Stage',
      location: 'Mumbai',
      hScore: 92,
      targetRaise: '$1M - $2M',
      fundingRound: 'Series A',
      submittedDate: '2024-01-10',
      status: 'shortlisted',
    },
    {
      id: 4,
      name: 'EduLearn',
      industry: 'EdTech',
      stage: 'MVP Stage',
      location: 'Delhi',
      hScore: 72,
      targetRaise: '$100K - $250K',
      fundingRound: 'Pre-Seed',
      submittedDate: '2024-01-08',
      status: 'pending',
    },
    {
      id: 5,
      name: 'FinFlow',
      industry: 'FinTech',
      stage: 'Early Stage',
      location: 'Bangalore',
      hScore: 88,
      targetRaise: '$750K - $1.5M',
      fundingRound: 'Seed',
      submittedDate: '2024-01-05',
      status: 'reviewed',
    },
  ];

  const filteredApplications = selectedStatus === 'all' 
    ? startupApplications 
    : startupApplications.filter(app => app.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return { bg: '#D1FAE5', text: '#065F46', border: '#10B981' };
      case 'reviewed':
        return { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' };
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981';
    if (score >= 75) return '#F5671A';
    return '#6B7280';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F4F2' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#111928' }}>
                <span className="text-white font-semibold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>Investor Dashboard</h1>
                <p className="text-xs text-gray-500">Private market opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Link href="/investor/ai" className="block">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#FFF7ED' }}>
                  <svg className="w-6 h-6" style={{ color: '#F5671A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>htraction AI</h3>
                  <p className="text-sm text-gray-600">Private market data at your fingertips—instantly</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/investor/thesis" className="block">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#FFF7ED' }}>
                  <svg className="w-6 h-6" style={{ color: '#F5671A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>Configure Thesis</h3>
                  <p className="text-sm text-gray-600">Define your investment criteria</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group h-full">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#FFF7ED' }}>
                <svg className="w-6 h-6" style={{ color: '#F5671A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>Support</h3>
                <p className="text-sm text-gray-600">Get help and assistance</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Startup Applications Section */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: '#111928' }}>Startup Applications</h2>
                <p className="text-sm text-gray-600">{startupApplications.length} total applications</p>
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'pending', 'reviewed', 'shortlisted'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedStatus === status
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={
                    selectedStatus === status
                      ? { backgroundColor: '#F5671A' }
                      : {}
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({startupApplications.filter(app => app.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Applications List */}
          <div className="divide-y divide-gray-200/50">
            {filteredApplications.map((application) => {
              const statusColors = getStatusColor(application.status);
              return (
                <Link
                  key={application.id}
                  href={`/report`}
                  className="block p-6 hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-lg border border-gray-200" style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}>
                            {application.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold" style={{ color: '#111928' }}>
                              {application.name}
                            </h3>
                            <span
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold border"
                              style={{
                                backgroundColor: statusColors.bg,
                                color: statusColors.text,
                                borderColor: statusColors.border,
                              }}
                            >
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {application.industry}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {application.location}
                            </span>
                            <span>{application.stage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Target Raise:</span>
                          <span className="ml-1 font-semibold" style={{ color: '#111928' }}>
                            {application.targetRaise}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Round:</span>
                          <span className="ml-1 font-semibold" style={{ color: '#111928' }}>
                            {application.fundingRound}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Submitted:</span>
                          <span className="ml-1 font-semibold" style={{ color: '#111928' }}>
                            {new Date(application.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">HScore</div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: getScoreColor(application.hScore) }}
                        >
                          {application.hScore}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

