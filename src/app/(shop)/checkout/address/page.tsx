import { TitleComponent } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions/address/get-user-address";

export default async function CheckoutAddressPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login?returnTo=/checkout/address");
    }
    const countries = await getCountries();
    const userAddress = await getUserAddress(session!.user.id);
    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <TitleComponent title="Dirección" subtitle="Dirección de entrega" />

                <AddressForm countries={countries} userAddressStored={userAddress.address} />
            </div>
        </div>
    );
}
