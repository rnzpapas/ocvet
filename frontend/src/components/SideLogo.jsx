import OcvetLogo from "../assets/logo_img.png"

function SideLogo({style}) {
  return (
    <section className={`lg:bg-linen flex flex-col items-center lg:justify-center gap-5 lg:gap-10 py-10 ${style}`}>
      <img 
        src={OcvetLogo} alt="ocvetlogo" 
        className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] xl:w-[120px] xl:h-[120px] xxl:w-[150px] xxl:h-[150px]"
      />
      {/* logo title */}
      <section className="flex flex-col items-center">
        <p className="uppercase text-content-sm md:text-content-sm xl:text-content-md font-lato">city government of tanauan</p>
        <div className="w-[300px] h-[2.5px] bg-raisin-black rounded-[5px]"></div>
        <h5 className="uppercase font-extrabold text-content-sm md:text-content-sm xl:text-content-md font-lato">office of the city veterinarian</h5>
      </section>
    </section>
  )
}

export default SideLogo