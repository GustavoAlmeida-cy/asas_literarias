import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  const data = imagekit.getAuthenticationParameters();

  // Criar resposta com CORS
  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // ou seu domínio específico
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Para lidar com preflight requests (OPTIONS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // ou seu domínio específico
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
