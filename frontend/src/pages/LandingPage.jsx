import Logo from '../assets/logo_img.png';
import MedkitSVG from '../assets/medkit.svg';
import NurseSVG from '../assets/nurse.svg';
import BandAidSVG from '../assets/bandaid.svg';
import EmailSVG from '../assets/email.svg';
import CallSVG from '../assets/call.svg';
import NetSVG from '../assets/net.svg';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

function LandingPage() {
  const navigate = useNavigate();

  const redirectLoginPage = () => {
    navigate('/user/login')
  }

  const redirectRegisterPage = () => {
    navigate('/user/register')
  }

  return (
    <section className='overflow-hidden'>
      {/* Hero */}
      <nav className='absolute top-0 left-0 flex items-center justify-between w-full px-10 py-5 h-[100px] xl:px-24 xxl:px-32 xxxl:px-60'>
          <img src={Logo} alt="logo" className='w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]'/>
          <section className='flex gap-2'>
            <Button txtContent={"Sign In"} style={'h-fit py-2'} onClickFunc={redirectLoginPage}/>
            <Button txtContent={"Sign Up"} style={'h-fit'} isActive={false} onClickFunc={redirectRegisterPage}/>
          </section>
      </nav>
      <section className={`h-full w-full bg-[url('/assets/herobg.jpg')] bg-cover bg-center bg-no-repeat`}>
        <section className='px-10 xl:px-24 xxl:px-32 xxxl:px-60 h-[70vh] lg:h-[75vh] w-screen flex flex-col justify-end'>
          <h5 className='font-instrument-sans text-headline-xtrasm md:text-headline-md lg:text-headline-lrg xxxl:text-headline-xtralrg text-[#fff] font-bold'>
            Serving the <b className='text-lime-green font-instrument-sans'>health and well-being</b> <br></br> of our nation's animals
          </h5>
          <p className='font-lato text-content-xtrasm md:text-content-md lg:text-content-lrg xxxl:text-content-xtralrg text-white-smoke w-fit md:w-[500px] lg:w-[680px]'>Committed to enhancing the lives of animals and promoting a healthier future for our communities through reliable veterinary care and responsible practices.</p>
        </section>
        {/* <section className='absolute top-0 left-0 w-full h-[90vh] bg-raisin-black opacity-25 z-10'></section> */}
      </section>
      {/* Services */}
      <section className='flex flex-col items-center pt-10 pb-20'>
        <h5 className='font-instrument-sans font-bold text-headline-md md:text-headline-lrg xxl:text-headline-xtralrg mb-5 xl:mb-20 text-raisin-black'>Our Services</h5>
        <section className='grid gap-14 xl:grid-cols-3 md:gap-16 xl:gap-10'>
          <section className='shadow-[2px_5px_15px_rgba(0,0,0,0.25)] w-[250px] h-[300px] md:w-[350px] md:h-[350px] xl:w-[320px] xl:h-[450px] xxl:w-[420px] rounded-lg px-10 py-10 flex flex-col items-center justify-center'>
            <img src={MedkitSVG} alt="" className='w-[100px] md:w-[150px] lg:w-[100px] xl:w-[120px] xxl:w-[180px]'/>
            <h5 className='font-instrument-sans font-bold text-content-xtrasm md:text-content-sm xxl:text-content-md xxxl:text-content-lrg'>Veterinary Care & Treatment</h5>
            <p className='text-center font-lato text-content-xtrasm md:text-content-sm xxl:text-content-md'>We provide expert medical care and treatment to ensure the health and well-being of animals.</p>
          </section>
          <section className='shadow-[2px_5px_15px_rgba(0,0,0,0.25)] w-[250px] h-[300px] md:w-[350px] md:h-[350px] xl:w-[320px] xl:h-[450px] xxl:w-[420px]  rounded-lg px-10 py-10 flex flex-col items-center justify-center relative xl:bottom-10'>
            <img src={BandAidSVG} alt="" className='w-[100px] md:w-[150px] lg:w-[100px] xl:w-[120px] xxl:w-[180px]'/>
            <h5 className='font-instrument-sans font-bold text-content-xtrasm md:text-content-sm xxl:text-content-md xxxl:text-content-lrg'>Animal Welfare & Protection</h5>
            <p className='text-center font-lato text-content-xtrasm md:text-content-sm xxl:text-content-md'>We strive to ensure animal safety and well-being through advocacy, protection, and compassionate care.</p>
          </section>
          <section className='shadow-[2px_5px_15px_rgba(0,0,0,0.25)] w-[250px] h-[300px] md:w-[350px] md:h-[350px] xl:w-[320px] xl:h-[450px]  xxl:w-[420px] rounded-lg px-10 py-10 flex flex-col items-center justify-center'>
            <img src={NurseSVG} alt="" className='w-[100px] md:w-[150px] lg:w-[100px] xl:w-[120px] xxl:w-[180px]'/>
            <h5 className='font-instrument-sans font-bold text-content-xtrasm md:text-content-sm xxl:text-content-md xxxl:text-content-lrg'>Educational Programs & Outreach</h5>
            <p className='text-center font-lato text-content-xtrasm md:text-content-sm xxl:text-content-md'>We offer educational programs to raise awareness about animal health and responsible pet ownership.
            Let me know if you need any further adjustments!</p>
          </section>
        </section>
      </section>
      {/* Contact */}
      <section className='bg-raisin-black py-10 flex flex-col items-center justify-center'>
        <h5 className='font-instrument-sans font-bold text-headline-md md:text-headline-lrg xl:text-headline-xtralrg mb-5 xxl:mb-20 text-white-smoke'>Connect with Us</h5>
        <section className='grid xl:grid-cols-3 gap-10 xl:gap-4'>
          <section className='bg-white-smoke flex flex-col items-center justify-center rounded-2xl h-[300px] w-[300px] md:h-[400px] md:w-[350px] xl:w-[300px] xl:h-[350px] gap-5 md:gap-10 xl:gap-3'>
            <img src={EmailSVG} alt="" className='w-[70px] md:w-[90px]'/>
            <section className='flex flex-col items-center justify-center h-[40%] w-full'>
              <h5 className='font-instrument-sans font-bold text-headline-mbl md:text-headline-md xl:text-headline-sm xl:w-[80%] xxl:h-[75%]'>Have a Question? Email us at:</h5>
              <p className='font-lato text-content-md'>ocvet_tanauan@gmail.com</p>
            </section>
          </section>
          <section className='bg-white-smoke flex flex-col items-center justify-center rounded-2xl h-[300px] w-[300px] md:h-[400px] md:w-[350px] xl:w-[300px] xl:h-[350px] gap-5 md:gap-10 xl:gap-3'>
            <img src={CallSVG} alt="" className='w-[70px] md:w-[90px]'/>
            <section className='flex flex-col items-center justify-center h-[40%] w-full'>
              <h5 className='font-instrument-sans font-bold text-headline-mbl md:text-headline-md xl:text-headline-sm xxl:h-[75%]'>For inquiries, Call:</h5>
              <p className='font-lato text-content-md'>+43 7289 843</p>
            </section>
          </section>
          <section className='bg-white-smoke flex flex-col items-center justify-center rounded-2xl h-[300px] w-[300px] md:h-[400px] md:w-[350px] xl:w-[300px] xl:h-[350px] gap-5 md:gap-10 xl:gap-3'>
            <img src={NetSVG} alt="" className='w-[70px] md:w-[90px]'/>
            <section className='flex flex-col items-center justify-center h-[40%] w-full'>
              <h5 className='font-instrument-sans font-bold text-headline-mbl md:text-headline-md xl:text-headline-sm xxl:h-[75%]'>Visit our city website on:</h5>
              <a href="https://www.tanauancity.gov.ph" target='_blank' rel="noopener noreferrer" className='font-lato text-content-md'>www.tanauancity.gov.ph</a>
            </section>
          </section>
        </section>
      </section>
      {/* Where to find us */}
      <section className='py-10 flex flex-col items-center justify-center'>
        <h5 className='font-instrument-sans font-bold text-headline-md md:text-headline-lrg xl:text-headline-xtralrg mb-5 xl:mb-10 text-raisin-black'>Where to find Us</h5>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8395096098598!2d121.12320017509636!3d14.086649586341105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6f78866a4815%3A0xfb1182d323581bfa!2sNew%20Tanauan%20City%20Hall!5e0!3m2!1sen!2sph!4v1739272426484!5m2!1sen!2sph" 
        className='w-[300px] h-[300px] md:w-[600px] md:h-[450px] xxl:w-[750px] xxl:h-[500px]' allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
      {/* Footer */}
      <section className='bg-raisin-black flex items-center justify-center w-full py-5'>
        <h5 className='text-white-smoke font-lato text-[8px] md:text-content-md'>© 2025 Office of the City Veterinarian ̶  Tanauan City Government. All Rights Reserved.</h5>
      </section>
    </section>
  )
}

export default LandingPage