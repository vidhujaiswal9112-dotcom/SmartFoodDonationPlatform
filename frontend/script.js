// Register User
async function registerUser() {

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        alert("Registration Failed");

    }

}


// Login User
async function loginUser() {

    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

           if(data.user.role==="ngo")
{
    window.location.href="ngo-dashboard.html";
}
else
{
    window.location.href="donor-dashboard.html";
}
        }

    } catch (error) {

        alert("Login Failed");

    }

}


// Add Donation
async function addDonation() {

    const donationData = {

        foodName: document.getElementById("foodName").value,
        quantity: document.getElementById("quantity").value,
        location: document.getElementById("location").value,
        expiryTime: document.getElementById("expiryTime").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/donations/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donationData)
            }
        );

        const data = await response.json();

        alert(data.message);

        loadDonations();

    } catch (error) {

        alert("Failed to add donation");

    }

}


// Load Donations
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

                <h2>${donation.foodName}</h2>

                <p><b>Quantity:</b> ${donation.quantity}</p>

                <p><b>Location:</b> ${donation.location}</p>

                <p><b>Expiry Time:</b> ${donation.expiryTime}</p>

                <p>

               <b>Status:</b>

               <span style="color:${donation.status==="Available"?"green":
"red"
}">

${donation.status}

</span>

</p>

               <button class="btn btn-warning"onclick="claimDonation('${donation._id}')">Claim Food
               </button>

               <button class="btn btn-danger mt-2"onclick="deleteDonation('${donation._id}')">Delete
               </button>

            </div>

            `;

        });

        if (document.getElementById("donationList")) {

            document.getElementById("donationList").innerHTML = output;

        }

    } catch (error) {

        console.log(error);

    }

}
// Claim Donation
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

    } catch (error) {

        alert("Failed");

    }

}


// Delete Donation
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
        document.getElementById("foodName").value="";
       document.getElementById("quantity").value="";
       document.getElementById("location").value="";
       document.getElementById("expiryTime").value="";

        loadDonations();

    } catch (error) {

        alert("Delete Failed");

    }

}


// Automatically load donations
if (window.location.pathname.includes("donor-dashboard.html")) {

    loadDonations();

}
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

    } catch (error) {

        alert("Failed");

    }

}
function searchDonation()
{
    let input =
    document.getElementById("searchBox").value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    cards.forEach(card => {

        let food =
        card.innerText.toLowerCase();

        if(food.includes(input))
        {
            card.style.display = "block";
        }
        else
        {
            card.style.display = "none";
        }

    });
}
function logout()
{
    window.location.href="login.html";
}