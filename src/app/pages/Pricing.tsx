import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Zap, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
// @ts-ignore
import useRazorpay from 'react-razorpay';

export function Pricing() {
  const { user, upgradeToPro } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [Razorpay] = useRazorpay();

  const handleSubscribe = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    const options = {
      key: 'rzp_test_mock_key', // Mock key for frontend test
      amount: '2900', // Rs 29.00 in paise
      currency: 'INR',
      name: 'Techroom',
      description: 'Pro Subscription (Rs 29/month)',
      image: 'https://cdn.lucide.dev/lucide-react/0.487.0/code-2.svg',
      handler: function (response: any) {
        // Mock successful payment verification
        console.log(response.razorpay_payment_id);
        upgradeToPro();
        setIsProcessing(false);
        navigate('/dashboard');
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9999999999'
      },
      notes: {
        address: 'Techroom HQ'
      },
      theme: {
        color: '#2563eb'
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error(response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay mock flow:", error);
      // If Razorpay script fails to load, fallback to direct mock
      setTimeout(() => {
        upgradeToPro();
        setIsProcessing(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
          Supercharge your learning journey
        </h1>
        <p className="text-lg text-muted-foreground">
          Get unlimited access to ATS resume templates, interview prep, and premium courses for less than the cost of a coffee.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card rounded-3xl p-8 border border-[var(--brand-blue)] shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-blue)] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
            MOST POPULAR
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">₹29</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
            <p className="text-sm text-green-500 font-medium mt-2">Includes 2-day free trial</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              'Full access to all premium courses',
              'Advanced ATS resume analyzer',
              'Unlimited mock interviews with AI',
              'Priority 1-on-1 mentorship',
              'Ad-free experience'
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-blue)] shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
            style={{ background: 'var(--brand-gradient)' }}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Start 2-Day Free Trial
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" /> Secure payment via Razorpay
          </p>
        </motion.div>
      </div>
    </div>
  );
}
