import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address } from "@/interfaces";

interface AddressState {
    address: Address;
    setAddress: (address: Address) => void;
    // removeAddress: (address: Address) => void;
}

export const useAddressStore = create<AddressState>()(
    persist(
        (set, get) => ({
            address: {
                firstName: "",
                lastName: "",
                address: "",
                address2: "",
                city: "",
                country: "",
                postalCode: "",
                phone: "",
                userId: "",
            },
            setAddress: (address: Address) => {
                set(() => ({ address }));
            },
            // addresses: [],
            // addAddress: (address: Address) => {
            //     set((state) => ({ addresses: [...state.addresses, address] }));
            // },
            // removeAddress: (address: Address) => {
            //     set((state) => ({
            //         addresses: state.addresses.filter((a) => a.id !== address.id),
            //     }));
            // },
        }),
        { name: "address-store" }
    )
);
