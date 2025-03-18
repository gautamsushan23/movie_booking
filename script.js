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

    let bookingID = Math.random().toString(36).substr(2, 9); // Generate Booking ID
    let ticketData = `Movie: ${movieName}\nName: ${name}\nDate: ${date}\nTime: ${time}\nBooking ID: ${bookingID}`;

    // Generate QR Code with Booking ID
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
        <p><strong>Booking ID:</strong> ${bookingID}</p> <!-- Display Booking ID -->
    `;

    // Show QR Code Section and Scroll to It
    document.getElementById("qrcode-container").style.display = "flex";
    document.getElementById("qrcode-container").scrollIntoView({ behavior: "smooth" });

    // Send booking data to Formspree
    fetch("https://formspree.io/f/xyzezlzp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movie: movieName,
            name: name,
            date: date,
            time: time,
            bookingID: bookingID
        })
    }).then(response => {
        if (response.ok) {
            alert("Your booking details have been successfully stored!");
        } else {
            alert("Failed to store booking details.");
        }
    }).catch(error => console.error("Error:", error));
}
