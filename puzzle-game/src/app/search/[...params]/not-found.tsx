import ErrorPage from "@/components/ErrorPage";

export default function NotFound() {
  return <ErrorPage status={404} message="Iskana vsebina ne obstaja." />;
}