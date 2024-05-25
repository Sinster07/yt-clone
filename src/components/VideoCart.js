import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import API_KEY from "../constant/youtube";

const VideoCart = ({ item }) => {
  return (
    <div className="w-94 cursor-pointer my-2">
      <img className="rounded-xl w-full" src={item.thumbnail} alt="ytvideo" />
      <div>
        <div className="flex mt-2">
          {/* <Avatar src={ytIcon} size={35} round={true} /> */}
          <div className="ml-2">
            <h1 className="font-bold">{item.title}</h1>
            <p className="text-l text-black font-semibold ">
              {item.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
