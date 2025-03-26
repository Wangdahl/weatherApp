import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ForecastDayCard from "../ForecastDayCard/ForecastDayCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import './ForecastList.css'

function ForecastList({ days = [] }) {
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState(false);

    const handleDayClick = (index) => {
        // Navigate to detail page for the clicked day
        navigate(`/forecast/${index}`);
    };

    const toggleForecast = () => {
        setIsOpen(!isOpen);
    }

    return (
        <section className="forecast-list">
        <span id="forecast-head">
            <h3 id="five-day-heading">5-Day Forecast</h3>
            <button 
                className="roundBtn" 
                id="show5Day"
                onClick={toggleForecast}>
                    <FontAwesomeIcon 
                        id="rotate" 
                        className={`${isOpen ? 'open' : ''}`}
                        icon={faArrowDown}/>
            </button>
        </span>
        <div className={`forecast-cards hide ${isOpen ? 'open' : ''}`}>
            {days.map((day, idx) => (
                <ForecastDayCard
                    key={idx}
                    day={day}
                    index={idx}
                    onClick={() => handleDayClick(idx)}
                />
            ))}
        </div>
        </section>
    );
}

export default ForecastList;
