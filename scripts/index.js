const rideList = document.querySelector("#rideList");
const introMessage = document.querySelector("#intro-message");


let allRides = getAllRides()

allRides.forEach(async ([id, value]) => {
    let ride = JSON.parse(value)
    ride.id = id
    
    if (!ride.data){
        return
    }
    const li = document.createElement("li")
    li.id = ride.id
    li.className = "d-flex container p-2 align-items-center gap-3 shadow-sm m-1"

    rideList.appendChild(li)
    li.addEventListener("click", () => {
        location.href = `./detail.html?id=${ride.id}`
    })

    const initialPosition = ride.data[0]
    let initialPositionData = await getGeoLocation(initialPosition.latitude, initialPosition.longitude);    
    
    const dataElement = document.createElement("div")
    dataElement.className = "d-flex flex-column"

    const mapElement = document.createElement("div")
    const mapID = `map${ride.id}`
    mapElement.id = mapID
    mapElement.style = "height: 100px;width: 100px"
    mapElement.className = "rounded"
 
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
    li.appendChild(mapElement)
    li.appendChild(dataElement)

    const map = L.map(mapID, {
        zoomControl: false,
        attributionControl: false
       })
       map.setView([initialPosition.latitude, initialPosition.longitude], 10)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        L.marker([initialPosition.latitude, initialPosition.longitude]).addTo(map)
        
        

})

if (rideList.hasChildNodes()){
    introMessage.classList.add("d-none")
}
else{
    introMessage.classList.remove('d-none')
    introMessage.classList.add('d-flex')

}

