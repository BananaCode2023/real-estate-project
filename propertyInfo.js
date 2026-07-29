// START - FETCHING OF MOCK PROPERTY DATA
let loadProperties = async () => {
    try {
        let response = await fetch('./data/properties.json');
        let propertyData = await response.json();

        propertiesData =  propertyData
        showProperties(0,3)
    }
    catch(error){
        console.error('Failed to load properties', error);
    }
}

loadProperties();

// END - FETCHING OF MOCK PROPERTY DATA


let start = 0;
const cardsPerPage = 3;


const leftSlider = document.getElementById('leftSliderArrow');
const rightSlider = document.getElementById('rightSliderArrow');


let showProperties = () => {
    let cardsContainer = document.getElementById('cardsContainer')

    // Clear old cards
    cardsContainer.innerHTML = "";

    propertiesData
        .slice(start, start + cardsPerPage)
        .forEach((propertyData) => {

        // property card (container)
        let propertyCard = document.createElement('a')
        propertyCard.className = 'featured-property__card'
        propertyCard.id = 'propertyCard'
        propertyCard.href = `propertyInfoPage.html?property=${(propertyData.addressName).replace(/ /g,"-")}`;

        // property image (has background image)
        let propertyImage = document.createElement('div')
        propertyImage.className = "featured-property__image-container";
        propertyImage.style.backgroundImage =
            `url('${propertyData.images[0]}')`;
        propertyImage.style.backgroundSize = "cover";
        propertyImage.style.backgroundPosition = "center";

        // property status
        let propertyStatus = document.createElement('div')
        propertyStatus.id = 'propertyStatus'
        propertyStatus.className = 'featured-property__status'
        propertyStatus.textContent = propertyData.status

        // contain status in image element
        propertyImage.appendChild(propertyStatus)

        // property info (container)
        let propertyInfoContainer = document.createElement('div')
        propertyInfoContainer.className = 'featured-property__info-container'

        // property price
        let propertyPrice = document.createElement('h4')
        propertyPrice.id = 'propertyPrice'
        propertyPrice.textContent = `$${Number(propertyData.price).toLocaleString()}`
        
        //property address name
        let propertyAddressName = document.createElement('h5')
        propertyAddressName.id = 'propertyAddressName'
        propertyAddressName.textContent = propertyData.addressName

        // property address city
        let propertyAddressCity = document.createElement('p')
        propertyAddressCity.id = 'propertyAddressCity'
        propertyAddressCity.className = 'sub-title'
        propertyAddressCity.textContent = propertyData.addressCity

        // property features flex container
        let propertyFeaturesContainer = document.createElement('div')
        propertyFeaturesContainer.className = 'featured-property__info-features-container'

        // bedroom number
        let propertyBedrooms = document.createElement('div')
        propertyBedrooms.className = 'featured-property__info-feature'
        let bedroomsInfo = document.createElement('h5')
        bedroomsInfo.className = 'bedroomsInfo'
        bedroomsInfo.textContent = propertyData.beds
        let propertyBedroomsSubtitle = document.createElement('p')
        propertyBedroomsSubtitle.className = 'featured__subtitle'
        propertyBedroomsSubtitle.textContent = 'Bedrooms'
        propertyBedrooms.append(bedroomsInfo,propertyBedroomsSubtitle)

        // bathroom number
        let propertyBathrooms = document.createElement('div')
        propertyBathrooms.className = 'featured-property__info-feature'
        let bathroomsInfo = document.createElement('h5')
        bathroomsInfo.className = 'bathroomsInfo'
        bathroomsInfo.textContent = propertyData.baths
        let propertyBathroomsSubtitle = document.createElement('p')
        propertyBathroomsSubtitle.className = 'featured__subtitle'
        propertyBathroomsSubtitle.textContent = 'Bedrooms'
        propertyBathrooms.append(bathroomsInfo,propertyBathroomsSubtitle)

        // sqfeet number
        let propertySqfeet = document.createElement('div')
        propertySqfeet.className = 'featured-property__info-feature'
        let sqfeetInfo = document.createElement('h5')
        sqfeetInfo.className = 'sqfeetInfo'
        sqfeetInfo.textContent = propertyData.sqft
        let propertySqfeetSubtitle = document.createElement('p')
        propertySqfeetSubtitle.className = 'featured__subtitle'
        propertySqfeetSubtitle.textContent = 'Bedrooms'
        propertySqfeet.append(sqfeetInfo,propertySqfeetSubtitle);

        propertyFeaturesContainer.append(propertyBedrooms,propertyBathrooms,propertySqfeet)

        //contain address, bathroom, bathroom, sqfeet in property info container
        propertyInfoContainer.append(propertyPrice, propertyAddressName, propertyAddressCity, propertyFeaturesContainer)

        //contain image and property info in card element
        propertyCard.append(propertyImage, propertyInfoContainer)
        
        //contain all the infos in the card
        cardsContainer.appendChild(propertyCard);
    });
}
// END - Variables for each property data


