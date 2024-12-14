import clsx from "clsx";
import type { Size } from "@/interfaces";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChange }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold text-sm">Selecciona una talla</h3>
            <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={clsx("mx-2 hover:underline text-lg", { underline: size === selectedSize })}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};
