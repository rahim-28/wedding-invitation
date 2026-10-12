import { useState, useEffect, useRef } from "react"
import "./App.css"
import { MapPin, CalendarDays, Pause, Play } from "lucide-react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import nikahSong from "./assets/nikah.mp3"
import "@fortawesome/fontawesome-free/css/all.min.css"

// ---------- EVENT DETAILS (edit here in future) ----------
const STORAGE_KEY = "nikah_wishes_arifin_naseeha_v2"
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

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  const [wishes, setWishes] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [showWishForm, setShowWishForm] = useState(false)
  const [wishForm, setWishForm] = useState({ name: "", message: "" })
  const [currentWishIndex, setCurrentWishIndex] = useState(0)

  const [hearts, setHearts] = useState([])

  // 🎵 MUSIC
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Load wishes (starts empty, no sample wishes)
  useEffect(() => {
    try {
      const savedWishes = localStorage.getItem(STORAGE_KEY)
      if (savedWishes) {
        setWishes(JSON.parse(savedWishes))
      }
    } catch (err) {
      setWishes([])
    }
  }, [])

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

  // Auto wish slider
  useEffect(() => {
    if (wishes.length === 0) return

    const interval = setInterval(() => {
      setCurrentWishIndex((prev) => (prev + 1) % wishes.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [wishes])

  // 🎵 Toggle music play/pause
  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // Wish submit
  const handleWishSubmit = (e) => {
    e.preventDefault()

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      alert("Please fill all fields properly.")
      return
    }

    const newWishes = [
      { name: wishForm.name.trim(), message: wishForm.message.trim() },
      ...wishes,
    ]

    setWishes(newWishes)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWishes))

    setWishForm({ name: "", message: "" })
    setShowWishForm(false)
    setCurrentWishIndex(0)

    alert("JazakAllah Khair! Your wishes have been shared. ❤️")
  }

  // OPEN SCREEN
  if (!isOpen) {
    return (
      <div className="opening-screen">
        <div className="opening-content">
          <div className="opening-bismillah">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>

          <div className="opening-title">THE SOLEMNISATION OF NIKAH</div>

          <div className="opening-names">
            Arifin
            <span className="opening-ampersand">&</span>
            Naseeha
          </div>

          <button
            className="open-button"
            onClick={() => {
              document
                .querySelector(".opening-screen")
                ?.classList.add("fade-out")

              setTimeout(() => {
                setIsOpen(true)
                setShowMain(true)

                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.volume = 0.6
                    audioRef.current.play()
                    setIsPlaying(true)
                  }
                }, 300)
              }, 900)
            }}
          >
            OPEN
          </button>
        </div>
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
        <div className="hero-arch">
          <div className="hero-content reveal">
            <div className="hero-title">THE SOLEMNISATION OF NIKAH</div>

            <div className="couple-names">
              Arifin
              <span className="couple-ampersand">&</span>
              Naseeha
            </div>

            <div className="event-date-hero">
              Sunday <br /> 27 December 2026
            </div>

            <div className="event-venue-hero">Kader Deluxe Mahal</div>
          </div>
        </div>

        {/* 🎵 Music Player */}
        <div className="music-wrapper reveal">
          <div className="music-player" onClick={toggleMusic}>
            <span className="music-icon">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </span>

            <span className="music-text">
              Halal Wedding Nasheed - Alhamdulillah
            </span>

            <span className="music-dots">•••</span>
          </div>
        </div>
        <audio ref={audioRef} src={nikahSong} loop />

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

          <div className="event-detail">
            <div className="detail-label">Date</div>
            <div className="detail-value">Sunday, 27 December 2026</div>
          </div>

          <div className="event-detail">
            <div className="detail-label">Time</div>
            <div className="detail-value">11:00 AM - 12:30 PM</div>
          </div>

          <div className="event-detail">
            <div className="detail-label">Venue</div>
            <div className="detail-value">
              Kader Deluxe Mahal <br />
              Ramanathapuram
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

        {/* Guestbook */}
        <div className="guestbook-section reveal">
          <div className="guestbook-title">Guestbook</div>

          {wishes.length === 0 ? (
            <div className="wish-preview">
              <div className="wish-slide">
                <div className="wish-message-preview">
                  Be the first to share your duas and wishes for the couple.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="wish-preview">
                <div key={currentWishIndex} className="wish-slide">
                  <div className="wish-message-preview">
                    {wishes[currentWishIndex].message}
                  </div>
                  <div className="wish-author-preview">
                    -{wishes[currentWishIndex].name}-
                  </div>
                </div>
              </div>

              <div className="dot-separator">
                {wishes.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${
                      i === currentWishIndex ? "active-dot" : ""
                    }`}
                    onClick={() => setCurrentWishIndex(i)}
                  ></span>
                ))}
              </div>
            </>
          )}

          <button className="wish-button" onClick={() => setShowWishForm(true)}>
            <span>✎</span>
            <span>Wish</span>
          </button>

          {wishes.length > 0 && (
            <div className="wishes-list">
              {wishes.map((wish, i) => (
                <div key={i} className="wish-item">
                  <div className="wish-message">{wish.message}</div>
                  <div className="wish-author">-{wish.name}-</div>
                </div>
              ))}
            </div>
          )}
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

      {showWishForm && (
        <WishModal
          form={wishForm}
          setForm={setWishForm}
          onSubmit={handleWishSubmit}
          onClose={() => setShowWishForm(false)}
        />
      )}
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

// Wish Modal
const WishModal = ({ form, setForm, onSubmit, onClose }) => (
  <div className="modal active" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>

      <div className="modal-title">Share Your Wishes</div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Message *</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            placeholder="Barakallahu feekum..."
          />
        </div>

        <button type="submit" className="submit-button">
          Send Wishes
        </button>
      </form>
    </div>
  </div>
)

export default App