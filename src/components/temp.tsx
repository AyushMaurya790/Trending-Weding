const Temp = () => {
  return (
    <div className="mx-auto w-full">
      <div className="relative w-full overflow-visible rounded-10px">
        <img
          src="/assets/1.avif"
          alt="wedding-photo"
          className="curved-edge relative z-100 w-full h-184 object-cover"
        />

        <img
          src="/assets/img.jpg"
          alt="wedding-photo"
          className="absolute top-80 w-full object-cover"
        />
      </div>
    </div>
  );
};
export default Temp;
