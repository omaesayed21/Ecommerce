import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";

export default function SimpleSlider() {


    function CatogerisSlidersAPi(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

  const {data , isLoading }   =    useQuery("catogeisSlider" , CatogerisSlidersAPi)

  if (isLoading) {
    return
    
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
        {data.data.data.map((catogeris , idex) => <div className=" text-center">
            <img  style={{height: "300px"}} className=" mt-2 w-100" src={catogeris.image} alt={catogeris.image} />
            <h3>{catogeris.name}</h3>
        </div> )}
    </Slider>
  );
}