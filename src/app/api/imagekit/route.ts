import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

// Função helper para adicionar CORS
function withCORS(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // ou seu domínio específico
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// Endpoint GET
export async function GET() {
  const data = imagekit.getAuthenticationParameters();
  const res = NextResponse.json(data);
  return withCORS(res);
}

// Endpoint OPTIONS (preflight)
export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}
