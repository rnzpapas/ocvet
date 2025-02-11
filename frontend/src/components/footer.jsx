import { Link } from "react-router"
import OcvetLogo from "../assets/logo_img.png"

function Footer() {
  return (
    <footer className="relative bg-raisin-black w-full lg:h-[250px] z-1 mt-10">
      {/* footer contents */}
      <section className="w-full h-[90%] flex flex-col gap-5 lg:flex-row items-center lg:justify-center xl:gap-20 text-wrap py-5">
        <img 
            className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] xxl:w-[125px] xxl:h-[125px]"
            src={OcvetLogo} alt="OCVET Logo"
        />
        {/* Office hours */}
        <section className="h-[100%] lg:pt-[20px] flex flex-col items-center">
          <h5 className="font-instrument-sans md:text-headline-sm xxl:text-headline-md text-white-smoke font-bold"> Office Hours </h5>
          <section>
            <p className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke">Monday to Friday</p>
            <p className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke">8:00 AM to 5:00 PM</p>
          </section>
        </section>
        {/* Location */}
        <section className="h-[100%] lg:pt-[20px] flex flex-col items-center">
          <h5 className="font-instrument-sans md:text-headline-sm xxl:text-headline-md text-white-smoke font-bold"> Location </h5>
          <p className="font-lato md:text-content-xtrasm xxl:text-content-md text-white-smoke w-[200px] lg:w-[160px]">2F New Tanauan City Hall, Laurel Hill, Natatas, Tanauan City 4232 Tanauan City</p>
        </section>
        {/* Site Links */}
        <section className="h-[100%] lg:pt-[20px] flex flex-col items-center">
            <h5 className="font-instrument-sans md:text-headline-sm xxl:text-headline-md text-white-smoke font-bold"> Site Links </h5>
            <section className="flex flex-col">
              <Link to={"/user/home"} className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke hover:underline hover:cursor-pointer">Home</Link>
              <Link to={"/user/pets"} className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke hover:underline hover:cursor-pointer">Pets</Link>
              <Link to={"/user/account/1"} className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke hover:underline hover:cursor-pointer">Accounts</Link>
            </section>
        </section>
        {/* Contact Us */}
        <section className="h-[100%] lg:pt-[20px] md:mb-0 flex flex-col items-center mb-10">
          <h5 className="font-instrument-sans md:text-headline-sm xxl:text-headline-md text-white-smoke font-bold"> Contact Us </h5>
          <section className="flex flex-col items-center lg:items-start xl:gap-3 xxl:gap-4">
            <section className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="md:w-[12px] md:h-[12px] w-[15px] h-[15px] fill-white-smoke">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
              </svg>
              <p className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke">+43 7289 843</p>
            </section>
            <section className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="md:w-[12px] md:h-[12px] w-[15px] h-[15px] fill-white-smoke">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              <p className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke">ocvet_tanauan@gmail.com</p>
            </section>
            <section className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="md:w-[12px] md:h-[12px] w-[15px] h-[15px] fill-white-smoke">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
              </svg>
              <a className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke" href="https://www.facebook.com/ocvettanauancity" target="_blank">https://www.facebook.com/ocvettanauancity</a>
            </section>
            <section className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="md:w-[12px] md:h-[12px] w-[15px] h-[15px] fill-white-smoke">
                <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
              </svg>
              <a className="font-lato md:text-content-sm xxl:text-content-md text-white-smoke" href="https://tanauancity.gov.ph" target="_blank">https://tanauancity.gov.ph/</a>
            </section>
          </section>
        </section>
      </section>
      {/* copyright */}
      <section className="w-full h-[10%] flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[10px] h-[10px] fill-white-smoke">
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM199.4 312.6c-31.2-31.2-31.2-81.9 0-113.1s81.9-31.2 113.1 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9c-50-50-131-50-181 0s-50 131 0 181s131 50 181 0c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0c-31.2 31.2-81.9 31.2-113.1 0z"/>
        </svg>
        <p className="text-content-xtrasm text-white-smoke">2025 Office of the City Veterinarian. All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer