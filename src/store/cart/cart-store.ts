import { create } from "zustand";
import type { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface CartState {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotalAmount: number;
        taxes: number;
        totalAmount: number;
        itemsInCart: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
            getSummaryInformation: () => {
                const subTotalAmount = get().cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
                const taxes = subTotalAmount * 0.15;
                const totalAmount = subTotalAmount + taxes;
                const itemsInCart = get().cart.reduce((acc, item) => acc + item.quantity, 0);

                return {
                    subTotalAmount,
                    taxes,
                    totalAmount,
                    itemsInCart,
                };
            },
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1. Check if the product is already in the cart
                const isProductInCart = cart.some((p) => p.id === product.id && p.size === product.size);
                if (!isProductInCart) {
                    return set((state) => ({ cart: [...state.cart, product] }));
                }

                // 2. Update the quantity of the product
                const updatedCart = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    }

                    return item;
                });

                set(() => ({ cart: updatedCart }));
            },
            updateProductQuantity: (product: CartProduct, quantity) =>
                set((state) => ({
                    cart: state.cart.map((p) =>
                        p.id === product.id && p.size === product.size ? { ...p, quantity } : p
                    ),
                })),
            removeProductFromCart: (product) => {
                const { cart } = get();

                const updatedCart = cart.filter((p) => p.id !== product.id || p.size !== product.size);

                set({ cart: updatedCart });
            },
            clearCart: () => set({ cart: [] }),
        }),
        { name: "shopping-cart" }
    )
);
/*
(set, get) => ({
        cart: [],
        addProductToCart: (product) => {
            const { cart } = get();
    
            // 1. Check if the product is already in the cart
            const isProductInCart = cart.some((p) => p.id === product.id && p.size === product.size);
            if (!isProductInCart) {
                return set((state) => ({ cart: [...state.cart, product] }));
            }
    
            // 2. Update the quantity of the product
            const updatedCart = cart.map((item) => {
                if (item.id === product.id && item.size === product.size) {
                    return { ...item, quantity: item.quantity + product.quantity };
                }
    
                return item;
            });
    
            set(() => ({ cart: updatedCart }));
        },
        updateProductQuantity: (productId, quantity) =>
            set((state) => ({
                cart: state.cart.map((product) => (product.id === productId ? { ...product, quantity } : product)),
            })),
        removeProductFromCart: (productId) =>
            set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),
    })

*/
