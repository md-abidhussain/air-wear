document.addEventListener("DOMContentLoaded", function() {
    let googleButton = document.getElementById("google_login_button");
    let guestButton = document.getElementById("guest_login_button");
    let newsletterCheck = document.getElementById("newsletter_checkbox");
    let errorMessage = document.getElementById("login_error_message");

    // Check if user is already logged in
    let currentUserStatus = localStorage.getItem("air_wear_user_logged_in");
    if(currentUserStatus === "true") {
        window.location.href = "index.html"; // redirect to dashboard
    }

    googleButton.addEventListener("click", function() {
        // Simulate Login delay
        googleButton.innerHTML = "Logging in...";
        setTimeout(function() {
            localStorage.setItem("air_wear_user_logged_in", "true");
            localStorage.setItem("air_wear_user_type", "google_user");
            
            if(newsletterCheck.checked) {
                localStorage.setItem("air_wear_newsletter_subscribed", "true");
            } else {
                localStorage.setItem("air_wear_newsletter_subscribed", "false");
            }
            
            window.location.href = "index.html";
        }, 1500);
    });

    guestButton.addEventListener("click", function() {
        localStorage.setItem("air_wear_user_logged_in", "true");
        localStorage.setItem("air_wear_user_type", "guest_user");
        
        if(newsletterCheck.checked) {
            localStorage.setItem("air_wear_newsletter_subscribed", "true");
        } else {
            localStorage.setItem("air_wear_newsletter_subscribed", "false");
        }
        
        window.location.href = "index.html";
    });
});
