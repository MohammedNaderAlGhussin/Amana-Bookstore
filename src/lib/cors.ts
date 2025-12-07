// src/lib/cors.ts
export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // allow all origins (or replace with specific domain)
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
