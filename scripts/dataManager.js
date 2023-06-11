async function getGeoLocation(latitude, longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`

    let response = await fetch(url)
    return await response.json()
}

function getMaxVel(positions){
    let maxVel = 0
    positions.forEach( (pos) => {
        if (pos.speed != null && pos.speed > maxVel){
            maxVel = pos.speed
        }
    })
    return (maxVel * 3.6).toFixed(1);
}
function getDistance(positions){
    const earthRadiusKm = 6371
    let totalDistance = 0
    for(let i = 0; i < positions.length - 1; i++){
        const p1 = {
            latitude: positions[i].latitude, 
            longitude: positions[i].longitude
        }
        const p2 = {
            latitude: positions[i + 1].latitude, 
            longitude: positions[i + 1].longitude
        }
        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongitude = toRad(p2.longitude - p1.longitude) 

        const a = Math.sin(deltaLatitude / 2) * 
                Math.sin(deltaLatitude / 2) * 
                Math.cos(toRad(p1.latitude)) * 
                Math.cos(toRad(p2.latitude));

        const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
        const distance = earthRadiusKm * c
        totalDistance += distance
    }
    return totalDistance.toFixed(2);
    
}
function getDuration(ride){
    function format(number, digits){
        return String(number).padStart(digits, '0');
    }

    let duration = (ride.stopTime - ride.startTime) / 1000
    let hours = Math.trunc(duration / 60 / 60).toFixed(0)
    let minutes = Math.trunc(duration / 60).toFixed(0)
    let seconds = (duration % 60).toFixed(0)

    return `${format(hours, 2)}:${format(minutes, 2)}:${format(seconds, 2)}`
}
function getStartDate(ride){
    const date = new Date(ride.startTime);

    const hour = date.toLocaleString("en-US", {hour: "2-digit", hour12: false})
    const minutes = date.toLocaleString("en-US", {minute: "2-digit"})
    const day = date.toLocaleString("en-US", {day: "numeric"})
    const month = date.toLocaleString("en-US", {month: "long"})
    const year = date.toLocaleString("en-US", {year: "numeric"})

    return `${hour}:${minutes}, ${month} ${day}, ${year}`
}
function toRad(degree){
    return degree * Math.PI / 180
}
