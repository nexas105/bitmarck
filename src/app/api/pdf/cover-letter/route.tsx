import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterDocument } from "@/components/pdf/cover-letter-document";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get("lang");
  const locale = lang === "en" ? "en" : "de";

  const buffer = await renderToBuffer(
    <CoverLetterDocument locale={locale} />
  );

  const filename =
    locale === "de"
      ? "Tobias-Ludwig-Anschreiben.pdf"
      : "Tobias-Ludwig-Cover-Letter.pdf";

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
