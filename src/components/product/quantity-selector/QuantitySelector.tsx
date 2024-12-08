"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState(quantity);

    const onQuantityChange = (newQuantity: number) => {
        if (count + newQuantity < 1) return;
        setCount(count + newQuantity);
    };

    return (
        <div className="flex w-full justify-evenly">
            <button onClick={() => onQuantityChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 px-5 bg-gray-100 text-center">{count}</span>
            <button onClick={() => onQuantityChange(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    );
};