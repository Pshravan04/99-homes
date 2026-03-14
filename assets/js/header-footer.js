/**
 * Shared Header and Footer for 99 Homes
 * This script injects the navbar and footer into all pages.
 */

const headerHTML = `
  <header>
    <div class="header-area homepage1 header header-sticky d-none d-lg-block " id="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header-top-area">
              <ul class="header-content">
                <li><a href="mailto:info@99homes.com"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                    </svg> info@99homes.com</a> <span> | </span></li>
                <li><a href="tel:+919876543210"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
                    </svg> +91 98765 43210</a><span> | </span></li>
                <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                    </svg> Vasai-Virar, Maharashtra</a></li>
              </ul>
              <ul class="list-content">
                <li><a href="login.html" class="signin"><span> | </span>Admin Login</a></li>
              </ul>
            </div>
            <div class="header-elements">
              <div class="site-logo">
                <a href="index.html"><img src="assets/img/newimg/logowhite.png" alt="99 Homes"></a>
              </div>
              <div class="main-menu">
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><a href="topmap-grid.html">Listings</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                  <li id="dashboard-menu-item" style="display: none;"><a href="dashboard.html" class="plus">Admin Dashboard</a></li>
                </ul>
              </div>
              <div class="btn-area">
                <a href="topmap-grid.html" class="theme-btn1">Explore Properties <span class="arrow1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg></span><span class="arrow2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
`;

const footerHTML = `
  <div class="footer-top-section">
    <img src="assets/img/elements/elements5.png" alt="99 Homes" class="elements5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="footer-top-area">
            <div class="img1">
              <a href="index.html"><img src="assets/img/newimg/logowhite.png" alt="99 Homes"></a>
            </div>
            <div class="pera">
              <p>Your trusted partner for buying and selling <br class="d-md-block d-none"> properties in Vasai-Virar with seamless solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer3-section-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12">
          <div class="footer-content">
            <h3>About Us</h3>
            <ul>
              <li><a href="contact.html">Contact us</a></li>
              <li><a href="index.html">Why choose us</a></li>
              <li><a href="#">Our team</a></li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 col-12">
          <div class="footer-content">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="topmap-grid.html">Property For Sale</a></li>
              <li><a href="contact.html">Help Center</a></li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 col-12">
          <div class="footer-content">
            <h3>Contact Us</h3>
            <ul class="contact">
              <li><a href="tel:+919876543210"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
                  </svg>+91 98765 43210</a></li>
              <li><a href="mailto:info@99homes.com"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                  </svg> info@99homes.com</a></li>
            </ul>
          </div>
        </div>

      </div>
      <div class="space60"></div>
      <div class="row">
        <div class="col-lg-12">
          <div class="copyright">
            <p>©Copyright 2024 - 99 Homes. All Right Reserved</p>
            <ul>
              <li><a href="contact.html">Terms of Service</a></li>
              <li><a href="contact.html">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function injectHeaderFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Check login status to show/hide dashboard link
    const isAdmin = localStorage.getItem('adminLoggedIn');
    const dashboardMenuItem = document.getElementById('dashboard-menu-item');
    if (dashboardMenuItem && isAdmin === 'true') {
        dashboardMenuItem.style.display = 'block';
    }

    // Initialize sticky header behavior if not already initialized
    // (main.js should handle this if #header exists)
}

document.addEventListener('DOMContentLoaded', injectHeaderFooter);
