import React from 'react';

function EmailChip({email, onRemove}) {
    const images = import.meta.glob('../assets/icons/*.png', { eager: true });
    const getIcon = (name) => images[`../assets/icons/${name}.png`]?.default;

  return (
    <div className='flex items-center justify-center px-2 py-2 bg-raisin-black rounded-full min-w-fit'>
        <section className='flex items-center gap-2 w-fit'>
            <img src={getIcon(email[0].toUpperCase())} alt="Icon" className='w-[30px] h-[30px]'/>
            <h5 className='font-lato text-white-smoke text-content-sm font-semibold'>{email}</h5>
        </section>
        <section className='flex items-center ml-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
            className='w-[25px] fill-silver hover:fill-white-smoke cursor-pointer'
            onClick={onRemove}>
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
            </svg>
        </section>
    </div>
  )
}

export default EmailChip