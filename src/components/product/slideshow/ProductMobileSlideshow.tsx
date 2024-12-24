"use client";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
    images: string[];
    title: string;
    className?: string;
}
export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
    return (
        <div className={className}>
            <Swiper
                style={{
                    width: "100vw",
                    height: "500px",
                }}
                pagination={true}
                autoplay={{ delay: 1112500 }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper2"
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <ProductImage
                            alt={title}
                            src={image === "-" ? undefined : image}
                            width={600}
                            height={500}
                            className="object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
