import { getCvData } from "@/lib/pdf-data";

function formatDate(d: string): string {
  if (d === "heute" || d === "present") return "present";
  return d;
}

export async function GET() {
  const cv = getCvData();
  const { contact } = cv.personalInformation;

  const lines: string[] = [
    `# ${cv.personalInformation.name}`,
    `## Business Analyst IAM — Candidate Profile`,
    ``,
    `Contact: ${contact.email} | ${contact.phone} | ${contact.website} | ${contact.github}`,
    `Location: ${cv.personalInformation.address.city}, ${cv.personalInformation.address.country}`,
    `Nationality: ${cv.personalInformation.nationality}`,
    ``,
    `## Profile`,
    cv.profile.summary,
    ``,
    `Key Strengths: ${cv.profile.strengths.join(", ")}`,
    ``,
    `## Technical Skills`,
    ...Object.entries(cv.technicalSkills).map(
      ([group, skills]) => `- ${group}: ${(skills as string[]).join(", ")}`
    ),
    ``,
    `## Professional Experience (${cv.professionalExperience.length} positions)`,
    ``,
    ...cv.professionalExperience.flatMap((exp) => [
      `### ${exp.role} | ${exp.company}${exp.location ? `, ${exp.location}` : ""}`,
      `Period: ${formatDate(exp.start)} — ${formatDate(exp.end)}`,
      ...exp.details.map((d) => `- ${d}`),
      ``,
    ]),
    `## Education`,
    ...cv.education.map(
      (edu) =>
        `- ${edu.degree} — ${edu.institution} (${formatDate(edu.start)} — ${formatDate(edu.end)})`
    ),
    ``,
    `## Certifications (${cv.certifications.length})`,
    cv.certifications.join(", "),
    ``,
    `## Projects (${cv.projects.length})`,
    ...cv.projects.flatMap((proj) => [
      `- **${proj.name}** (${proj.type}): ${proj.details.join("; ")}`,
    ]),
    ``,
    `## Languages`,
    ...Object.entries(cv.spokenLanguages).map(
      ([lang, level]) => `- ${lang}: ${level}`
    ),
    ``,
    `## Volunteering`,
    ...cv.volunteering.flatMap((vol) => [
      `- ${vol.role} @ ${vol.organization}: ${vol.details.join("; ")}`,
    ]),
    ``,
    `---`,
    `Generated: ${new Date().toISOString().split("T")[0]}`,
    `Format: LLM-optimized plain text (structured for AI parsing)`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="Tobias-Ludwig-CV-LLM.txt"',
    },
  });
}
