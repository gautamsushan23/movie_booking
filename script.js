let selectedMovie = "";

function selectMovie(movieName, imgSrc) {
    selectedMovie = movieName;
    document.getElementById("selected-movie").value = movieName;

    // Remove selection from all movies
    let movies = document.querySelectorAll(".movie img");
    movies.forEach(movie => movie.classList.remove("selected"));

    // Add selection border to clicked movie
    let selectedMovieElement = document.querySelector(`img[src='${imgSrc}']`);
    selectedMovieElement.classList.add("selected");
}

function bookTicket(movieName, date, time) {
    let name = document.getElementById("name").value;

    if (name.trim() === "") {
        alert("Please enter your name before booking.");
        return;
    }

    // Show confirmation dialog
    let isConfirmed = confirm(`Are you sure you want to book a ticket for:\nMovie: ${movieName}\nDate: ${date}\nTime: ${time}?`);
    if (!isConfirmed) {
        return;
    }

    let bookingID = Math.random().toString(36).substr(2, 9);
    let ticketData = `Movie: ${movieName}\nName: ${name}\nDate: ${date}\nTime: ${time}\nBooking ID: ${bookingID}`;

    // Clear previous QR code
    document.getElementById("qrcode").innerHTML = ""; 
    new QRCode(document.getElementById("qrcode"), {
        text: ticketData,
        width: 200,
        height: 200
    });

    // Update the details below QR
    document.getElementById("qr-details").innerHTML = `
        <p><strong>Movie:</strong> ${movieName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Booked by:</strong> ${name}</p>
    `;

    document.getElementById("qrcode-container").style.display = "flex";
 
    document.getElementById("qrcode-container").scrollIntoView({ behavior: "smooth" });
}
