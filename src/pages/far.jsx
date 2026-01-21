import { Navigate } from "react-router-dom"

export default function FarRedirect() {
  // Keep `far` as a separate route but redirect users to the About page
  return <Navigate to="/about" replace />
}
