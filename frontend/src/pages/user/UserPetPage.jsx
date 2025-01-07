import { useState } from "react"
import InputField from "../../components/InputField";
import UserNav from "../../components/navbars/UserNav";
import Footer from "../../components/Footer";
import Button from "../../components/button";
import PetCard from "../../components/PetCard";

function UserPetPage() {
    const [search, setSearch] = useState("");

    const onChangeSearch = (evt) => {setSearch(evt.val)}

    return (
        <>
            <UserNav />
            <section className="flex px-5 py-5 h-dvh">
                <section className="w-[20%] flex flex-col gap-8">
                    <section>
                        <h5 className="font-instrument-sans font-semibold uppercase text-content-sm mb-2.5">Recently Vaccinated Pets</h5>
                        <section className="flex gap-2">
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                        </section>
                    </section>
                    <section>
                        <h5 className="font-instrument-sans font-semibold uppercase text-content-sm mb-2.5">Recently Dewormed Pets</h5>
                        <section className="flex gap-2">
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                        </section>
                    </section>
                </section>
                <section className="w-[80%]">
                    <section className="flex gap-10">
                        <section className="w-[400px]">
                            <section className="relative">
                                <InputField type={"text"} placeholder={"Type, breed, name, etc..."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </svg>
                            </section>
                        </section>
                        <Button txtContent={"Search"} isActive={true} />
                        <Button txtContent={"Register Pet"} style={"ml-20"}/>
                    </section>
                    <section className="mt-5">
                        <PetCard petName={"Marian"} img={"doggy.png"} />
                    </section>

                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetPage