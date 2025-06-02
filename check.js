// Vidco About Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  function initMobileNavigation() {
    const header = document.querySelector("header")
    const nav = document.querySelector("nav")

    // Create mobile menu button if it doesn't exist
    let mobileToggle = document.querySelector(".mobile-nav-toggle")
    if (!mobileToggle) {
      mobileToggle = document.createElement("button")
      mobileToggle.className = "mobile-nav-toggle"
      mobileToggle.innerHTML = "☰"
      mobileToggle.setAttribute("aria-label", "Toggle navigation")
      header.appendChild(mobileToggle)
    }

    // Toggle mobile menu
    mobileToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-open")
      this.classList.toggle("active")

      // Change icon
      this.innerHTML = nav.classList.contains("nav-open") ? "✕" : "☰"
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove("nav-open")
        mobileToggle.classList.remove("active")
        mobileToggle.innerHTML = "☰"
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        nav.classList.remove("nav-open")
        mobileToggle.classList.remove("active")
        mobileToggle.innerHTML = "☰"
      }
    })
  }

  // Testimonials Carousel
  let isReversed = false
  let isPaused = false
  let currentSpeed = 20
  const testimonialCards = document.getElementById("testimonialCards")

  window.togglePause = () => {
    const pauseDot = document.querySelector(".pause-dot")
    isPaused = !isPaused

    if (isPaused) {
      testimonialCards.style.animationPlayState = "paused"
      pauseDot.classList.add("active")
    } else {
      testimonialCards.style.animationPlayState = "running"
      pauseDot.classList.remove("active")
    }
  }

  window.reverseDirection = () => {
    const reverseDot = document.querySelector(".reverse-dot")
    isReversed = !isReversed

    if (isReversed) {
      testimonialCards.style.animationDirection = "reverse"
      reverseDot.classList.add("active")
    } else {
      testimonialCards.style.animationDirection = "normal"
      reverseDot.classList.remove("active")
    }
  }

  window.changeSpeed = (speed) => {
    // Remove active class from all speed dots
    document.querySelectorAll(".speed-dot").forEach((dot) => {
      dot.classList.remove("active")
    })

    // Add active class to clicked dot
    event.target.classList.add("active")

    // Update animation duration
    currentSpeed = speed
    testimonialCards.style.animationDuration = `${speed}s`
  }

  // Initialize with normal speed
  if (testimonialCards) {
    testimonialCards.style.animationDuration = `${currentSpeed}s`

    // Optional: Auto-pause on hover
    testimonialCards.addEventListener("mouseenter", () => {
      if (!isPaused) {
        testimonialCards.style.animationPlayState = "paused"
      }
    })

    testimonialCards.addEventListener("mouseleave", () => {
      if (!isPaused) {
        testimonialCards.style.animationPlayState = "running"
      }
    })
  }

  // Sign Up Button Interaction
  function initSignUpButton() {
    const signUpBtn = document.querySelector(".sign-up-btn")

    if (signUpBtn) {
      signUpBtn.addEventListener("click", function (e) {
        e.preventDefault()

        // Add loading state
        const originalText = this.textContent
        this.style.pointerEvents = "none"
        this.textContent = "Loading..."
        this.style.opacity = "0.7"

        // Simulate API call
        setTimeout(() => {
          // Reset button
          this.style.pointerEvents = "auto"
          this.textContent = originalText
          this.style.opacity = "1"

          // Show success feedback
          showNotification("Thank you for your interest! Redirecting to sign up page...")

          // Redirect after delay
          setTimeout(() => {
            console.log("Would redirect to signup page")
          }, 1500)
        }, 2000)
      })
    }
  }

  // Smooth Scrolling for Navigation Links
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href")

        if (href === "#") {
          e.preventDefault()
          return
        }

        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()

          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }

        // Close mobile menu if open
        const nav = document.querySelector("nav")
        const mobileToggle = document.querySelector(".mobile-nav-toggle")
        if (nav && nav.classList.contains("nav-open")) {
          nav.classList.remove("nav-open")
          if (mobileToggle) {
            mobileToggle.classList.remove("active")
            mobileToggle.innerHTML = "☰"
          }
        }
      })
    })
  }

  // Notification System
  function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector(".notification")
    if (existing) {
      existing.remove()
    }

    // Create notification
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #9b4dca;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            line-height: 1.4;
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Auto remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }, 3000)
  }

  // Initialize all functionality
  function init() {
    initMobileNavigation()
    initSignUpButton()
    initSmoothScrolling()

    console.log("Vidco About Page JavaScript initialized successfully!")
  }

  // Start the application
  init()

  // Expose notification function globally
  window.showNotification = showNotification
})

// Utility Functions
const VidcoUtils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function for scroll events
  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
}

// Add mobile navigation styles dynamically
const mobileNavStyles = `
    .mobile-nav-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 5px;
        color: #9b4dca;
    }
    
    @media (max-width: 768px) {
        .mobile-nav-toggle {
            display: block;
        }
        
        nav ul {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            margin: 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            margin-left: 0 !important;
        }
        
        nav ul.nav-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        nav ul li {
            margin: 10px 0;
        }
        
        header {
            position: relative;
        }
    }
`

// Inject mobile styles
const styleSheet = document.createElement("style")
styleSheet.textContent = mobileNavStyles
document.head.appendChild(styleSheet)
