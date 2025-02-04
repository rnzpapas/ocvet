import React, { useState } from 'react';

// Helper functions for date management
const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
};

const generateCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const calendar = [];

    let currentDay = 1;
    for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            if (week === 0 && day < firstDay) {
                weekDays.push(null); 
            } else if (currentDay <= daysInMonth) {
                weekDays.push(currentDay);
                currentDay++;
            } else {
                weekDays.push(null);
            }
        }
        calendar.push(weekDays);
    }
    return calendar;
};

const Calendar = ({onSelectDate}) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // Month is 0-based, so +1
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const calendar = generateCalendar(currentYear, currentMonth);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const selectDate = (evt) => {
        onSelectDate(currentYear, currentMonth, evt.target.textContent)
    }

    return (
        <div className="max-w-sm mx-auto bg-raisin-black shadow-lg rounded-lg p-6">
            {/* calendar controls */}
            <div className="flex justify-center items-center mb-4">
                {/* <button
                    onClick={handlePrevMonth}
                    className="text-lg font-bold text-white-smoke hover:scale-125"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='fill-white-smoke h-5'>
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                   </svg>
                </button> */}
                <span className="text-xl font-semibold text-white-smoke font-lato">
                    {monthNames[currentMonth - 1]} {currentYear}
                </span>
                {/* <button
                    onClick={handleNextMonth}
                    className="text-lg font-bold text-white-smoke hover:scale-125"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='fill-white-smoke h-5'>
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                  </svg>
                </button> */}
            </div>
            {/* day mapping */}
            <div className="grid grid-cols-7 gap-2 text-center text-white-smoke mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={index} className="py-2 font-lato font-medium">{day}</div>
                ))}
            </div>
            {/* date, week mapping */}
            {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2">
                    {week.map((day, dayIndex) => (
                        <div key={dayIndex} className={`font-lato w-12 h-12 flex items-center justify-center cursor-pointer ${day ? 'text-white-smoke hover:bg-chefchaouen-blue hover:text-white-smoke rounded-full' : 'text-transparent'}`} onClick={(evt) => selectDate(evt)}>
                            {day || ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Calendar;
