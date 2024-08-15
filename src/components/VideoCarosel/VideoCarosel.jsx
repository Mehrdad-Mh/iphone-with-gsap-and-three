import { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../../constants";
import { pauseImg, playImg, replayImg } from "../../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VideoCarosel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastvideo, isPlaying } = video;

  useGSAP(() => {

    gsap.to('#slider' , {
      transform : `translate(${-100 * videoId}%)`,
      duration: 2, 
      ease:'power2.inOut '
    })


    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  const [lodedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (lodedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, lodedData, isPlaying]);

  const handleLoadedMetaData = (element, i) =>
    setLoadedData((prevVideo) => [...prevVideo, element]);

  useEffect(() => {
    let currentprogress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate of the progress of video

      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if(progress != currentprogress){
            currentprogress= progress;

            gsap.to(videoDivRef.current[videoId],{
              width : window.innerWidth < 760 ?
              '10vw' : window.innerWidth < 1200 ?
              '10vw' : "4vw"
              
            } )
             
            gsap.to(span[videoId],{
              width:`${currentprogress}%`,
              backgroundColor : 'white'
            })
          }


        },

        onComplete: () => {
         if(isPlaying){
          gsap.to(videoDivRef.current[videoId] , {
            width:'12px',
     
          })
          gsap.to(span[videoId], {
            backgroundColor : '#afafaf'
          })
         }
        },
      });


      if(videoId === 0 ){
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / 
          hightlightsSlides[videoId].videoDuration
        )
      }

      if(isPlaying){
        gsap.ticker.add(animUpdate)
      }else{
        gsap.ticker.remove(animUpdate)
      }


    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;

      case "video-last":
        setVideo((prevVideo) => ({ ...prevVideo, isLastvideo: true }));
        break;

      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastvideo: false,
          videoId: 0,
        }));
        break;

      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

        case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="items-center flex">
        {hightlightsSlides.map((list, i) => (
          <div key={i} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                className={`${
                  list.id === 2 && 'translate-x-44'
                } pointer-events-none`}
                onEnded={() => (
                  i !== 3 
                  ? handleProcess('video-end' , i)
                  :handleProcess('video-last')
        )}
                onLoadedMetadata={(e) => handleLoadedMetaData(e,i)}

                  ref={(element) => (videoRef.current[i] = element)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute , top-12 left-[5%] , z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7">
          {videoRef.current.map((_, i) => (
            <span
              ref={(element) => (videoDivRef.current[i] = element)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full
  relative cursor-pointer"
              key={i}
            >
              <span
                ref={(element) => (videoSpanRef.current[i] = element)}
                className="absolute w-full h-full rounded-full"
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            onClick={
              isLastvideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
            alt={isLastvideo ? "replay" : !isPlaying ? "play" : "pause"}
            src={isPlaying ? replayImg : !isPlaying ? playImg : pauseImg}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarosel;
