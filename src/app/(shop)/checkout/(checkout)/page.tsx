import { HSeparator, TitleComponent } from "@/components";
import Link from "next/link";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <TitleComponent title="Verificar orden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href="/cart" className="underline mb-5">
                            Editar carrito
                        </Link>

                        {/* Items */}
                        <ProductsInCartCheckout />
                    </div>
                    {/* Checkout */}
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
}
