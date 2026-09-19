/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const emailError =
            document.getElementById("emailError");

        const passwordError =
            document.getElementById("passwordError");


        emailError.textContent = "";
        passwordError.textContent = "";


        if (email === "") {

            emailError.textContent =
                "Please enter your email.";

            return;
        }


        if (!email.includes("@")) {

            emailError.textContent =
                "Please enter a valid email.";

            return;
        }


        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            return;
        }


        window.location.href = "dashboard.html";

    });

}


/* ================= LOG OUT ================= */

const logout =
    document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function() {

        window.location.href = "index.html";

    });

}


/* ================= DASHBOARD MENU ================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const sidebar =
    document.querySelector(".sidebar");

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function() {

        sidebar.classList.toggle("hide");

    });

}


/* ================= SPECIALTY NAME ================= */

const params =
    new URLSearchParams(window.location.search);

const specialty =
    params.get("specialty");

if (specialty) {

    const specialtyName =
        decodeURIComponent(specialty);


    const breadcrumb =
        document.querySelector(".specialty-name");

    const title =
        document.querySelector(".header-main h1");


    if (breadcrumb) {

        breadcrumb.textContent =
            specialtyName;

    }


    if (title) {

        title.textContent =
            specialtyName;

    }

}


/* ================= DOCTOR MAP ================= */

const doctorMapElement =
    document.getElementById("doctor-map");

if (doctorMapElement && typeof L !== "undefined") {

    const doctorMap =
        L.map("doctor-map").setView(
            [34.5553, 69.2075],
            12
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(doctorMap);


    L.marker([34.5553, 69.2075])
        .addTo(doctorMap)
        .bindPopup("Doctor Location");


    L.marker([34.5353, 69.1750])
        .addTo(doctorMap)
        .bindPopup("Medical Center");


    L.marker([34.5650, 69.2300])
        .addTo(doctorMap)
        .bindPopup("Hospital");


    setTimeout(function() {

        doctorMap.invalidateSize();

    }, 500);

}


/* ================= CLINIC MAP ================= */

const clinicMapElement =
    document.getElementById("clinic-map");

if (clinicMapElement && typeof L !== "undefined") {

    const clinicMap =
        L.map("clinic-map").setView(
            [34.5553, 69.2075],
            12
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(clinicMap);


    L.marker([34.5553, 69.2075])
        .addTo(clinicMap)
        .bindPopup("MyPatientHUB Clinic");


    L.marker([34.5353, 69.1750])
        .addTo(clinicMap)
        .bindPopup("Medical Clinic");


    setTimeout(function() {

        clinicMap.invalidateSize();

    }, 500);

}


/* ================= BACK TO TOP ================= */

const clinicBackTop =
    document.querySelector(".clinic-back-top");

if (clinicBackTop) {

    clinicBackTop.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}