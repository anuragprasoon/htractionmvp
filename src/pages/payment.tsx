import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const [selectedInvestor, setSelectedInvestor] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const investors = [
    { id: 1, name: 'Accel Partners', matchScore: 92 },
    { id: 2, name: 'Sequoia Capital India', matchScore: 88 },
    { id: 3, name: 'Blume Ventures', matchScore: 85 },
  ];

  const handlePayment = () => {
    // In a real app, this would integrate with payment gateway
    alert('Payment would be processed here. Redirecting to dashboard...');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply to Investors</h1>
          <p className="text-gray-600">Select investors and pay ₹1,000 per application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Investors</h2>
              <div className="space-y-3">
                {investors.map((investor) => (
                  <label
                    key={investor.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedInvestor === investor.id
                        ? 'border-[#CC471D] bg-[#CC471D]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="investor"
                      checked={selectedInvestor === investor.id}
                      onChange={() => setSelectedInvestor(investor.id)}
                      className="w-5 h-5 text-[#CC471D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{investor.name}</h3>
                        <span className="text-sm text-[#CC471D] font-medium">{investor.matchScore}% Match</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#CC471D] bg-[#CC471D]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="w-5 h-5 text-[#CC471D]"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">UPI</h3>
                    <p className="text-sm text-gray-600">Pay using UPI ID or QR code</p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#CC471D] bg-[#CC471D]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-[#CC471D]"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                    <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#CC471D] bg-[#CC471D]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="w-5 h-5 text-[#CC471D]"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Net Banking</h3>
                    <p className="text-sm text-gray-600">All major banks supported</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications</span>
                  <span className="text-gray-900 font-medium">
                    {selectedInvestor ? '1' : '0'} × ₹1,000
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="text-gray-900 font-medium">₹0</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-[#CC471D]">
                    ₹{selectedInvestor ? '1,000' : '0'}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedInvestor}
                className="w-full bg-[#CC471D] text-white py-3 rounded-lg font-semibold hover:bg-[#b03d18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay ₹{selectedInvestor ? '1,000' : '0'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

