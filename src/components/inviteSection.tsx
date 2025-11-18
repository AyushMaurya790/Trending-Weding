import SvgIcon from "./SvgIcon";

const InviteSection = () => {
  return (
    <section className="w-full relative text-[#7A5192]">
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
        font-Jacques-plain text-[26px] leading-[150%] absolute top-10 left-1/2 -translate-x-1/2 text-center text-[#BD8C1C]"
      >
        ॐ श्री गणेशाय नम
      </p>
      <SvgIcon
        name="LordGanesh"
        className="w-41 h-53 absolute top-20 left-1/2 -translate-x-1/2"
      />
      <p
        className="
        font-Jacques-plain  text-[42px] leading-[150%] absolute top-3/18 left-1/2 -translate-x-1/2 text-center "
      >
        With the heavenly blessings of <br />
        Smt. Lata Devi & Sm. Kamal Kapoor <br /> and <br />
        Mrs. Reena & Mr. Rajiv Kapoor
      </p>
      <p
        className="
        font-Jacques-plain text-8xl leading-[150%] absolute top-6/20 left-1/2 -translate-x-1/2 text-center text-[#BD8C1C]"
      >
        WE <br /> INVITE
      </p>
      <div
        className="
        font-Jacques-plain text-[42px] leading-[150%] absolute top-8/18 left-1/2 -translate-x-1/2 text-center "
      >
        You to join us in the wedding celebrations of <br />
        <p className="mt-8">
          Daughter of <br />
        Mrs. Reena & Mr. Rajiv Kapoor  
        </p>
        
      </div>
      <p
        className="font-Parisienne text-[42px] leading-[150%] text-center absolute top-11/18 left-2/8 -translate-x-1/2"
      >
        Abhishek <br /> & <br /> Anjali
      </p>
      <p
        className="font-Jacques-plain text-[42px] leading-[150%] text-center absolute top-11/18 left-6/8 -translate-x-1/2"
      >
       Saturday, 21 June 2035 <br /> 123 Anywhere St., City, <br /> ST 12345
      </p>

      <img
        src="/assets/boundaryImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 h-auto w-full z-20"
      />
      <img
        src="/assets/coupleImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 md:h-240 h-auto"
      />
    </section>
  );
};
export default InviteSection;
