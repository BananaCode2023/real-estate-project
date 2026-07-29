

// START - FETCHING OF MOCK PROPERTY DATA
export let loadProperties = async () => {
    try {
        let response = await fetch('./data/properties.json');
        let property = await response.json();

        propertiesData =  property
        showProperties()
    }
    catch(error){
        console.error('Failed to load properties', error);
    }
}

loadProperties();

// END - FETCHING OF MOCK PROPERTY DATA


// START - Variables for each property data
export let propertiesData = '';

// import { showProperties } from "./showProperties.js";

const priceRange = document.getElementById("priceRange");
const propertyType = document.getElementById("propertyType");
const bedrooms = document.getElementById("bedrooms");
const status = document.getElementById("status");
const sortBy = document.getElementById("sortBy");
let applyFilters = document.getElementById('applyFilters');

let selectedFilters = {
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    status: '',
    sortBy: ''
};

let selectedPriceRange = '';
let selectedPropertyType = '';
let selectedBedrooms = '';
let selectedStatus = '';
let selectedSortBy = '';
// END - Variables for each property data


// START - FILTER FUNCTION TO ACTIVATE OR UNACTIVATE THE APPLY FILTERS BUTTON WHENEVER A FILTER IS CHOSEN OR NOT

// Function for activating the apply filter button
let activateApplyButton = () => {
    if(selectedPriceRange == '' && selectedPropertyType == '' && selectedBedrooms == '' && selectedStatus == '' && selectedSortBy == ''){
        applyFilters.classList.remove("active");
    }
    else{
        applyFilters.classList.add("active");
    }
}

// Event Listener for showing all the listings
let allListings = document.getElementById('allListings')

allListings.style.backgroundColor = '#7D3B92';
allListings.style.color = '#fff';

import { showProperties } from "./showProperties.js";

allListings.addEventListener('click', () => {
    cardsContainer.innerHTML = "";
    location.reload();

    allListings.style.backgroundColor = '#7D3B92';
    allListings.style.color = '#fff';
    showProperties();
})


// Event Listener for the price range filter
priceRange.addEventListener("change", function () {
    
    if (priceRange.value === "") {
        priceRange.options[priceRange.selectedIndex].text = "Price Range ⮟";
        priceRange.style.backgroundColor = '#fff';
        priceRange.style.color = '#231f20';

        selectedPriceRange = priceRange.value
        selectedFilters.priceRange = priceRange.value;
    }
    else{
        priceRange.style.backgroundColor = '#7D3B92';
        priceRange.style.color = '#fff';

        selectedPriceRange = priceRange.value
        selectedFilters.priceRange = priceRange.value;
    }
    
    activateApplyButton();
});

// Event Listener for the property type filter
propertyType.addEventListener("change", function () {
    
    if (propertyType.value === "") {
        propertyType.options[propertyType.selectedIndex].text = "Property Type ⮟";
        propertyType.style.backgroundColor = '#fff';
        propertyType.style.color = '#231f20';

        selectedPropertyType = propertyType.value
        selectedFilters.propertyType = propertyType.value;
    }
    else{
        propertyType.style.backgroundColor = '#7D3B92';
        propertyType.style.color = '#fff';

        selectedPropertyType = propertyType.value
        selectedFilters.propertyType = propertyType.value;
    }

    activateApplyButton();
});

// Event Listener for the bedrooms filter
bedrooms.addEventListener("change", function () {
    
    if (bedrooms.value === "") {
        bedrooms.options[bedrooms.selectedIndex].text = "Bedrooms ⮟";
        bedrooms.style.backgroundColor = '#fff';
        bedrooms.style.color = '#231f20';

        selectedBedrooms = bedrooms.value
        selectedFilters.bedrooms = bedrooms.value;
    }
    else{
        bedrooms.style.backgroundColor = '#7D3B92';
        bedrooms.style.color = '#fff';

        selectedBedrooms = bedrooms.value
        selectedFilters.bedrooms = bedrooms.value;
    }

    activateApplyButton();
});

// Event Listener for the status filter
status.addEventListener("change", function () {
    
    if (status.value === "") {
        status.options[status.selectedIndex].text = "Status ⮟";
        status.style.backgroundColor = '#fff';
        status.style.color = '#231f20';

        selectedStatus = status.value
        selectedFilters.status = status.value;
    }
    else{
        status.style.backgroundColor = '#7D3B92';
        status.style.color = '#fff';

        selectedStatus = status.value
        selectedFilters.status = status.value;
    }

    activateApplyButton();
});

