import { useState, useEffect } from "react"
import "./App.css"
import { MapPin, CalendarDays, Clock } from "lucide-react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

// ---------- EVENT DETAILS (edit here in future) ----------
const EVENT = {
  title: "Nikah of Arifin & Naseeha",
  venueName: "Kader Deluxe Mahal",
  venueArea: "Ramanathapuram",
  startISO: "2026-12-27T11:00:00",
  startCal: "20261227T110000",
  endCal: "20261227T123000",
}
const MAP_QUERY = "Kader Deluxe Mahal Ramanathapuram"

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMain, setShowMain] = useState(false)

  // Envelope opening states
  const [envOpening, setEnvOpening] = useState(false)
  const [envLeaving, setEnvLeaving] = useState(false)

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  const [hearts, setHearts] = useState([])

  // Countdown
  useEffect(() => {
    const weddingDate = new Date(EVENT.startISO).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance < 0) {
        clearInterval(timer)
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          } else {
            entry.target.classList.remove("active")
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [showMain])

  // Generate hearts
  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 8,
      size: 10 + Math.random() * 10,
    }))

    setHearts(generated)
  }, [])

  // ✉️ Envelope tap
  const handleEnvelopeOpen = () => {
    if (envOpening) return
    setEnvOpening(true) // flap opens, card rises

    setTimeout(() => setEnvLeaving(true), 1500) // screen fades out

    setTimeout(() => {
      setIsOpen(true)
      setShowMain(true)
    }, 2400)
  }

  // OPEN SCREEN (envelope)
  if (!isOpen) {
    return (
      <div
        className={`envelope-screen ${envLeaving ? "fade-out" : ""}`}
        onClick={handleEnvelopeOpen}
      >
        <div className="env-bismillah">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        <div className={`env ${envOpening ? "open" : ""}`}>
          <div className="env-back"></div>

          <div className="env-card">
            <span className="env-card-small">THE SOLEMNISATION OF NIKAH</span>
            <span className="env-card-names">Arifin &amp; Naseeha</span>
          </div>

          <div className="env-front"></div>
          <div className="env-flap"></div>
          <div className="env-seal">A&amp;N</div>
        </div>

        <div className="env-label">YOU ARE INVITED</div>
        <div className="env-names">Arifin &amp; Naseeha</div>
        <div className="env-date">
          The Solemnisation of Nikah · 27 December 2026
        </div>
        <div className="env-tap">TAP TO OPEN</div>
      </div>
    )
  }

  return (
    <div className={`main-content ${showMain ? "visible" : ""}`}>
      {/* Hearts Layer */}
      <div className="fixed-heart-layer">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="fixed-heart"
            style={{
              left: `${h.left}%`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              fontSize: `${h.size}px`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <div className="main-card">
        {/* Hero Section */}
        {/* Hero Section */}
<div className="hero-arch">
  <div className="hero-content reveal">
    {/* Islamic decoration */}
    <div className="hero-decor">
      {/* left lantern */}
      <svg className="lantern lantern-left" viewBox="0 0 40 80" width="38" height="76" fill="none">
        <line x1="20" y1="0" x2="20" y2="16" stroke="#b88968" strokeWidth="1.2" />
        <path d="M11 24 L20 15 L29 24 Z" fill="#c9a27e" />
        <path d="M11 24 H29 L32 46 Q32 54 20 60 Q8 54 8 46 Z" fill="rgba(201,162,126,0.22)" stroke="#b88968" strokeWidth="1.2" />
        <line x1="15" y1="24" x2="14" y2="56" stroke="#b88968" strokeWidth="0.8" />
        <line x1="25" y1="24" x2="26" y2="56" stroke="#b88968" strokeWidth="0.8" />
        <circle cx="20" cy="42" r="4" fill="#f1d9a0" />
        <path d="M15 60 H25 L20 68 Z" fill="#b88968" />
      </svg>

      {/* crescent and star */}
      {/* crescent */}
<svg className="crescent" viewBox="0 0 64 64" width="54" height="54" fill="none">
  <path
    d="M44 6 A26 26 0 1 0 44 58 A20 20 0 1 1 44 6 Z"
    fill="#b88968"
  />
</svg>

      {/* right lantern */}
      <svg className="lantern lantern-right" viewBox="0 0 40 80" width="38" height="76" fill="none">
        <line x1="20" y1="0" x2="20" y2="16" stroke="#b88968" strokeWidth="1.2" />
        <path d="M11 24 L20 15 L29 24 Z" fill="#c9a27e" />
        <path d="M11 24 H29 L32 46 Q32 54 20 60 Q8 54 8 46 Z" fill="rgba(201,162,126,0.22)" stroke="#b88968" strokeWidth="1.2" />
        <line x1="15" y1="24" x2="14" y2="56" stroke="#b88968" strokeWidth="0.8" />
        <line x1="25" y1="24" x2="26" y2="56" stroke="#b88968" strokeWidth="0.8" />
        <circle cx="20" cy="42" r="4" fill="#f1d9a0" />
        <path d="M15 60 H25 L20 68 Z" fill="#b88968" />
      </svg>
    </div>

    <div className="hero-title">THE SOLEMNISATION OF NIKAH</div>

    <div className="couple-names">
      Arifin
      <span className="couple-ampersand">&</span>
      Naseeha
    </div>

    <div className="hero-ornament">
      <span></span>
      <i></i>
      <span></span>
    </div>

    <div className="event-date-hero">
      Sunday <br /> 27 December 2026
    </div>

    <div className="event-venue-hero">Kader Deluxe Mahal</div>
  </div>
</div>

        {/* Content Section */}
        <div className="content-section reveal">
          <div className="greeting">
            Assalāmu 'Alaikum wa Rahmatullāhi wa Barakātuh
          </div>

          <div className="family-section">
            <div className="family-title">Groom's Family</div>
            <div className="parent-name">Barakath Ali</div>
            <div className="name-divider"></div>
            <div className="parent-name">Thahjibunnisha</div>
          </div>

          <div
            style={{
              textAlign: "center",
              margin: "25px 0",
              fontSize: "24px",
              color: "#b88968",
            }}
          >
            &
          </div>

          <div className="family-section">
            <div className="family-title">Bride's Family</div>
            <div className="parent-name">Naleem Ahmed</div>
            <div className="name-divider"></div>
            <div className="parent-name">Ayisha</div>
          </div>

          <div className="invitation-text">
            With utmost gratitude to Allah the Almighty,
            <br />
            we cordially invite you to the Nikah ceremony
          </div>

          <div className="bride-groom-names">Arifin & Naseeha</div>

          {/* Date / Time / Venue cards */}
          <div className="detail-cards">
            <div className="detail-card">
              <CalendarDays
                size={34}
                strokeWidth={1.3}
                className="detail-card-icon"
              />
              <div className="detail-card-label">DATE</div>
              <div className="detail-card-value">
                27th <br /> December
              </div>
              <div className="detail-card-sub">Sunday · 2026</div>
            </div>

            <div className="detail-card detail-card-highlight">
              <Clock size={34} strokeWidth={1.3} className="detail-card-icon" />
              <div className="detail-card-label">TIME</div>
              <div className="detail-card-value">11:00 AM</div>
              <div className="detail-card-sub">to 12:30 PM</div>
            </div>

            <div className="detail-card">
              <MapPin
                size={34}
                strokeWidth={1.3}
                className="detail-card-icon"
              />
              <div className="detail-card-label">VENUE</div>
              <div className="detail-card-value">
                Kader Deluxe <br /> Mahal
              </div>
              <div className="detail-card-sub">Ramanathapuram</div>
            </div>
          </div>

          <div className="invitation-text" style={{ marginTop: "30px" }}>
            May the presence and prayers of our honoured guests further grace and
            bless the Nikah ceremony
          </div>
        </div>

        <div className="decorative-divider"></div>

        {/* Countdown */}
        <div className="countdown-section reveal">
          <div className="countdown-title">Counting Days</div>

          <div className="countdown-display">
            <CountdownUnit label="Days" value={countdown.days} />
            <div className="countdown-separator">:</div>
            <CountdownUnit label="Hours" value={countdown.hours} />
            <div className="countdown-separator">:</div>
            <CountdownUnit label="Minutes" value={countdown.minutes} />
            <div className="countdown-separator">:</div>
            <CountdownUnit label="Seconds" value={countdown.seconds} />
          </div>
        </div>

        <div className="decorative-divider"></div>

        {/* Islamic Blessing */}
        <div className="blessing-section reveal">
          <div className="blessing-title">Barakallahu Lakuma</div>

          <div className="blessing-arabic" dir="rtl">
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </div>

          <div className="blessing-translit">
            Bārakallāhu laka wa bāraka ʿalayka wa jamaʿa baynakumā fī khayr
          </div>

          <div className="blessing-divider">
            <span></span>
            <i></i>
            <span></span>
          </div>

          <div className="blessing-meaning">
            “May Allah bless you, shower His blessings upon you, and unite you
            both in goodness.”
          </div>

          <div className="blessing-explain">
            <div className="blessing-explain-title">What does it mean?</div>
            <p>
              <strong>Barakah</strong> means divine blessing: goodness that grows,
              lasts, and brings peace to a home. When we say{" "}
              <em>Barakallahu lakuma</em>, we ask Allah to place that blessing in
              the marriage, in the home, and in the hearts of the couple.
            </p>
            <p>
              This is the dua taught by the Prophet ﷺ for a newly married
              couple, and it is reported in Sunan Abi Dawud and Jami‘ at-Tirmidhi.
              We would be honoured if you made this dua for us.
            </p>
          </div>
        </div>

        <div className="decorative-divider"></div>

        {/* Prayer */}
        <div className="prayer-section reveal">
          <div className="prayer-frame">
            <div className="prayer-corner top-left">🌸</div>
            <div className="prayer-corner top-right">🌸</div>
            <div className="prayer-corner bottom-left">🌸</div>
            <div className="prayer-corner bottom-right">🌸</div>

            <div className="prayer-text">
              O Allah, bless this wedding, shower Your barakah and mercy upon the
              bride and groom, grant them righteous sons and daughters, preserve
              their union in this world and the Hereafter, and perfect their
              religion through the blessings of this noble bond.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer reveal">
          <div className="hashtag">#Arifin❤️Naseeha</div>

          <div className="credits">
            Created by <br />
            <strong style={{ color: "#7c3aed" }}>Rahim</strong>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => setShowLocation(true)}>
          <MapPin size={26} className="nav-icon-svg" />
          <div className="nav-label">Location</div>
        </div>

        <div className="nav-item" onClick={() => setShowCalendar(true)}>
          <CalendarDays size={26} className="nav-icon-svg" />
          <div className="nav-label">Calendar</div>
        </div>
      </div>

      {/* Modals */}
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      {showLocation && <LocationModal onClose={() => setShowLocation(false)} />}
    </div>
  )
}

