import { useNavigate } from "react-router-dom";
import { ForecastDayCard } from "../ForecastDayCard/ForecastDayCard";

function ForecastList({ days }) {
    const navigate = useNavigate();

    const handleDayClick = (index) => {
        //Navigate to detail page for the clicked day
        navigate(`/forecast/${index}`);
    };

    return (
        <section className="forecast-list">
            <h3>5-Day Forecast</h3>
            <div className="forecast-cards">
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