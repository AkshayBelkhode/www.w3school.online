// table of content
(function () {

   window.addEventListener("load", () => {
      /*-----------------------------------------
       Page loader 
       -----------------------------------------*/
      document.querySelector(".js-page-loader").classList.add("fade-out");
      setTimeout(() => {
         document.querySelector(".js-page-loader").style.display = "none";
      }, 600);
   });




   /*------------------------------------
    Course Preview video 
    ------------------------------------*/
   function coursePreviewVideo() {
      const coursePreviewModal = document.querySelector('.js-course-preview-modal');
      if (coursePreviewModal) { //if the element exists 
         coursePreviewModal.addEventListener('shown.bs.modal', function () {
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;
         });
         coursePreviewModal.addEventListener('hide.bs.modal', function () {
            this.querySelector(".js-course-preview-video").pause();
         });
      }
   }
   coursePreviewVideo();


   /*---------------------------------------
     header Menu 
   -----------------------------------------*/
   function headerMenu() {
      const menu = document.querySelector(".js-header-menu"),
         menuBackdrop = document.querySelector(".js-header-backdrop"),
         menuCollapseWidth = 991;

      function toggleMenu() {
         menu.classList.toggle("open");
         menuBackdrop.classList.toggle("active");
         document.body.classList.toggle("hidden-scrolling");
      }

      document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
         item.addEventListener("click", toggleMenu);
      });

      // close the header menu by clicking outside of it;
      menuBackdrop.addEventListener("click", toggleMenu);

      function collapseSubMenu() {
         menu.querySelector(".js-menu-item-has-children.active .js-sub-menu")
            .removeAttribute("style");
         menu.querySelector(".js-menu-item-has-children.active")
            .classList.remove("active");
      }
      menu.addEventListener("click", (event) => {
         const { target } = event;
         if (!(target.hasAttribute("data-js-toggle") && window.innerWidth <= menuCollapseWidth)) {
            return;
         }
         // prevent default anchor click behavior
         event.preventDefault();
         const menuItem = target.parentElement;
         // if clicked menuItem is already expanded, collapse it
         if (menuItem.classList.contains("active")) {
            collapseSubMenu();
         }
         else {
            // collapse existing expanded menuItem
            if (menu.querySelector(".js-menu-item-has-children.active")) {
               collapseSubMenu();
            }
            // expand new menuItem
            menuItem.classList.add("active");
            const subMenu = menuItem.querySelector(".js-sub-menu");
            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
         }
      });

      // when resizing window
      window.addEventListener("resize", function () {
         if (this.innerWidth > menuCollapseWidth && menu.classList.contains("open")) {
            toggleMenu();
            if (menu.querySelector(".js-menu-item-has-children.active")) {
               collapseSubMenu();
            }
         }
      });
   }
   headerMenu();


   /*-----------------------------------
    theme customizer toggle
   -------------------------------------*/
   function themeCustomizerToggle() {
      const themeCustomizer = document.querySelector(".js-theme-customizer"),
         themeCustomizerToggler = document.querySelector(".js-theme-customizer-toggler");

      themeCustomizerToggler.addEventListener("click", function () {
         themeCustomizer.classList.toggle("open");
         this.querySelector("i").classList.toggle("fa-times");
         this.querySelector("i").classList.toggle("fa-cog");
      });
   }
   themeCustomizerToggle();


   /*----------------------------------
    theme colors
    -----------------------------------*/
   function themeColors() {
      const colorStyle = document.querySelector(".js-color-style"),
         themeColorsContainer = document.querySelector(".js-theme-colors");

      themeColorsContainer.addEventListener("click", ({ target }) => {
         if (target.classList.contains("js-theme-color-item")) {
            localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
            setColor();
         }
      });
      function setColor() {
         let path = colorStyle.getAttribute("href").split("/");
         path = path.slice(0, path.length - 1);
          colorStyle.setAttribute("href", path.join("/") + "/" +
            localStorage.getItem("color") + ".css");

         if (document.querySelector(".js-theme-color-item.active")) {
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
         }
         document.querySelector("[data-js-theme-color=" +
            localStorage.getItem("color") + "]").classList.add("active");
      }

      // if 'color' key not null
      if (localStorage.getItem("color") !== null) {
         setColor();
      }
      else {
         const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
         document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
         localStorage.setItem("color", defaultColor);
      }
   }
   themeColors();


   /*----------------------------------
    theme light & dark mode 
    -----------------------------------*/
   function themeLightDark() {
      const darkModeCheckbox = document.querySelector(".js-dark-mode");

      darkModeCheckbox.addEventListener("change", function () {
         localStorage.setItem("theme-dark", this.checked);
         themeMode();
      });

      function themeMode() {
         if (localStorage.getItem("theme-dark") === "false") {
            document.body.classList.remove("t-dark");
         }
         else {
            document.body.classList.add("t-dark");
         }
      }

      //  if 'theme-dark' key not null 
      if (localStorage.getItem("theme-dark") !== null) {
         themeMode();
      }
      if (document.body.classList.contains("t-dark")) {
         darkModeCheckbox.setAttribute("checked", "");
         localStorage.setItem("theme-dark", "true");
      }
      else {
         localStorage.setItem("theme-dark", "false");
      }
   }
   themeLightDark();


   /*----------------------------------
    theme glass effect
    -----------------------------------*/
   function themeGlassEffect() {
      const glassEffectCheckbox = document.querySelector(".js-glass-effect"),
         glassStyle = document.querySelector(".js-glass-style");

      glassEffectCheckbox.addEventListener("change", function () {
         localStorage.setItem("glass-effect", this.checked);
         glass();
      });

      function glass() {
         if (localStorage.getItem("glass-effect") === "true") {
            glassStyle.removeAttribute("disabled");
         }
         else {
            glassStyle.setAttribute("disabled", "");
         }
      }

      // if 'glass-effect' key not null
      if (localStorage.getItem("glass-effect") !== null) {
         glass();
      }

      if (!glassStyle.hasAttribute("disabled")) {
         glassEffectCheckbox.setAttribute("checked", "");
         localStorage.setItem("glass-effect", "true");
      }
      else {
         localStorage.setItem("glass-effect", "false");
      }
   }
   themeGlassEffect();

})();
