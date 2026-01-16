import { useEffect, useState } from "react";
import { FadeIn } from "../../components/FadeIn";
import registerImg from "../../assets/register.jpg";
import RegistrationAlert from "./alert";

const CANADA_TZ = "America/Toronto";

function daysUntilCanada(dateString) {
  const now = new Date();

  const canadaTodayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: CANADA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const [ty, tm, td] = canadaTodayStr.split("-").map(Number);
  const canadaToday = new Date(ty, tm - 1, td);

  const [y, m, d] = dateString.split("-").map(Number);
  const target = new Date(y, m - 1, d);

  const diffMs = target.getTime() - canadaToday.getTime();
  return Math.max(0, Math.ceil(diffMs / 86400000));
}

export default function Register() {
  const [showAlert, setShowAlert] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("earlyRegAlertShown")) return;
    sessionStorage.setItem("earlyRegAlertShown", "true");

    const startDate = "2026-06-26"; // change date here
    const days = daysUntilCanada(startDate);

    setDaysLeft(days);
    setShowAlert(true);
  }, []);

  return (
    <>
      {showAlert && (
        <RegistrationAlert
          daysLeft={daysLeft}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={registerImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Registration Information
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Important dates and details for registering for NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="text-xl font-medium text-black/70">
              Registration Dates
            </h2>

            <div className="h-px w-16 bg-black/20 mt-2 mb-4"></div>

            <p className="text-base text-black/60">
              <strong>Early:</strong><br />
              <strong>Regular:</strong><br />
              <strong>Late:</strong>
            </p>
          </div>
        </FadeIn>
      </main>
    </>
  );
}
