'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
).replace(/\/$/, '');

function PaymentCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState(
    'Confirming your PhonePe payment...'
  );

  useEffect(() => {
    const orderId = params.get('orderId');

    if (!orderId) {
      setMessage('Payment callback is missing the order reference.');
      return;
    }

    fetch(
      `${API_URL}/api/payments/callback?orderId=${encodeURIComponent(orderId)}`
    )
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok || !result.paid) {
          throw new Error('Payment was not completed.');
        }

        setMessage(
          'Payment successful. Redirecting to your order...'
        );

        setTimeout(() => {
          router.push('/order-tracking');
        }, 800);
      })
      .catch((error) =>
        setMessage(
          error instanceof Error
            ? error.message
            : 'Payment could not be confirmed.'
        )
      );
  }, [params, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F0] p-6">
      <p className="font-serif text-xl text-[#103C26]">
        {message}
      </p>
    </main>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#FAF7F0] p-6">
          <p className="font-serif text-xl text-[#103C26]">
            Processing payment...
          </p>
        </main>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
