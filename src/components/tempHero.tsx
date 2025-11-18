import SvgIcon from "./SvgIcon";

const tempHero = () => {
  return (
    <>
      <img
        src="/assets/couple.png"
        alt="wedding-photo"
        className="absolute z-50 w-full max-h-264 object-cover curved-edge"
      />
      <img
        src="/assets/img2.jpg"
        alt="wedding-photo"
        className=" object-cover"
      />
      <div className="relative z-10">
        <img
          src="/assets/img3.jpg"
          alt="wedding-photo"
          className=" object-cover"
        />
        <SvgIcon
          name="FlowerYellow"
          className="w-40 h-37 absolute top-0 left-24 z-10"
        />
        <SvgIcon
          name="BigLeave"
          className="w-90 h-120 absolute -top-40 -right-2 z-10"
        />
        <SvgIcon
          name="SmallLeave"
          className="w-28 h-32 absolute top-30 left-101 z-10"
        />
        <SvgIcon
          name="SmallLeave"
          className="w-28 h-32 absolute top-[45%] right-101 z-10"
        />
        <h1
          className="font-Jacques font-normal text-[216px] leading-[90%] tracking-[0px]  text-[#53602B]
               text-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          Abhishek <span className="opacity-55"> Weds</span> Kanika
        </h1>
        <SvgIcon
          name="CompleteLeave"
          className="w-107 h-113 absolute bottom-0 -left-10 z-10"
        />
        <SvgIcon
          name="CompleteLeave2"
          className="w-100 h-106 absolute bottom-0 right-0 z-10"
        />
        <SvgIcon
          name="RoseImg"
          className="w-179 h-293 absolute top-3/16 left-0 z-10"
        />
        <SvgIcon
          name="RoseImg1"
          className="w-132 h-213 absolute top-10/16 right-0 z-10"
        />
        <SvgIcon
          name="Desginer"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-350"
        />
      </div>
    </>
  );
};
export default tempHero;
