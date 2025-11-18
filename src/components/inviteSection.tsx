import SvgIcon from "./SvgIcon";

const InviteSection = () => {
  return (
    <section className="w-full relative ">
      <img
        src="/assets/inviteSectionBg.png"
        alt="wedding-photo"
        className="object-cover h-556"
      />
      <img
        src="/assets/HeaderImg.png"
        alt="wedding-photo"
        className="object-cover absolute -top-10 mx-auto w-full"
      />
      <p
        className="
        font-Jacques text-[26px] leading-[150%] font-normal absolute top-10 left-1/2 -translate-x-1/2 text-center text-[#BD8C1C]"
        >
        ॐ श्री गणेशाय नम
      </p>
      <SvgIcon name="LordGanesh" className="w-41 h-53 absolute top-20 left-1/2 -translate-x-1/2" />
      <img
        src="/assets/boundaryImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 h-auto w-full z-20"
      />
      <img
        src="/assets/coupleImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 "
      />
    </section>
  );
};
export default InviteSection;
