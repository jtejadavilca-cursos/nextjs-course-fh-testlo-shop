import Link from "next/link";
import { ProductsInCart, OrderSummary, TitleComponent } from "@/components";

export default function CartPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <TitleComponent title="Carrito" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href="/" className="underline mb-5">
                            Continúa comprando
                        </Link>

                        {/* Items */}

                        <ProductsInCart />
                    </div>
                    {/* Checkout */}

                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
