import OcvetLogo from "../../assets/logo_img.png";
import StaffVector from "../../assets/staffs.png";
import MngrVector from "../../assets/mngr.png";
import OwnerVector from "../../assets/owner.png";

function AdminLogin() {
  return (
    <section className={`bg-linen flex flex-col items-center justify-center gap-10 h-dvh`}>
        <section className="flex flex-col items-center justify-center gap-10">
          <img 
            src={OcvetLogo} alt="ocvetlogo" 
            className="md:w-[100px] md:h-[100px] xl:w-[120px] xl:h-[120px] xxl:w-[150px] xxl:h-[150px]"
          />
          {/* logo title */}
          <section className="flex flex-col items-center">
            <p className="uppercase md:text-content-sm xl:text-content-md font-lato text-raisin-black">city government of tanuan</p>
            <div className="w-[300px] h-[2.5px] bg-raisin-black rounded-[5px]"></div>
            <h5 className="uppercase font-extrabold md:text-content-sm xl:text-content-md font-lato text-raisin-black">office of the city veterinarian</h5>
          </section>
        </section>
        <section className="flex flex-col items-center justify-center gap-10">
          <h5 className="uppercase font-extrabold md:text-content-sm xl:text-content-md font-instrument-sans text-raisin-black">Administrators Portal</h5>
          <section className="flex gap-40">
            <section className="flex flex-col items-center gap-5 cursor-pointer group">
              <img src={StaffVector} alt="" className="w-[150px] h-[100px] md:w-[200px] md:h-[180px] group-hover:scale-125 transition-all ease-in-out duration-300"/>
              <p className="font-lato text-content-md text-raisin-black font-semibold group-hover:underline">Staffs</p>
            </section>
            <section className="flex flex-col items-center gap-5 cursor-pointer group">
              <img src={MngrVector} alt="" className="w-[70px] h-[100px] md:w-[120px] md:h-[180px] group-hover:scale-125 transition-all ease-in-out duration-300"/>
              <p className="font-lato text-content-md text-raisin-black font-semibold group-hover:underline">Manager</p>
            </section>
            <section className="flex flex-col items-center gap-5 cursor-pointer group">
              <img src={OwnerVector} alt="" className="w-[100px] h-[100px] md:w-[160px] md:h-[180px] group-hover:scale-125 transition-all ease-in-out duration-300"/>
              <p className="font-lato text-content-md text-raisin-black font-semibold group-hover:underline">Super Administrator</p>
            </section>
          </section>
        </section>
    </section>
  )
}

export default AdminLogin