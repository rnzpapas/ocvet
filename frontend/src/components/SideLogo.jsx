import OcvetLogo from "../assets/logo_img.png"

function SideLogo({style}) {
  return (
    <section className={style}>
      <img 
        src={OcvetLogo} alt="ocvetlogo" 
        className="md:w-[100px] md:h-[100px] xl:w-[120px] xl:h-[120px] xxl:w-[150px] xxl:h-[150px]"
      />
      {/* logo title */}
      <section className="flex flex-col items-center">
        <p className="uppercase md:text-content-sm xl:text-content-md font-lato">city government of tanuan</p>
        <div className="w-[300px] h-[2.5px] bg-raisin-black rounded-[5px]"></div>
        <h5 className="uppercase font-extrabold md:text-content-sm xl:text-content-md font-lato">office of the city veterinarian</h5>
      </section>
    </section>
  )
}

export default SideLogo