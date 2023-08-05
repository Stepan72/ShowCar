"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { CustomButton } from ".";
import { calculateCarRent } from "@/utils";
import { CarDetails } from ".";
import { generateCarImageUrl } from "@/utils";

interface CarCardProps {
  car: CarProps;
}

function CarCard({ car }: CarCardProps) {
  const { city_mpg, make, model, transmission, year, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 font-extrabold text-[32px]">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car-model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/assets/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering-img"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/assets/tire.svg"
              width={20}
              height={20}
              alt="tire-img"
            />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/assets/gas.svg"
              width={20}
              height={20}
              alt="steering-img"
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container ">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue "
            rightIcon="/assets/right-arrow.svg"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
        car={car}
      />
    </div>
  );
}

export default CarCard;
