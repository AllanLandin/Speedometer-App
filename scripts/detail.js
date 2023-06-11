const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")

const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async () => {
    const initialPosition = ride.data[0]
    let initialPositionData = await getGeoLocation(initialPosition.latitude, initialPosition.longitude);    
    
    const dataElement = document.createElement("div")
    dataElement.className = "d-flex flex-column"

    const mapElement = document.createElement("div")
    mapElement.style = "height: 100px;width: 100px"
    mapElement.className = "bg-dark rounded"
    
    let maxVel = getMaxVel(ride.data)
    let distance = getDistance(ride.data)
    let duration = getDuration(ride)
    let date = getStartDate(ride)
    
    const cityElement = document.createElement('div')
    cityElement.innerText = `Location: ${initialPositionData.city} - ${initialPositionData.countryCode}`
    cityElement.className = "text-primary fw-bold mb-2"

    const maxVelElement = document.createElement('div')
    maxVelElement.innerText = `Max speed ${maxVel} Km/h`
    maxVelElement.className = "h5"

    const distanceElement = document.createElement('div')
    distanceElement.innerText = `Distance:  ${distance} Km`
    
    const durationElement = document.createElement('div');
    durationElement.innerText = `Duration: ${duration}`

    const dateElement = document.createElement('div')
    dateElement.innerText = date
    dateElement.className = "text-secondary mt-1"

    dataElement.appendChild(cityElement)
    dataElement.appendChild(maxVelElement)
    dataElement.appendChild(distanceElement)
    dataElement.appendChild(durationElement)
    dataElement.appendChild(dateElement)

    document.querySelector('#data').appendChild(dataElement)

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        deleteRide(rideID)
        location.href = "./index.html"
    })

    const map = L.map("mapDetail")
    map.setView([initialPosition.latitude, initialPosition.longitude], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

    let coords = ride.data.map( data => {
        return [data.latitude, data.longitude]
    })
    const polyline = L.polyline(coords, {color: "#F00"}).addTo(map)

    map.fitBounds(polyline.getBounds())
})