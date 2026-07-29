

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

const priceRangeModal = document.getElementById("priceRangeModal");
const propertyTypeModal = document.getElementById("propertyTypeModal");
const bedroomsModal = document.getElementById("bedroomsModal");
const statusModal = document.getElementById("statusModal");
const sortByModal = document.getElementById("sortByModal");
let applyFiltersModal = document.getElementById('applyFiltersModal');

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
        applyFiltersModal.classList.remove("active");
    }
    else{
        applyFiltersModal.classList.add("active");
    }
}

// Event Listener for showing all the listings
let allListingsModal = document.getElementById('allListingsModal')

allListingsModal.style.backgroundColor = '#7D3B92';
allListingsModal.style.color = '#fff';

import { showProperties } from "./showProperties.js";

allListingsModal.addEventListener('click', () => {
    cardsContainer.innerHTML = "";
    location.reload();

    allListingsModal.style.backgroundColor = '#7D3B92';
    allListingsModal.style.color = '#fff';
    showProperties();
})


// Event Listener for the price range filter
priceRangeModal.addEventListener("change", function () {
    
    if (priceRangeModal.value === "") {
        priceRangeModal.options[priceRangeModal.selectedIndex].text = "Price Range ⮟";
        priceRangeModal.style.backgroundColor = '#fff';
        priceRangeModal.style.color = '#231f20';

        selectedPriceRange = priceRangeModal.value
        selectedFilters.priceRange = priceRangeModal.value;
    }
    else{
        priceRangeModal.style.backgroundColor = '#7D3B92';
        priceRangeModal.style.color = '#fff';

        selectedPriceRange = priceRangeModal.value
        selectedFilters.priceRange = priceRangeModal.value;
    }
    
    activateApplyButton();
});

// Event Listener for the property type filter
propertyTypeModal.addEventListener("change", function () {
    
    if (propertyTypeModal.value === "") {
        propertyTypeModal.options[propertyTypeModal.selectedIndex].text = "Property Type ⮟";
        propertyTypeModal.style.backgroundColor = '#fff';
        propertyTypeModal.style.color = '#231f20';

        selectedPropertyType = propertyTypeModal.value
        selectedFilters.propertyType = propertyTypeModal.value;
    }
    else{
        propertyTypeModal.style.backgroundColor = '#7D3B92';
        propertyTypeModal.style.color = '#fff';

        selectedPropertyType = propertyTypeModal.value
        selectedFilters.propertyType = propertyTypeModal.value;
    }

    activateApplyButton();
});

// Event Listener for the bedrooms filter
bedroomsModal.addEventListener("change", function () {
    
    if (bedroomsModal.value === "") {
        bedroomsModal.options[bedroomsModal.selectedIndex].text = "Bedrooms ⮟";
        bedroomsModal.style.backgroundColor = '#fff';
        bedroomsModal.style.color = '#231f20';

        selectedBedrooms = bedroomsModal.value
        selectedFilters.bedrooms = bedroomsModal.value;
    }
    else{
        bedroomsModal.style.backgroundColor = '#7D3B92';
        bedroomsModal.style.color = '#fff';

        selectedBedrooms = bedroomsModal.value
        selectedFilters.bedrooms = bedroomsModal.value;
    }

    activateApplyButton();
});

// Event Listener for the status filter
statusModal.addEventListener("change", function () {
    
    if (statusModal.value === "") {
        statusModal.options[statusModal.selectedIndex].text = "Status ⮟";
        statusModal.style.backgroundColor = '#fff';
        statusModal.style.color = '#231f20';

        selectedStatus = statusModal.value
        selectedFilters.status = statusModal.value;
    }
    else{
        statusModal.style.backgroundColor = '#7D3B92';
        statusModal.style.color = '#fff';

        selectedStatus = statusModal.value
        selectedFilters.status = statusModal.value;
    }

    activateApplyButton();
});

// Event Listener for the sort by filter
sortByModal.addEventListener("change", function () {
    
    if (sortByModal.value === "") {
        sortByModal.options[sortByModal.selectedIndex].text = "Sort By ⮟";
        sortByModal.style.backgroundColor = '#fff';
        sortByModal.style.color = '#231f20';

        selectedSortBy = sortByModal.value
        selectedFilters.sortBy = sortByModal.value;
    }
    else{
        sortByModal.style.backgroundColor = '#7D3B92';
        sortByModal.style.color = '#fff';

        selectedSortBy = sortByModal.value
        selectedFilters.sortBy = sortByModal.value;
    }

    activateApplyButton();
});

// END  - FILTER FUNCTION TO ACTIVATE OR UNACTIVATE THE APPLY FILTERS BUTTON WHENEVER A FILTER IS CHOSEN OR NOT

// START - APPLY FILTER BUTTON FUNCTION
applyFiltersModal.addEventListener('click', () => {
    applyFiltersModal.classList.remove('active'); 
    

    allListingsModal.style.backgroundColor = '#fff';
    allListingsModal.style.color = '#231f20';

    console.log(selectedFilters)
    
    filtersModal.classList.add('unactive')
    filtersModal.classList.remove('active')

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


//START - FILTERS MODAL (MOBILE VIEW)
let chooseFilters = document.getElementById('chooseFilters')
let closeButton = document.getElementById('closeButton')
let filtersModal = document.getElementById('filtersModal')

chooseFilters.addEventListener('click', () => {
    filtersModal.classList.remove('unactive')
    filtersModal.classList.add('active')
})
closeButton.addEventListener('click', () => {
    filtersModal.classList.add('unactive')
    filtersModal.classList.remove('active')
})
//END - FILTERS MODAL (MOBILE VIEW)