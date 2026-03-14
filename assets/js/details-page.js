const API_URL = 'http://localhost:5000/api/properties';

async function fetchPropertyDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    if (!propertyId) {
        console.error('No property ID found in URL');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${propertyId}`);
        const prop = await response.json();

        if (prop) {
            updatePageContent(prop);
        }
    } catch (err) {
        console.error('Error fetching property details:', err);
    }
}

function updatePageContent(prop) {
    // Title & Breadcrumb
    const titles = document.querySelectorAll('#prop-title');
    titles.forEach(el => el.textContent = prop.name);
    
    const breadcrumbs = document.querySelectorAll('#prop-breadcrumb');
    breadcrumbs.forEach(el => el.textContent = prop.name);

    // Price
    const priceEl = document.getElementById('prop-price');
    if (priceEl) priceEl.textContent = prop.price;

    // Location
    const locationEls = document.querySelectorAll('#prop-location');
    locationEls.forEach(el => el.textContent = prop.location + ', ' + (prop.address || ''));

    // Details/Features
    const configEl = document.getElementById('prop-config');
    if (configEl) configEl.innerHTML = `<img src="assets/img/icons/bed1.svg" alt="99 Homes">${prop.configuration || 'N/A'} <span> | </span>`;
    
    const possessionEl = document.getElementById('prop-possession');
    if (possessionEl) possessionEl.innerHTML = `<img src="assets/img/icons/bath1.svg" alt="99 Homes">${prop.possessionDate || 'N/A'} <span> | </span>`;
    
    const areaEl = document.getElementById('prop-area');
    if (areaEl) areaEl.innerHTML = `<img src="assets/img/icons/sqare1.svg" alt="99 Homes">${prop.area || 'N/A'} sq`;

    // Main Image
    const mainImg = document.getElementById('prop-main-img');
    if (mainImg && prop.images && prop.images.length > 0) {
        mainImg.src = `http://localhost:5000${prop.images[0]}`;
    }

    // Description
    const descEl = document.getElementById('prop-description');
    if (descEl) descEl.textContent = prop.description;

    // Amenities
    const amenitiesContainer = document.getElementById('prop-amenities');
    if (amenitiesContainer && prop.amenities) {
        amenitiesContainer.innerHTML = prop.amenities.map(amenity => `
            <div class="col-lg-6 col-md-6">
                <div class="list-box">
                    <div class="icon">
                        <i class="fa-solid fa-check text-success"></i>
                    </div>
                    <div class="text">
                        <p>${amenity}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Gallery Slider
    const sliderContainer = document.getElementById('prop-gallery');
    if (sliderContainer && prop.images) {
        sliderContainer.innerHTML = prop.images.map(img => `
            <div class="img1">
                <img src="http://localhost:5000${img}" alt="${prop.name}">
            </div>
        `).join('');
        
        // Re-init slider if needed (Note: property-details uses owl-carousel in original template)
        if ($('.property-details-slider').length > 0) {
            $('.property-details-slider').trigger('destroy.owl.carousel');
            $('.property-details-slider').owlCarousel({
                items: 3,
                loop: true,
                margin: 20,
                nav: false,
                dots: true,
                autoplay: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 3 }
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchPropertyDetails);
