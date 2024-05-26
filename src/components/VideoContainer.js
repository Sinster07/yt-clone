import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";
import { videos } from "../videos";

const VideoContainer = () => {
  const { video } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [currentVideos, setCurrentVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Start with page 0
  const videosPerPage = 10;

  useEffect(() => {
    dispatch(setHomeVideo(videos)); // Set the videos in the Redux store
    loadMoreVideos(); // Load initial set of videos
  }, [dispatch]);

  const loadMoreVideos = () => {
    setTimeout(() => {
      const startIndex = page * videosPerPage;
      const endIndex = startIndex + videosPerPage;
      const newVideos = videos.slice(startIndex, endIndex);

      if (newVideos.length > 0) {
        setCurrentVideos((prevVideos) => [...prevVideos, ...newVideos]);
        setPage(page + 1); // Increment the page
      }

      if (endIndex >= videos.length) {
        setHasMore(false); // No more videos to load
      }
    }, 1000); // 1-second delay
  };

  return (
    <InfiniteScroll
      dataLength={currentVideos.length}
      next={loadMoreVideos}
      hasMore={hasMore}
      loader={<h4>Loading....</h4>} // Use ShimmerLoader for the loader
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {currentVideos.map((item) => (
          <Link to={`/watch?v=${item.url.split("=").pop()}`} key={item.id}>
            <VideoCart item={item} />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default VideoContainer;
