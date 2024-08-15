import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../../utils"
import VideoCarosel from "../VideoCarosel/VideoCarosel"




const Highlight = () => {

  useGSAP(() => {
    gsap.to("#title",{ opacity : 1 , y:0 });
    gsap.to(".link" , {opacity:1 , y : 0 , duration : 1 , stagger:"0.5"})
  },[])


  return (
    <section id="highlights" className="w-screen h-full overflow-hidden common-padding bg-zinc" >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-center justify-between md:flex">
          <h1 id="title" className="section-heading">
Get The HighLights
          </h1>
          <div className="flex flex-wrap items-end gap-5">
<p className="link">
watch the film
<img src={watchImg} alt="watch"  className="ml-2" />
</p>

<p className="link">
watch the event
<img src={rightImg} alt="right"  className="ml-2" />
</p>
          </div>
        </div>

    <VideoCarosel/>

      </div>
    </section>
  )
}

export default Highlight
