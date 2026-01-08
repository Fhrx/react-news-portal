import { Link } from "react-router-dom";

export default function GuestBanner() {
  return (
    <div className="border border-blue-200 bg-blue-50 text-blue-900 rounded-md p-4 text-sm">
      <p>
        You&apos;re browsing as a <strong>Guest</strong>. Pages you view in this
        mode won&apos;t allow actions like creating or editing news, and no data
        will be saved after you leave.
        {" "}
        <Link
          to="/learn-more"
          className="underline font-medium hover:text-blue-700"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}