const app = document.getElementById("app")

// Create main section container
const section = document.createElement("section")
section.className = "team-section"

// Title
const heading = document.createElement("h1")
heading.textContent = "One Team Many Talents"

// Subtitle
const subheading = document.createElement("p")
subheading.className = "subtitle"
subheading.textContent =
"Our trusted development team delivers innovative, high-quality solutions with creativity and precision."

// Team data
const team = [
  {
    name: "O.J Itoro",
    role: "Frontend developer",
    image: "itoro.jpg",
  },
  {
    name: "I.Iyanu",
    role: "Software developer and Content Creator",
    image: "WhatsApp Image 2025-06-01 at 13.56.41_3164baae.jpg",
  },
  {
    name: "Isaac G. Umoh",
    role: "Frontend developer and Musical Instrumentalists",
    image: "B.ISAAC.jpg",
  },
]

// Create team container
const container = document.createElement("div")
container.className = "team-container"

// Create each profile card
team.forEach((member) => {
  const card = document.createElement("div")
  card.className = "team-card"

  const img = document.createElement("img")
  img.src = member.image
  img.alt = `${member.name} photo`

  const name = document.createElement("h3")
  name.textContent = member.name

  const role = document.createElement("p")
  role.textContent = member.role

  card.appendChild(img)
  card.appendChild(name)
  card.appendChild(role)
  container.appendChild(card)
})

// Append all elements
section.appendChild(heading)
section.appendChild(subheading)
section.appendChild(container)
app.appendChild(section)
