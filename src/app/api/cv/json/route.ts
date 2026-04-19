import { getCvData } from "@/lib/pdf-data";

export async function GET() {
  const cv = getCvData();

  return Response.json(cv, {
    headers: {
      "Content-Disposition": 'attachment; filename="Tobias-Ludwig-CV.json"',
    },
  });
}
