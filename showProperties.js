import {loadProperties} from "./propertyPageScript.js"
import {propertiesData} from "./propertyPageScript.js"

export let showProperties = () => {
    let cardsContainer = document.getElementById('cardsContainer')

    // Clear old cards
    cardsContainer.innerHTML = "";

    propertiesData.forEach((propertyData) => {

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

        // property type
        let propertyType = document.createElement('p')
        propertyType.id = 'propertyType'
        propertyType.className = 'property-type'
        propertyType.textContent = propertyData.type
        

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
        propertyBathroomsSubtitle.textContent = 'Bathrooms'
        propertyBathrooms.append(bathroomsInfo,propertyBathroomsSubtitle)

        // sqfeet number
        let propertySqfeet = document.createElement('div')
        propertySqfeet.className = 'featured-property__info-feature'
        let sqfeetInfo = document.createElement('h5')
        sqfeetInfo.className = 'sqfeetInfo'
        sqfeetInfo.textContent = propertyData.sqft
        let propertySqfeetSubtitle = document.createElement('p')
        propertySqfeetSubtitle.className = 'featured__subtitle'
        propertySqfeetSubtitle.textContent = 'Sq.Feet'
        propertySqfeet.append(sqfeetInfo,propertySqfeetSubtitle);

        // when is the property Built
        let propertyYearBuilt = document.createElement('div')
        propertyYearBuilt.className = 'featured-property__info-feature'
        let YearBuiltInfo = document.createElement('h5')
        YearBuiltInfo.className = 'yearBuiltInfo'
        YearBuiltInfo.textContent = propertyData.yearBuilt
        let propertyYearBuiltSubtitle = document.createElement('p')
        propertyYearBuiltSubtitle.className = 'featured__subtitle'
        propertyYearBuiltSubtitle.textContent = 'Year Built'
        propertyYearBuilt.append(YearBuiltInfo,propertyYearBuiltSubtitle)

        propertyFeaturesContainer.append(propertyBedrooms,propertyBathrooms,propertySqfeet, propertyYearBuilt)

        //contain address, bathroom, bathroom, sqfeet in property info container
        propertyInfoContainer.append(propertyPrice, propertyAddressName, propertyAddressCity, propertyType, propertyFeaturesContainer)

        //contain image and property info in card element
        propertyCard.append(propertyImage, propertyInfoContainer)
        
        //contain all the infos in the card
        cardsContainer.appendChild(propertyCard);
    });
}