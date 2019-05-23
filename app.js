// After our page loads,do this arrow function
window.addEventListener('load', ()=>{
    let long, lat;
    let tempDescription = document.querySelector('.temperature-description');
    //let tempDegree = the fist occurance of class temperature-degree. Change the value with whatever we have in this JS app.
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSelection = document.querySelector('.temperature-section');
    const degreeSpan = document.querySelector('.temperature-section span');
    //If the
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api= `${proxy}https://api.darksky.net/forecast/8f5f8c216e72042abc1ee249745ed98c/${lat},${long}`;
            fetch(api, {mode:'cors'})
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    // Pulls out temp from data.currently
                    const {temperature, summary ,icon} = data.currently;
                    //Set DOM elements from the API
                    tempDegree.textContent = temperature; // Set tempDegree text
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let celsius = (100 - 32) * (5/9);
                    //Change temperature to celcius
                     tempSelection.addEventListener("click", () =>{
                        if(degreeSpan.textContent === "F"){
                            degreeSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            degreeSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                        }
                    });
                    // Set icons
                    setIcons(icon, document.querySelector(".icon"));
                })
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        //Looks for lines and replaces with underscore
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        //Animate the skycon
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }



});
