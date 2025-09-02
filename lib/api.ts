// lib/api.ts
export async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    credentials: "include", // needed for auth cookies
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "API Error")
  return data
}

export const getUserDonations = async () => {
  return fetcher("/api/donations")
}

export const getProjects = async () => {
  return fetcher("/api/projects")
}

export const getImpact = async () => {
  return fetcher("/api/impact?type=donor")
}
