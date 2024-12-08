import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];
}

export const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold text-sm">Selecciona una talla</h3>
            <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                    <button
                        key={size}
                        className={clsx("mx-2 hover:underline text-lg", { underline: size === selectedSize })}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};
