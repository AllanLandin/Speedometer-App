function getRideRecord(rideID){
    return JSON.parse(localStorage.getItem(rideID));
}
function setRideRecord(rideID, rideRecord){
    return localStorage.setItem(rideID, JSON.stringify(rideRecord))
}

function createNewRide(){
    let rideID = Date.now();
    let rideRecord = {
        data: [],
        startTime: Date.now(),
        stopTime: null
    }
    setRideRecord(rideID, rideRecord)
    return rideID;
}

function addPosition(rideID, position){
    let rideRecord = getRideRecord(rideID);
    let newData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        speed: position.coords.speed,
        heading: position.coords.heading,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        timestamp: position.timestamp
    } 
    rideRecord.data.push(newData);
    setRideRecord(rideID, rideRecord);
}

function updateStopTime(rideID){
    let rideRecord = getRideRecord(rideID);
    rideRecord.stopTime = Date.now();
    setRideRecord(rideID, rideRecord);
}

function  getAllRides(){
    return Object.entries(localStorage)
}
function deleteRide(rideID){
    localStorage.removeItem(rideID)
}