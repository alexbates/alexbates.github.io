// Prevent code from running until DOM loads
document.addEventListener("DOMContentLoaded", () => {
    function themeDetection() {
        // Set theme variable to light by default, prior to detection
        var theme="light";    
        // Check whether we have already used local storage to set theme
        if(localStorage.getItem("theme")){
            // If we have used local storage to set theme and theme is dark, set theme variable to dark
            if(localStorage.getItem("theme") == "dark"){
                var theme = "dark";
            }
        } 
        // Check if the browser theme setting is dark mode, returns true if so
        else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            // Set theme variable to dark if browser uses dark mode
            var theme = "dark";
        }
        // If theme variable is dark following detection, set "data-theme" attribute for the document
        if (theme=="dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }
    themeDetection();
    // Assign hidden checkbox for the theme selector to a constant
    const themeSelector = document.getElementById("checkbox");
    // Change theme function used by the event listener
    // Uses local storage variable to enable theme to persist between pages
    function changeTheme(e) {
        // If hidden checkbox is checked
        if (e.target.checked) {
            // Set local storage theme variable and document data-theme attribute to dark 
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSelector.checked = true;
        } 
        // If hidden checkbox is unchecked
        else {
            // Set local storage theme variable and document data-theme attribute to light
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
            themeSelector.checked = false;
        }    
    }
    // Add event listener for hidden checkbox
    // Change is the event type, changeTheme is the funciton, and set false for useCapture
    themeSelector.addEventListener("change", changeTheme, false);
    // If the theme is set to dark, either by local storage or browser, check the hidden checkbox
    if (document.documentElement.getAttribute("data-theme") == "dark"){
        themeSelector.checked = true; 
    }
   
});