// Event Listener for the sort by filter
sortBy.addEventListener("change", function () {
    
    if (sortBy.value === "") {
        sortBy.options[sortBy.selectedIndex].text = "Sort By ⮟";
        sortBy.style.backgroundColor = '#fff';
        sortBy.style.color = '#231f20';

        selectedSortBy = sortBy.value
        selectedFilters.sortBy = sortBy.value;
    }
    else{
        sortBy.style.backgroundColor = '#7D3B92';
        sortBy.style.color = '#fff';

        selectedSortBy = sortBy.value
        selectedFilters.sortBy = sortBy.value;
    }

    activateApplyButton();
});

// END  - FILTER FUNCTION TO ACTIVATE OR UNACTIVATE THE APPLY FILTERS BUTTON WHENEVER A FILTER IS CHOSEN OR NOT

// START - APPLY FILTER BUTTON FUNCTION
applyFilters.addEventListener('click', () => {
    applyFilters.classList.remove('active'); 
    

    allListings.style.backgroundColor = '#fff';
    allListings.style.color = '#231f20';

    console.log(selectedFilters)
    
    filterProperties();
});


// END - APPLY FILTER BUTTON FUNCTION

// START - Filter Function
let filterProperties = () => {
    let filtered = propertiesData.filter(property => {
        
        //filtering based on price
        let priceRangeMatch = true;

        if(selectedFilters.priceRange == '1000000'){
            priceRangeMatch = property.price >= 1000000
        }
        else if(selectedFilters.priceRange == '750000'){
            priceRangeMatch = property.price >= 750000 && property.price <= 1000000
        }
        else if(selectedFilters.priceRange == '500000'){
            priceRangeMatch = property.price >= 500000 && property.price <= 750000
        }
        else if(selectedFilters.priceRange == '250000'){
            priceRangeMatch = property.price >= 250000 && property.price <= 500000
        }
        
        //filtering based on property type
        let propertyTypeMatch = selectedFilters.propertyType === "" || property.type === selectedFilters.propertyType;

        //filtering based on bedrooms
        let bedroomsMatch = true;

        if(selectedFilters.bedrooms == '4'){
            bedroomsMatch = property.beds >= 4
        }
        else if(selectedFilters.bedrooms == '3'){
            bedroomsMatch = property.beds == 3
        }
        else if(selectedFilters.bedrooms == '2'){
            bedroomsMatch = property.beds == 2
        }
        else if(selectedFilters.bedrooms == '1'){
            bedroomsMatch = property.beds == 1
        }

        //filtering based on status
        let statusMatch = selectedFilters.status === "" || property.status === selectedFilters.status;

        return priceRangeMatch && propertyTypeMatch && bedroomsMatch && statusMatch;
    })

    //filtering based on sorting
    if (selectedFilters.sortBy === 'Low to High'){
        filtered.sort((a,b) => a.price - b.price)
    }
    else if(selectedFilters.sortBy === 'High to Low'){
        filtered.sort((a,b) => b.price - a.price)
    }
    else if(selectedFilters.sortBy === 'Newest to Oldest'){
        filtered.sort((a,b) => b.yearBuilt - a.yearBuilt)
    }
    else if(selectedFilters.sortBy === 'Oldest to Newest'){
        filtered.sort((a,b) => a.yearBuilt - b.yearBuilt)
    }
    

    displayFilteredProperties(filtered)
}
// END - Filter Function

let cardsContainer = document.getElementById('cardsContainer')
let cantFindProperties = document.createElement('h2')

