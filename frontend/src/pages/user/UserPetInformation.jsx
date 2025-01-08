import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import UserNav from "../../components/navbars/UserNav";
import Table from "../../components/Table";
import { Link, useParams } from "react-router";

const HEADERS = [
  {
    "key": "No.",
    "isSortable": true,
    "isSorted": false
  },
  {
    "key": "Vaccine",
    "isSortable": true,
    "isSorted": false
  },
  {
    "key": "Date",
    "isSortable": true,
    "isSorted": false
  },
  {
    "key": "Time",
    "isSortable": true,
    "isSorted": false
  }
]
function UserPetInformation() {
    const {id} = useParams();
    const [vaxData, setVaxData] = useState([
      {
        "number" : "1",
        "client_name": "DHPP",
        "date_of_transaction": "12/02/2024",
        "time_of_transaction": "03:13 PM",
      },
    ]);

    return (
      <>
        <UserNav />
        <section className="h-dvh">
          <section className="py-4 lg:py-6 flex relative items-center justify-center">
            <section className="flex flex-col gap-2 items-center ">
              <section className="relative">
                  <img src="" alt="" className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-azure rounded-full" />
                  <section className="absolute bottom-1 right-1 bg-silver rounded-full h-[30px] w-[30px] md:h-[38px] md:w-[38px] flex items-center justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white-smoke h-[20px] w-[20px] md:h-[22px] md:w-[22px]">
                        <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                    </svg>
                  </section>
              </section>
              <h5 className="font-instrument-sans font-semibold text-headline-md"> Bart </h5>
            </section>
            <section className="absolute top-10 right-96">
              <section className="flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[15px] h-[15px] fill-azure">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
                <Link to={`/user/pets/edit/${id}`}>
                  <p className="font-lato text-content-md hover:underline text-azure">Edit Profile</p>
                </Link>
              </section>
              <section className="flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[15px] h-[15px] fill-fire-engine-red">
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
                <p className="font-lato text-content-md hover:underline text-fire-engine-red">Delete Pet</p>
              </section>
            </section>
          </section>
          <section className="w-6/12 flex flex-col gap-3 ml-5 mt-5">
            <h5 className="font-instrument-sans font-semibold text-headline-md">Clinic Records</h5>
            <Table headers={HEADERS} data={vaxData} />
          </section>
        </section>
        <Footer />
      </>
    )
}

export default UserPetInformation