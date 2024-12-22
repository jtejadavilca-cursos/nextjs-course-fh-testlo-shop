import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    isOrderPaid: boolean;
}

export const OrderStatus = ({ isOrderPaid }: Props) => {
    return (
        <>
            <div
                className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                    "bg-red-500": !isOrderPaid,
                    "bg-green-700": isOrderPaid,
                })}
            >
                <IoCardOutline className="text-2xl" />
                {isOrderPaid ? <span className="mx-2">Pagada</span> : <span className="mx-2">Pendiente</span>}
            </div>
        </>
    );
};
