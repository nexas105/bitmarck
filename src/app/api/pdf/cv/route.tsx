import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "@/components/pdf/cv-document";

export async function GET() {
  const buffer = await renderToBuffer(<CvDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Tobias-Ludwig-CV.pdf"',
    },
  });
}
