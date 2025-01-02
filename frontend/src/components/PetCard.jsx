
function PetCard({petName, img, style}) {
  return (
    <section className="w-[120px] h-[120px] cursor-pointer">
        <section className="bg-fire-engine-red h-[80%] ">

        </section>
        <section className="bg-raisin-black h-[20%] flex items-center justify-center w-full">
            <p className="text-white-smoke font-lato font-semibold text-content-xtrasm"> {petName} </p>
        </section>
    </section>
  )
}

export default PetCard