// START - DISPLAYING THE FILTERED PROPERTIES FUNCTION
let displayFilteredProperties = (list) => {

    // Clear old cards
    cardsContainer.innerHTML = "";

    if(list.length === 0){
        cardsContainer.append(cantFindProperties)
        cantFindProperties.textContent = 'Cant Find Properties';
        cantFindProperties.className = 'cant-find-properties'
    }

    list.forEach(property => {
        // property card (container)
        let propertyCard = document.createElement('a')
        propertyCard.className = 'featured-property__card'
        propertyCard.id = 'propertyCard'
        propertyCard.href = `propertyInfoPage.html?property=${(property.addressName).replace(/ /g,"-")}`;

        // property image (has background image)
        let propertyImage = document.createElement('div')
        propertyImage.className = "featured-property__image-container";
        propertyImage.style.backgroundImage =
            `url('${property.images[0]}')`;
        propertyImage.style.backgroundSize = "cover";
        propertyImage.style.backgroundPosition = "center";

        // property status
        let propertyStatus = document.createElement('div')
        propertyStatus.id = 'propertyStatus'
        propertyStatus.className = 'featured-property__status'
        propertyStatus.textContent = property.status

        // contain status in image element
        propertyImage.appendChild(propertyStatus)

        // property info (container)
        let propertyInfoContainer = document.createElement('div')
        propertyInfoContainer.className = 'featured-property__info-container'

        // property price
        let propertyPrice = document.createElement('h4')
        propertyPrice.id = 'propertyPrice'
        propertyPrice.textContent = `$${Number(property.price).toLocaleString()}`
        
        //property address name
        let propertyAddressName = document.createElement('h5')
        propertyAddressName.id = 'propertyAddressName'
        propertyAddressName.textContent = property.addressName

        // property address city
        let propertyAddressCity = document.createElement('p')
        propertyAddressCity.id = 'propertyAddressCity'
        propertyAddressCity.className = 'sub-title'
        propertyAddressCity.textContent = property.addressCity

        // property type
        let propertyType = document.createElement('p')
        propertyType.id = 'propertyType'
        propertyType.className = 'property-type'
        propertyType.textContent = property.type

        // property features flex container
        let propertyFeaturesContainer = document.createElement('div')
        propertyFeaturesContainer.className = 'featured-property__info-features-container'
        
        // when is the property Built
        let propertyYearBuilt = document.createElement('div')
        propertyYearBuilt.className = 'featured-property__info-feature'
        let YearBuiltInfo = document.createElement('h5')
        YearBuiltInfo.className = 'YearBuiltInfo'
        YearBuiltInfo.textContent = property.yearBuilt
        let propertyYearBuiltSubtitle = document.createElement('p')
        propertyYearBuiltSubtitle.className = 'featured__subtitle'
        propertyYearBuiltSubtitle.textContent = 'Year Built'
        propertyYearBuilt.append(YearBuiltInfo,propertyYearBuiltSubtitle)
        
        // bedroom number
        let propertyBedrooms = document.createElement('div')
        propertyBedrooms.className = 'featured-property__info-feature'
        let bedroomsInfo = document.createElement('h5')
        bedroomsInfo.className = 'bedroomsInfo'
        bedroomsInfo.textContent = property.beds
        let propertyBedroomsSubtitle = document.createElement('p')
        propertyBedroomsSubtitle.className = 'featured__subtitle'
        propertyBedroomsSubtitle.textContent = 'Bedrooms'
        propertyBedrooms.append(bedroomsInfo,propertyBedroomsSubtitle)

        // bathroom number
        let propertyBathrooms = document.createElement('div')
        propertyBathrooms.className = 'featured-property__info-feature'
        let bathroomsInfo = document.createElement('h5')
        bathroomsInfo.className = 'bathroomsInfo'
        bathroomsInfo.textContent = property.baths
        let propertyBathroomsSubtitle = document.createElement('p')
        propertyBathroomsSubtitle.className = 'featured__subtitle'
        propertyBathroomsSubtitle.textContent = 'Bathrooms'
        propertyBathrooms.append(bathroomsInfo,propertyBathroomsSubtitle)

        // sqfeet number
        let propertySqfeet = document.createElement('div')
        propertySqfeet.className = 'featured-property__info-feature'
        let sqfeetInfo = document.createElement('h5')
        sqfeetInfo.className = 'sqfeetInfo'
        sqfeetInfo.textContent = property.sqft
        let propertySqfeetSubtitle = document.createElement('p')
        propertySqfeetSubtitle.className = 'featured__subtitle'
        propertySqfeetSubtitle.textContent = 'Sq.Feet'
        propertySqfeet.append(sqfeetInfo,propertySqfeetSubtitle);

        propertyFeaturesContainer.append(propertyBedrooms,propertyBathrooms,propertySqfeet, propertyYearBuilt)

        //contain address, bathroom, bathroom, sqfeet in property info container
        propertyInfoContainer.append(propertyPrice, propertyAddressName, propertyAddressCity, propertyType, propertyFeaturesContainer)

        //contain image and property info in card element
        propertyCard.append(propertyImage, propertyInfoContainer)
        
        //contain all the infos in the card
        cardsContainer.appendChild(propertyCard);
    })
    
}
// START - DISPLAYING THE FILTERED PROPERTIES FUNCTION