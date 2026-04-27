"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { personData } from "/src/app/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PersonList = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,109,255,.18),transparent_40%),linear-gradient(180deg,rgba(12,16,35,.98),rgba(7,10,22,.98))] p-5 shadow-[0_20px_55px_rgba(0,0,0,.38)]">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 p-2.5">
            <Quote className="h-5 w-5 text-cyan-200" />
          </div>
          <h4 className="text-2xl font-semibold text-white">More Reviews</h4>
        </div>

        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-5">
          <Slider {...settings}>
            {personData.map((project, index) => (
              <div key={`${project.name}-${index}`} className="px-1">
                <div className="flex min-h-[320px] flex-col items-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,18,39,.92),rgba(8,11,25,.96))] px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,.28)]">
                  <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_0_30px_rgba(99,102,241,.18)]">
                    <Image
                      src={`/per/${project.img}`}
                      alt={project.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>

                  <h5 className="mt-5 text-xl font-semibold text-white">
                    {project.name}
                  </h5>

                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    {project.info}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {project.des}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx global>{`
        .slick-dots {
          bottom: -34px;
        }

        .slick-dots li button:before {
          color: #94a3b8;
          opacity: 0.45;
          font-size: 10px;
        }

        .slick-dots li.slick-active button:before {
          color: #67e8f9;
          opacity: 1;
        }

        .slick-slide > div {
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default PersonList;