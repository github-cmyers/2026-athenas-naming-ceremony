"use client";

import { useState, useEffect } from "react";

interface RSVP {
  Id: number;
  Name: string;
  PlusOne: number;
  Phone: string;
  Email: string;
  CreatedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

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
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.Id} className="hover:bg-rose-50/50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.Name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.PlusOne}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.Phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rsvp.Email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(rsvp.CreatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-rose-50 border-t border-rose-100">
              <p className="text-sm text-rose-700">
                Total: {rsvps.length} RSVP{rsvps.length !== 1 ? "s" : ""} |
                Total Guests:{" "}
                {rsvps.reduce((sum, r) => sum + 1 + r.PlusOne, 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
