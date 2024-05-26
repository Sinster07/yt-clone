import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API_KEY from "../constant/youtube";
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import { videos } from "../videos";
import VideoCart from "./VideoCart";
import InfiniteScroll from "react-infinite-scroll-component";

const Watch = () => {
  const [input, setInput] = useState("");
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [videoList, setVideoList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    dispatch(setMessage({ name: "Patel", message: input }));
    setInput("");
  };

  const fetchMoreData = () => {
    if (videoList.length >= videos.length) {
      setHasMore(false);
      return;
    }
    // Simulate an API call to fetch more data
    setTimeout(() => {
      setVideoList((prev) => [
        ...prev,
        ...videos.slice(prev.length, prev.length + 7),
      ]);
    }, 500);
  };

  useEffect(() => {
    getSingleVideo();
    setVideoList(videos.slice(0, 7)); // Initialize with the first 7 videos
  }, [videoId]);

  return (
    <div className="flex ml-4 w-[100%] mt-2">
      <div className="flex w-[100%]">
        <div className="w-[70%]">
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold mt-2 text-lg">
            {singleVideo?.snippet?.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-[35%]">
              <div className="flex">
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
                <h1 className="font-bold ml-2">
                  {singleVideo?.snippet?.channelTitle}
                </h1>
              </div>
              <button className="px-4 py-1 font-medium bg-black text-white rounded-full">
                Subscribe
              </button>
            </div>
            <div className="flex items-center w-[40%] justify-between mt-2">
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <AiOutlineLike size="20px" className="mr-5" />
                <AiOutlineDislike size="20px" />
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <PiShareFatLight size="20px" className="mr-2" />
                <span>Share</span>
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <GoDownload />
                <span>Download</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] border border-gray-300 ml-8 rounded-lg h-fit p-4">
          <InfiniteScroll
            dataLength={videoList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: "center" }}>No more videos</p>}
          >
            <div className="grid grid-cols-1 gap-3">
              {videoList.map((item) => (
                <Link
                  to={`/watch?v=${item.url.split("=").pop()}`}
                  key={item.id}
                >
                  <VideoCart item={item} />
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Watch;