// Countdown Component
const CountdownUnit = ({ label, value }) => (
  <div className="countdown-unit">
    <div className="countdown-label">{label}</div>
    <div className="countdown-digits">
      <div className="countdown-digit">{value[0]}</div>
      <div className="countdown-digit">{value[1]}</div>
    </div>
  </div>
)

// Calendar Modal
const CalendarModal = ({ onClose }) => {
  const nikahDate = new Date(2026, 11, 27) // month is 0-based: 11 = December

  const locationText = `${EVENT.venueName}, ${EVENT.venueArea}`

  const addToGoogleCalendar = () => {
    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(EVENT.title)}` +
      `&dates=${EVENT.startCal}/${EVENT.endCal}` +
      `&details=${encodeURIComponent("You are cordially invited to the Nikah ceremony.")}` +
      `&location=${encodeURIComponent(locationText)}`
    window.open(url, "_blank")
  }

  const addToAppleCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nikah Invitation//EN",
      "BEGIN:VEVENT",
      `UID:nikah-arifin-naseeha-${EVENT.startCal}@invitation`,
      `DTSTAMP:${EVENT.startCal}`,
      `DTSTART:${EVENT.startCal}`,
      `DTEND:${EVENT.endCal}`,
      `SUMMARY:${EVENT.title}`,
      `LOCATION:${locationText}`,
      "DESCRIPTION:You are cordially invited to the Nikah ceremony.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "nikah-invitation.ics"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-title">Calendar</div>
        <div className="calendar-date">Sunday, 27 December 2026</div>

        <Calendar
          value={nikahDate}
          tileClassName={({ date }) =>
            date.toDateString() === nikahDate.toDateString()
              ? "nikah-day"
              : null
          }
        />

        <div className="calendar-buttons">
          <button className="calendar-button" onClick={addToAppleCalendar}>
            <i className="fa-brands fa-apple"></i>
            Add to Apple Calendar
          </button>

          <button className="calendar-button" onClick={addToGoogleCalendar}>
            <i className="fa-brands fa-google"></i>
            Add to Google Calendar
          </button>
        </div>
      </div>
    </div>
  )
}

// Location Modal
const LocationModal = ({ onClose }) => (
  <div className="modal active" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>

      <div className="modal-title">Location</div>

      <div className="location-venue">
        Kader Deluxe Mahal <br />
        Ramanathapuram
      </div>

      <div className="map-container">
        <iframe
          title="Nikah Location Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            MAP_QUERY
          )}&output=embed`}
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="location-buttons">
        <button
          className="location-button"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/${encodeURIComponent(
                MAP_QUERY
              )}`,
              "_blank"
            )
          }
        >
          🗺️ Google Maps
        </button>

        <button
          className="location-button"
          onClick={() =>
            window.open(
              `https://waze.com/ul?q=${encodeURIComponent(MAP_QUERY)}`,
              "_blank"
            )
          }
        >
          🚗 Waze
        </button>
      </div>
    </div>
  </div>
)

export default App