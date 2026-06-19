// ================= ADD DONATION =================
async function addDonation() {

    const foodName = document.getElementById("foodName").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;
    const expiryTime = document.getElementById("expiryTime").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/donations/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    foodName,
                    quantity,
                    location,
                    expiryTime
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        document.getElementById("foodName").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("location").value = "";
        document.getElementById("expiryTime").value = "";

        loadDonations();

    } catch (error) {

        alert("Failed to add donation");

    }

}


// ================= LOAD DONATIONS =================
async function loadDonations() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/donations/all"
        );

        const donations = await response.json();

        let output = "";

        donations.forEach(donation => {

            output += `

            <div class="card">

                <h2 class="text-success">
                    ${donation.foodName}
                </h2>

                <p><b>Quantity:</b> ${donation.quantity}</p>

                <p><b>Location:</b> ${donation.location}</p>

                <p><b>Expiry Time:</b> ${donation.expiryTime}</p>

                <p>

                    <b>Status:</b>

                    <span style="color:${
                        donation.status === "Available"
                        ? "green"
                        : "red"
                    }">

                    ${donation.status}

                    </span>

                </p>

                ${
                    window.location.pathname.includes("ngo-dashboard.html")
                    ?
                    (
                        donation.status === "Available"
                        ?
                        `
                        <button
                        class="btn btn-warning"
                        onclick="claimDonation('${donation._id}')">

                        Claim Food

                        </button>
                        `
                        :
                        `
                        <button
                        class="btn btn-secondary"
                        disabled>

                        Already Claimed

                        </button>
                        `
                    )
                    :
                    ""
                }

                <button
                class="btn btn-danger mt-2"
                onclick="deleteDonation('${donation._id}')">

                Delete

                </button>

            </div>

            `;

        });

        document.getElementById("donationList").innerHTML = output;

    }

    catch (error) {

        console.log(error);

    }

}


// ================= CLAIM DONATION =================
async function claimDonation(id) {

    try {

        const response = await fetch(

            `http://localhost:5000/api/donations/claim/${id}`,

            {
                method: "PUT"
            }

        );

        const data = await response.json();

        alert(data.message);

        loadDonations();

    }

    catch (error) {

        alert("Failed");

    }

}


// ================= DELETE DONATION =================
async function deleteDonation(id) {

    try {

        const response = await fetch(

            `http://localhost:5000/api/donations/${id}`,

            {
                method: "DELETE"
            }

        );

        const data = await response.json();

        alert(data.message);

        loadDonations();

    }

    catch (error) {

        alert("Delete Failed");

    }

}


// ================= SEARCH =================
function searchDonation() {

    let input =
    document.getElementById("searchBox").value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    cards.forEach(card => {

        let food =
        card.innerText.toLowerCase();

        if (food.includes(input)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}


// ================= LOGOUT =================
function logout() {

    window.location.href = "login.html";

}


// ================= AUTO LOAD =================
if (
    window.location.pathname.includes("donor-dashboard.html")
    ||
    window.location.pathname.includes("ngo-dashboard.html")
) {

    loadDonations();

}