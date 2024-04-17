document.addEventListener('DOMContentLoaded', function () {
    const plusDiv = document.getElementById('plus');
    const popUpText1 = document.getElementById('popUpText1');
    const popUpText2 = document.getElementById('popUpText2');
    const closeImages = document.querySelectorAll('#popUpText1 img[alt="close"], #popUpText2 img[alt="close"]');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const projects = document.querySelectorAll('.project');
    const projectShows = document.querySelectorAll('.projectShow');
    const homeText3 = document.getElementById('homeText3');
    const hireMe = document.getElementById('hireMe');

    plusDiv.addEventListener('click', function () {
        showRandomly(popUpText1);
        showRandomly(popUpText2);
    });

    function adjustHeight() {
        // Get the computed style of the homeText3 to find its actual height
        const homeText3Height = window.getComputedStyle(homeText3).height;
        // Set the height of hireMe to match homeText3
        hireMe.style.height = homeText3Height;
    }

    // Adjust height on page load
    adjustHeight();

    // Re-adjust height whenever the window is resized to ensure consistency
    window.addEventListener('resize', adjustHeight);
    
    function showRandomly(element) {
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;
    
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
    
        element.style.left = `${Math.max(0, randomX)}px`; // Ensures element is not off-screen to the left
        element.style.top = `${Math.max(0, randomY)}px`; // Ensures element is not off-screen to the top
        element.style.display = 'block';
    }
    
    closeImages.forEach(img => {
        img.addEventListener('click', function () {
            this.parentElement.style.display = 'none';
        });
    });
    
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
        element.onmousedown = dragMouseDown;
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
    
            let newTop = element.offsetTop - pos2;
            let newLeft = element.offsetLeft - pos1;
    
            // Constrain the new position within the viewport
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - element.offsetHeight));
            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - element.offsetWidth));
    
            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";
        }
    
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Apply draggable functionality to the popups
    makeDraggable(popUpText1);
    makeDraggable(popUpText2);
    
    // start of Function to toggle the side menu visibility
    function toggleSideMenu() {
        // Checks the current display style of the sideMenu to decide action
        if (sideMenu.style.display === 'block') {
            sideMenu.style.display = 'none';
            document.body.classList.remove('no-scroll'); // Enable scrolling when menu is closed
        } else {
            sideMenu.style.display = 'block';
            document.body.classList.add('no-scroll'); // Disable scrolling when menu is open
        }
    }
    // Function to close the side menu
    function closeSideMenu() {
        sideMenu.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
    // Attach event listener to the menu toggle button
    menuToggle.addEventListener('click', toggleSideMenu);

    // Attach event listener to the close menu button
    closeMenu.addEventListener('click', closeSideMenu);

    // Close side menu when any link within the menu is clicked
    document.querySelectorAll('#mobileNavLinks a').forEach(link => {
        link.addEventListener('click', closeSideMenu);
    });

    // start of projectsPage 
    // Initially hide all .projectShow elements
    projectShows.forEach(function(projectShow) {
        projectShow.style.display = 'none';
    });
    projects.forEach(project => {
        project.addEventListener('click', function() {
            const projectShow = this.querySelector('.projectShow');
            const img = this.querySelector('img.plusImg');
    
            // Determine if the clicked projectShow is already open
            const isCurrentlyVisible = projectShow.style.display === 'block';
    
            // Hide all projectShow divs
            projectShows.forEach(el => {
                el.style.display = 'none';
                // Optionally reset the image transform for all images
                const closeImg = el.parentElement.querySelector('img.plusImg');
                if (closeImg) closeImg.style.transform = 'rotate(0deg)';
            });
    
            // Toggle the clicked projectShow based on its previous state
            if (!isCurrentlyVisible) {
                projectShow.style.display = 'block';
                img.style.transform = 'rotate(45deg)';
                // Scroll the clicked project into view
                this.scrollIntoView({behavior: 'smooth', block: 'start'});
            } else {
                projectShow.style.display = 'none';
                img.style.transform = 'rotate(0deg)';
            }
        });
    });
    // end of projectsPage 
});
