// GLOBAL HEADER SEARCH FUNCTIONALITY

let propertiesData = [];
let searchBar = null;
let results = null;

// Load properties data
async function loadPropertiesData() {
    try {
        const response = await fetch('./data/properties.json');
        propertiesData = await response.json();
        console.log(`✅ Loaded ${propertiesData.length} properties for search`);
        initializeSearch();
    } catch (error) {
        console.error('❌ Failed to load properties:', error);
    }
}

// Initialize search after DOM is ready
function initializeSearch() {
    searchBar = document.getElementById('searchBar');
    results = document.getElementById('results');

    if (!searchBar || !results) {
        console.warn('⚠️ Search bar or results container not found');
        return;
    }

    // Search on input
    searchBar.addEventListener('input', performSearch);

    // Clear results on backspace
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && searchBar.value === '') {
            results.innerHTML = '';
        }
    });

    // Clear results when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#headerNav') && !event.target.closest('#results')) {
            results.innerHTML = '';
        }
    });
}

// Perform search
function performSearch() {
    const searchText = searchBar.value.toLowerCase().trim();

    // Clear results if search is empty
    if (!searchText) {
        results.innerHTML = '';
        return;
    }

    // Filter properties
    const filteredProperties = propertiesData.filter(property => {
        return (
            property.addressName.toLowerCase().includes(searchText) ||
            property.addressCity.toLowerCase().includes(searchText) ||
            property.city.toLowerCase().includes(searchText)
        );
    });

    // Display results
    results.innerHTML = '';

    if (filteredProperties.length === 0) {
        results.innerHTML = `
            <div style="padding: 16px; text-align: center; color: #5f5e5a;">
                No properties found for "${searchText}"
            </div>
        `;
        return;
    }

    filteredProperties.forEach(property => {
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
            <a 
                style="display: flex; gap: 16px; padding: 8px; color: #231f20; text-decoration: none; border-bottom: 1px solid #e5e0f0;" 
                href="propertyInfoPage.html?property=${(property.addressName).replace(/ /g, "-")}" class="search-result"" 
                class="search-result"
            >
                <img 
                    style="height: 60px; width: 60px; object-fit: cover; border-radius: 4px;" 
                    src="${property.images[0]}"
                    alt="${property.addressName}"
                >
                <div>
                    <h5 style="margin: 0; font-size: 14px;">${property.addressName}</h5>
                    <p style="margin: 4px 0; font-size: 12px; color: #5f5e5a;">${property.addressCity}</p>
                    <p style="margin: 4px 0; font-size: 14px; font-weight: 500;">$${Number(property.price).toLocaleString()}</p>
                </div>
            </a>
        `;
        results.appendChild(resultDiv);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadPropertiesData);


document.getElementById('homeSearchBtn').addEventListener('click', () => {
    document.getElementById('headerNavContainer').classList.add('active-modal');
})

document.getElementById('searchBarCloseButton').addEventListener('click', () => {
    document.getElementById('headerNavContainer').classList.remove('active-modal');
    results.innerHTML = '';
})