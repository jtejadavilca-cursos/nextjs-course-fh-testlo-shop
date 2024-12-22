"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, saveTransactionId } from "@/actions";
import { useState } from "react";

interface Props {
    orderId: string;
    amout: number;
    currency: string;
    transactionId?: string;
}

export const PayPalButton = (props: Props) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const roundedAmount = Math.round(props.amout * 100) / 100;

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    invoice_id: props.orderId,
                    amount: {
                        value: `${roundedAmount}`,
                        currency_code: props.currency,
                    },
                },
            ],
            intent: "CAPTURE",
        });
        const savedTransactionId = await saveTransactionId(transactionId, props.orderId);
        if (!savedTransactionId.success) {
            setError(savedTransactionId.message);
        }
        return transactionId;
    };

    const onAppove = async (data: OnApproveData, actions: OnApproveActions) => {
        console.log("onAppove", data);
        const details = await actions.order?.capture();
        if (!details || !details.id || details.status !== "COMPLETED") {
            setError("Payment not completed");
            return;
        }

        const checkPayment = await paypalCheckPayment(details.id);

        if (!checkPayment.success) {
            setError(checkPayment.message);
            return;
        }
    };

    const onCancel = (data: any) => {
        console.log("onCancel", data);
    };

    const [{ isPending }] = usePayPalScriptReducer();
    if (isPending) {
        return (
            <div className="animate-pulse text-center">
                <div className="h-11 bg-gray-300 rounded"></div>
                <div className="h-11 bg-gray-300 rounded mt-2"></div>
            </div>
        );
    }

    return (
        <>
            <PayPalButtons createOrder={createOrder} onApprove={onAppove} onCancel={onCancel} />
            {error && <small className="bg-red-500 text-white p-2 rounded">{error}</small>}
        </>
    );
};
