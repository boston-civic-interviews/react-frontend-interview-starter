import { User } from "../types";

const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Rivera", role: "Staff Engineer", team: "Core Platform" },
  { id: "2", name: "Alan Chen", role: "Product Designer", team: "Design Systems" },
  { id: "3", name: "Alicia Patel", role: "Frontend Engineer", team: "Checkout" },
  { id: "4", name: "Bobbie Brooks", role: "Backend Engineer", team: "Payments" },
  { id: "5", name: "Carla Gomez", role: "Engineering Manager", team: "Search" },
  { id: "6", name: "David Kim", role: "Data Engineer", team: "Analytics" },
  { id: "7", name: "Elena Novak", role: "Security Engineer", team: "Identity" },
  { id: "8", name: "Frankie Wu", role: "QA Lead", team: "Release Eng" },
  { id: "9", name: "Grace Hopper", role: "Principal Architect", team: "Compilers" },
  { id: "10", name: "Hector Diaz", role: "Frontend Engineer", team: "Search" },
];

export async function searchUsers(
  query: string,
  _signal?: AbortSignal
): Promise<User[]> {
  const delayMs = Math.floor(Math.random() * 950) + 150;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("503 Upstream search service unavailable"));
        return;
      }

      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        resolve(MOCK_USERS.slice(0, 5));
        return;
      }

      const matches = MOCK_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(normalized) ||
          u.role.toLowerCase().includes(normalized) ||
          u.team.toLowerCase().includes(normalized)
      );
      resolve(matches);
    }, delayMs);
  });
}