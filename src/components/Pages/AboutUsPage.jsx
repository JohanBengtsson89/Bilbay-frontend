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
    <div className="grid grid-cols-2 items-center pt-[150px] lg:grid-cols-1 lg:pt-5">
      <div
        id="carouselExampleSlidesOnly"
        class="relative  mx-auto"
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
      <form className="lg:px-10">
        <div>
          <div className="items-center justify-center bg-[#BFC3CC] px-6 py-4 rounded-xl lg:mt-2 ">
            <h1 className="text-center font-semibold font-serif text-2xl ">
              About Bilbay
            </h1>
            <div className="tracking-wider font-serif mt-4">
              <h2>
                We invite you to become a part of the Bilbay community – a
                community of car enthusiasts, collectors, and individuals who
                appreciate the artistry and craftsmanship of fine automobiles.
                Whether you're buying or selling, our platform connects you with
                like-minded individuals who share your passion for exceptional
                cars. Thank you for considering Bilbay as your trusted source
                for the best cars on the auction website. We look forward to
                helping you find your dream car or assisting you in selling your
                prized vehicle to a discerning buyer. Discover excellence in
                every drive with Bilbay
              </h2>
            </div>
          </div>
        </div>
      </form>
      s
    </div>
  );
}
<script
  type="text/javascript"
  src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
></script>;
