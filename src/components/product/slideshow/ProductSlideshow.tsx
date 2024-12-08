"use client";
import React, { useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper as SwiperObjet } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

interface Props {
    images: string[];
    title: string;
    className?: string;
}
export const ProductSlideshow = ({ images, title, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObjet>();
    return (
        <div className={className}>
            <Swiper
                style={
                    {
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                autoplay={{ delay: 1112500 }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <Image
                            alt={title}
                            src={`/products/${image}`}
                            width={1024}
                            height={800}
                            className="rounded-lg object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <Image alt={title} src={`/products/${image}`} width={300} height={300} className="rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
