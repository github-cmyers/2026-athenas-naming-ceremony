"use client";

import { useState, useEffect } from "react";

interface RSVP {
  id: number;
  name: string;
  plusone: number;
  phone: string;
  email: string;
  attending: boolean;
  createdat: string;
}

// Confirmation shown before an RSVP is permanently removed. Named so the
// person deleting can see exactly whose row they are about to destroy.
function DeleteConfirmDialog({
  rsvp,
  deleting,
  error,
  onCancel,
  onConfirm,
}: {
  rsvp: RSVP;
  deleting: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="delete-title" className="text-xl font-bold text-rose-700 mb-2">
          Remove this RSVP?
        </h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">{rsvp.name}</span>
          {rsvp.plusone > 0 && ` (+${rsvp.plusone})`} will be permanently
          removed from the guest list.
        </p>
        <p className="text-sm text-gray-500 mb-5">This cannot be undone.</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-lg px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            autoFocus
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<RSVP | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchRSVPs();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRSVPs() {
    setDataLoading(true);
    try {
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      setRsvps(data);
    } catch {
      console.error("Failed to fetch RSVPs");
    } finally {
      setDataLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
        fetchRSVPs();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Login failed");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setRsvps([]);
    } catch {
      console.error("Logout failed");
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/rsvp/${pendingDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error || "Failed to remove RSVP");
        return;
      }

      setRsvps((prev) => prev.filter((r) => r.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch {
      setDeleteError("Failed to remove RSVP");
    } finally {
      setDeleting(false);
    }
  }

  function closeDeleteDialog() {
    if (deleting) return;
    setPendingDelete(null);
    setDeleteError("");
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50 flex items-center justify-center">
        <div className="text-rose-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-rose-700 text-center mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent text-gray-900"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rose-700">RSVP Submissions</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {dataLoading ? (
          <div className="text-center text-rose-600">Loading RSVPs...</div>
        ) : rsvps.length === 0 ? (
          <div className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg text-center">
            <p className="text-gray-600">No RSVPs yet.</p>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rose-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Response
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Additional Guests
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-right">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-rose-50/50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            rsvp.attending
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {rsvp.attending ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.attending ? rsvp.plusone : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(rsvp.createdat)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteError("");
                            setPendingDelete(rsvp);
                          }}
                          aria-label={`Remove RSVP for ${rsvp.name}`}
                          title={`Remove RSVP for ${rsvp.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-rose-50 border-t border-rose-100">
              <p className="text-sm text-rose-700">
                Total: {rsvps.length} RSVP{rsvps.length !== 1 ? "s" : ""} |
                Attending:{" "}
                {rsvps.reduce(
                  (sum, r) => (r.attending ? sum + 1 + r.plusone : sum),
                  0
                )}{" "}
                | Declined: {rsvps.filter((r) => !r.attending).length}
              </p>
            </div>
          </div>
        )}
      </div>

      {pendingDelete && (
        <DeleteConfirmDialog
          rsvp={pendingDelete}
          deleting={deleting}
          error={deleteError}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
