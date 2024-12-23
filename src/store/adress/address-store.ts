import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/interfaces";

interface AddressState {
    address: Address;
    setAddress: (address: Address) => void;
    clearAddress: () => void;
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
            clearAddress: () => {
                set({
                    address: {
                        firstName: "",
                        lastName: "",
                        address: "",
                        address2: "",
                        city: "",
                        country: "",
                        postalCode: "",
                        phone: "",
                    },
                });
            },
        }),
        { name: "address-store" }
    )
);
