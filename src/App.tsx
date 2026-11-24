import { useEffect, useState } from "react";
import { searchUsers } from "./api/mockUsers";
import { User } from "./types";

export function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);

    searchUsers(query)
      .then((users) => {
        setResults(users);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage("Could not load users. Please try again.");
        setLoading(false);
      });
  }, [query]);

  function handleSelectUser(user: User) {
    const exists = selectedUsers.some((u) => u.id === user.id);
    if (!exists) {
      setSelectedUsers([...selectedUsers, user]);
    }
  }

  function handleRemoveUser(userId: string) {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h3>Team Member Picker</h3>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, role, or team..."
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 12,
          outline: "none",
        }}
      />

      <div style={{ marginBottom: 16 }}>
        <span>Selected ({selectedUsers.length}): </span>
        {selectedUsers.length === 0 ? (
          <span>None</span>
        ) : (
          selectedUsers.map((user) => (
            <span
              key={user.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                marginRight: 6,
                marginBottom: 6,
                background: "#eef6ff",
                borderRadius: 4,
              }}
            >
              <span>{user.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveUser(user.id)}
                style={{ cursor: "pointer" }}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      {loading && <p>Loading team members...</p>}
      {errorMessage && <p style={{ color: "#b91c1c" }}>{errorMessage}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id);
          return (
            <li
              key={user.id}
              onClick={() => handleSelectUser(user)}
              style={{
                padding: 10,
                border: "1px solid #ddd",
                marginBottom: 6,
                cursor: "pointer",
                background: isSelected ? "#eef6ff" : "#fff",
              }}
            >
              <div>
                <strong>{user.name}</strong> — {user.role}
              </div>
              <small style={{ color: "#555" }}>Team: {user.team}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;