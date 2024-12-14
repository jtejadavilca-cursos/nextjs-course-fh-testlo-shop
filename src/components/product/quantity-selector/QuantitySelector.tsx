"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;

    onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
    const [count, setCount] = useState(quantity);

    const onValueChange = (newQuantity: number) => {
        if (count + newQuantity < 1) return;
        setCount(count + newQuantity);
        onQuantityChange(count + newQuantity);
    };

    return (
        <div className="flex w-full justify-evenly max-w-40">
            <button onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 px-5 bg-gray-100 text-center">{count}</span>
            <button onClick={() => onValueChange(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    );
};
