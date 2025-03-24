
function AlertBanner({ alerts }) {
    //If no alerts, return nothing
    if (!alerts || alerts.length === 0) return null;

    const alert = alerts[0];
    const title = alert.event || alert.title || 'Weather Alert';
    const description = alert.description || alert.tip || '';
    

    return (
        <div className="alert-banner">
            {alerts.map((alert, index) => (
                <div key={index} className="alert">
                ⚠️ {alert.event} - {alert.description} (Severity: {alert.severity})
                </div>
            ))}
        </div>
    );

}
export default AlertBanner;