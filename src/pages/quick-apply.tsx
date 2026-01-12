import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuickApply() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const investorId = router.query.investor ? parseInt(router.query.investor as string) : 1;

  const investors: Record<number, { name: string; logo: string; matchScore: number; focus: string }> = {
    1: { name: 'Accel Partners', logo: 'A', matchScore: 92, focus: 'SaaS, B2B' },
    2: { name: 'Sequoia Capital India', logo: 'S', matchScore: 88, focus: 'Fintech, Consumer' },
    3: { name: 'Blume Ventures', logo: 'B', matchScore: 85, focus: 'AI/ML, Edtech' },
    4: { name: 'Matrix Partners', logo: 'M', matchScore: 83, focus: 'SaaS, Enterprise' },
  };

  const investor = investors[investorId] || investors[1];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '💳', description: 'Pay via UPI' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks' },
    { id: 'wallet', name: 'Wallet', icon: '👛', description: 'Paytm, PhonePe, Google Pay' },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // Save applied investor to localStorage
    const investorId = router.query.investor ? parseInt(router.query.investor as string) : null;
    if (investorId) {
      const saved = localStorage.getItem('appliedInvestors');
      const appliedInvestors = saved ? JSON.parse(saved) : [];
      if (!appliedInvestors.includes(investorId)) {
        appliedInvestors.push(investorId);
        localStorage.setItem('appliedInvestors', JSON.stringify(appliedInvestors));
      }
    }
    
    setShowThankYouModal(true);
  };

  const handleCloseModal = () => {
    setShowThankYouModal(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F4F2' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Investor Info Card */}

        {/* Engaging Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#FEE2E2' }}>
            <svg className="w-8 h-8" style={{ color: '#F5671A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#111928' }}>
            You're One Step Away! 🚀
          </h1>
          <p className="text-lg text-gray-700 mb-2 font-medium">
            Complete your application to <span style={{ color: '#F5671A' }}>{investor.name}</span>
          </p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Join <span className="font-semibold text-orange-600">500+ startups</span> who've successfully raised funding through htraction. Your application will be reviewed within <span className="font-semibold">48 hours</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6" style={{ color: '#111928' }}>Select Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${
                        selectedMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold mb-1 ${
                          selectedMethod === method.id ? 'text-orange-700' : 'text-gray-900'
                        }`}>
                          {method.name}
                        </div>
                        <div className="text-xs text-gray-500">{method.description}</div>
                      </div>
                      {selectedMethod === method.id && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5671A' }}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold mb-6" style={{ color: '#111928' }}>Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-semibold text-gray-900">₹1,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold text-gray-900">₹0</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold" style={{ color: '#111928' }}>Total</span>
                  <span className="text-2xl font-bold" style={{ color: '#F5671A' }}>₹1,000</span>
                </div>
              </div>

              {/* Engaging Copy */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-orange-900 mb-1">
                      Invest in Your Future
                    </p>
                    <p className="text-xs text-orange-700">
                      This small investment opens doors to potential funding opportunities. 92% of applications get reviewed within 48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-gray-700">
                    Your payment is secured with 256-bit SSL encryption. Powered by Razorpay.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#F5671A' }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = '#e55a0f';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 103, 26, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5671A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Complete Application
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secured by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-in zoom-in-95 duration-500 relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 animate-in zoom-in duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#111928' }}>
                  Thank You for Applying! 🎉
                </h2>
                <p className="text-gray-600 mb-1">
                  Your application has been successfully submitted
                </p>
                <p className="text-sm text-gray-500">
                  We'll review your application and get back to you soon
                </p>
              </div>

              {/* Details Card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amount Paid</span>
                  <span className="text-sm font-bold" style={{ color: '#111928' }}>₹1,000</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCloseModal}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 text-white transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#F5671A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e55a0f';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 103, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5671A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Go to Dashboard
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

