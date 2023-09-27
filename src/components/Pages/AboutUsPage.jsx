// Initialization for ES Users
import { Carousel, initTE } from "tw-elements";

initTE({ Carousel });

import image1 from "../../assets/Luxury.png";
import image2 from "../../assets/Luxury2.png";
import image3 from "../../assets/Luxury3.png";
import image4 from "../../assets/Luxury4.png";
import image5 from "../../assets/Luxury5.png";

export default function AboutUsPage() {
  return (
    <div
      id="carouselExampleSlidesOnly"
      class="relative"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        <div
          class="relative float-left -mr-[100%] hidden w-52 transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
          data-te-carousel-active
        >
          <img src={image1} class="" alt="Wild Landscape" />
        </div>

        <div
          class="relative float-left -mr-[100%] hidden w-[350px] transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
        >
          <img src={image2} class="" alt="Camera" />
        </div>
        <div
          class="relative float-left -mr-[100%] hidden w-[350px] transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
        >
          <img src={image3} class="" alt="Camera" />
        </div>
        <div
          class="relative float-left -mr-[100%] hidden w-[350px] transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
        >
          <img src={image4} class="" alt="Camera" />
        </div>
        <div
          class="relative float-left -mr-[100%] hidden w-[350px] transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
        >
          <img src={image5} class="" alt="Camera" />
        </div>
      </div>
    </div>
  );
}
<script
  type="text/javascript"
  src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
></script>;
