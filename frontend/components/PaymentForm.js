import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function PaymentForm({ onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-success`,
            },
            redirect: 'if_required'
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess();
            // We don't set loading to false here because we might redirect or change state
        } else {
            setIsLoading(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="mt-4">
            <PaymentElement id="payment-element" />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message" className="mt-4 text-red-500 text-sm">{message}</div>}
        </form>
    );
}