// START - SLIDER JAVASCRIPT

if(start == 0) {
    leftSlider.classList.add('unactive')
}
else if(start == 9) {
    rightSlider.classList.add('unactive')
}

leftSlider.addEventListener('click', () => {    
    if (start > 0) {
        start--;
        showProperties();
    }
    if(start == 0) {
        leftSlider.classList.add('unactive')
    }
    else if(start < 9 && start <= 9) {
        rightSlider.classList.remove('unactive')
    }
})
rightSlider.addEventListener('click', () => {
    if (start + cardsPerPage < propertiesData.length) {
        start++;
        showProperties();
    }
    if(start == 9) {
        rightSlider.classList.add('unactive')
    }
    else if(start < 9 && start <= 1) {
        leftSlider.classList.remove('unactive')
    }
})

// END - SLIDER JAVASCRIPT

const urlParams = new URLSearchParams(window.location.search);

const getPropertyName = urlParams.get("property");

console.log(getPropertyName);


let showPropertyData = () =>{

    setTimeout(() => {
        
        
        

        let filteredProperty = propertiesData.filter(property => {
            return property.addressName === getPropertyName.replaceAll("-", " ")
        })

        document.title =  `About ${filteredProperty[0].addressName}`

    // backgroundImage
        document.getElementById('propertyImageSection').style.backgroundImage = `url(${filteredProperty[0].images[0]})`
        document.getElementById('propertyImageSection').style.backgroundSize = "cover";
        document.getElementById('propertyImageSection').style.backgroundPosition = "center";

    //image slider function
        let start = 0;
        if((filteredProperty[0].images).length > 1){
            console.log((filteredProperty[0].images).length)
        }

        if(start <= 0){
            document.getElementById('leftImageSlider').classList.add('inactive');
        }
        if((filteredProperty[0].images).length == 1){
            document.getElementById('leftImageSlider').classList.add('inactive');
            document.getElementById('rightImageSlider').classList.add('inactive');
        }
        
        document.getElementById('leftImageSlider').addEventListener('click', () => {
            start --
            let currentImage = filteredProperty[0].images[start]
            
            if(start < (filteredProperty[0].images).length){
                document.getElementById('propertyImageSection').style.backgroundImage = `url(${filteredProperty[0].images[start]})`
                
                document.getElementById('rightImageSlider').classList.remove('inactive');

                
            }
            
            if(start <= 0){
                document.getElementById('leftImageSlider').classList.add('inactive');

                document.getElementById('propertyImageSection').style.backgroundImage = `url(${filteredProperty[0].images[start]})`
            }
            else{
                document.getElementById('propertyImageSection').style.backgroundImage = `url(${filteredProperty[0].images[start]})`

                document.getElementById('propertyImage').src = filteredProperty[0].images[start]
            }
            
        })
        document.getElementById('rightImageSlider').addEventListener('click', () => {
            start ++
            let currentImage = filteredProperty[0].images[start]

            if(start > 0){
                document.getElementById('leftImageSlider').classList.remove('inactive');
            }

            if(start >= (filteredProperty[0].images).length){
                document.getElementById('rightImageSlider').classList.add('inactive');
            }
            else{
                document.getElementById('propertyImageSection').style.backgroundImage = `url(${filteredProperty[0].images[start]})`

                document.getElementById('propertyImage').src = filteredProperty[0].images[start]
            }
        })

    //image modal function  
        document.getElementById('propertyImageViewer').addEventListener('click', () => {
            document.getElementById('leftImageSlider').style.zIndex = '101'
            document.getElementById('rightImageSlider').style.zIndex = '101'
            propertyImagemodal.style.display = 'block'

            if(start >= (filteredProperty[0].images).length){
                
                document.getElementById('propertyImage').src = filteredProperty[0].images[start - 1]
            }
            else{
                document.getElementById('propertyImage').src = filteredProperty[0].images[start]
            }
            
            document.getElementById('closeButton').addEventListener('click', () => {
                propertyImagemodal.style.display = 'none'

                document.getElementById('leftImageSlider').style.zIndex = 'unset'
                document.getElementById('rightImageSlider').style.zIndex = 'unset'
            })
        })


    // property details
        //address name
        document.getElementById('propertyDetailsAddressName').textContent = filteredProperty[0].addressName
        //address city
        document.getElementById('propertyDetailsAddressCity').textContent = filteredProperty[0].addressCity
        //property status
        document.getElementById('propertyStatus').textContent = filteredProperty[0].status
        //property type
        document.getElementById('propertyType').textContent = filteredProperty[0].type
        //property price
        document.getElementById('propertyDetailsPrice').textContent = `$${Number(filteredProperty[0].price).toLocaleString()}`

//PROPERTY INFO
    //property highlights
        //bedrooms
        document.getElementById('propertyBedroomsInfo').textContent = filteredProperty[0].beds
        //bathrooms
        document.getElementById('propertyBathroomsInfo').textContent = filteredProperty[0].baths
        //sqfeet
        document.getElementById('propertySqfeetInfo').textContent = filteredProperty[0].sqft
        //year built
        document.getElementById('propertyYearBuiltInfo').textContent = filteredProperty[0].yearBuilt
        
    //listing agent
        //listing agent name
        document.getElementById('agentName').textContent = filteredProperty[0].agents[0]
        //listing agent license
        document.getElementById('agentLicense').textContent = `CA DRE# ${filteredProperty[0].agentLicenses[0]}`

    //property description
        document.getElementById('propertyDescription').textContent = filteredProperty[0].description
    
    //interior details
        //bedrooms & bathrooms
        document.getElementById('bedroomBathroomInteriorInfo').innerHTML =
        filteredProperty[0].bedroomsBathroomsInterior.replace(/\n/g, '<br>');
        //rooms
        document.getElementById('roomsInteriorInfo').innerHTML =
        filteredProperty[0].roomsInterior.replace(/\n/g, '<br>');
        //bathrooms
        document.getElementById('bedroomInteriorInfo').innerHTML =
        filteredProperty[0].bedroomInterior.replace(/\n/g, '<br>');
        //dining room
        document.getElementById('bathroomInteriorInfo').innerHTML =
        filteredProperty[0].bathroomInterior.replace(/\n/g, '<br>');
        //kitchen
        document.getElementById('diningRoomInteriorInfo').innerHTML =
        filteredProperty[0].diningRoomInterior.replace(/\n/g, '<br>');
        //heating
        document.getElementById('kitchenInteriorInfo').innerHTML =
        filteredProperty[0].kitchenInterior.replace(/\n/g, '<br>');
        //cooling
        document.getElementById('heatingInteriorInfo').innerHTML =
        filteredProperty[0].heatingInterior.replace(/\n/g, '<br>');
        //appliances
        document.getElementById('coolingInteriorInfo').innerHTML =
        filteredProperty[0].coolingInterior.replace(/\n/g, '<br>');
        //features
        document.getElementById('appliancesInteriorInfo').innerHTML =
        filteredProperty[0].appliancesInterior.replace(/\n/g, '<br>');
        //interior Area
        document.getElementById('featuresInteriorInfo').innerHTML =
        filteredProperty[0].featuresInterior.replace(/\n/g, '<br>');
        document.getElementById('interiorAreaInteriorInfo').innerHTML =
        filteredProperty[0].interiorAreaInterior.replace(/\n/g, '<br>');

    //additional details
        //parking
        document.getElementById('parkingAdditionalInfo').innerHTML =
        filteredProperty[0].parkingAdditional.replace(/\n/g, '<br>');
        //accessibility
        document.getElementById('accessibilityAdditionalInfo').innerHTML =
        filteredProperty[0].accessibilityAdditional.replace(/\n/g, '<br>');
        //features
        document.getElementById('featuresAdditionalInfo').innerHTML =
        filteredProperty[0].featuresAdditional.replace(/\n/g, '<br>');
        //lot
        document.getElementById('lotAdditionalInfo').innerHTML =
        filteredProperty[0].lotAdditional.replace(/\n/g, '<br>');
        //details
        document.getElementById('detailsAdditionalInfo').innerHTML =
        filteredProperty[0].detailsAdditional.replace(/\n/g, '<br>');

        
    }, 100)

}

showPropertyData()



