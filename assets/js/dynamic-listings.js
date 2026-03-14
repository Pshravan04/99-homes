const API_URL = 'http://localhost:5000/api/properties';

async function fetchProperties(containerId, limit = null) {
    try {
        const response = await fetch(API_URL);
        let properties = await response.json();
        
        if (limit) {
            properties = properties.slice(0, limit);
        }
        
        renderPropertyCards(containerId, properties);
    } catch (err) {
        console.error('Error fetching properties:', err);
    }
}

function renderPropertyCards(containerId, properties, cardStyle = 'grid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    properties.forEach(prop => {
        const card = document.createElement('div');
        
        if (cardStyle === 'featured') {
            card.className = 'cs_case_study cs_style_1 cs_hover_active active';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-duration', '800');
            
            const firstImg = prop.images && prop.images.length > 0 ? `http://localhost:5000${prop.images[0]}` : 'assets/img/newimg/nikon1.webp';
            
            card.innerHTML = `
                <a href="property-details-v1.html?id=${prop._id}" class="cs_case_study_thumb cs_bg_filed" style="background-image: url(${firstImg})"></a>
                <div class="content-area">
                    <a href="property-details-v1.html?id=${prop._id}" class="head">${prop.name}</a>
                    <div class="space16"></div>
                    <p>Location: ${prop.location}</p>
                    <div class="space24"></div>
                    <ul>
                        <li><a href="#"><span class="icon"><img src="assets/img/icons/bed1.svg" alt="99 Homes"></span> ${prop.configuration || 'N/A'} <span class="line"> | </span></a></li>
                        <li><a href="#"><span class="icon"><img src="assets/img/icons/sqare1.svg" alt="99 Homes"></span> ${prop.area || 'N/A'}</a></li>
                    </ul>
                    <div class="space24"></div>
                    <div class="btn-area">
                        <div class="nm-btn">
                            <a href="property-details-v1.html?id=${prop._id}">${prop.price}</a>
                        </div>
                        <div class="love-share">
                            <a href="contact.html" class="share">Contact</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            card.className = 'col-lg-4 col-md-6';
            
            // Handle images for slider
            const images = prop.images && prop.images.length > 0 
                ? prop.images.map(img => `http://localhost:5000${img}`)
                : ['assets/img/all-images/property/prop-img1.png'];
                
            const imageSlides = images.map(src => `
                <div class="swiper-slide">
                    <div class="img1">
                        <img src="${src}" alt="${prop.name}">
                    </div>
                </div>
            `).join('');

            card.innerHTML = `
                <div class="property-single-boxarea" data-aos="fade-up" data-aos-duration="1000">
                    <div class="swiper property-slider">
                        <div class="swiper-wrapper">
                            ${imageSlides}
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <div class="content">
                        <div class="header">
                            <div class="left">
                                <a href="property-details-v1.html?id=${prop._id}">${prop.name}</a>
                                <p><img src="assets/img/icons/location1.svg" alt="99 Homes"> ${prop.location}</p>
                            </div>
                        </div>
                        <div class="space20"></div>
                        <div class="details">
                            <ul>
                                <li><img src="assets/img/icons/bed1.svg" alt="99 Homes"> ${prop.configuration || 'N/A'}</li>
                                <li><img src="assets/img/icons/bath1.svg" alt="99 Homes"> ${prop.possessionDate || 'N/A'}</li>
                                <li><img src="assets/img/icons/sqare1.svg" alt="99 Homes"> ${prop.area || 'N/A'}</li>
                            </ul>
                        </div>
                        <div class="space20"></div>
                        <div class="footer">
                            <div class="price">
                                <h3>${prop.price}</h3>
                            </div>
                            <div class="btn-area">
                                 <a href="property-details-v1.html?id=${prop._id}" class="theme-btn1">Read More</a>
                                 <a href="contact.html" class="theme-btn1 btn2">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        container.appendChild(card);
    });

    // Re-initialize Swiper if used
    if (window.Swiper) {
        new Swiper('.property-slider', {
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProperties('featured-listings', 6);
    fetchProperties('grid-listings');
    fetchProperties('list-listings', null, 'list');
    
    fetchProperties('vasai-listings');
    fetchProperties('virar-listings');
});
