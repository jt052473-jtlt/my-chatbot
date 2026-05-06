// summaryBuilder2.js

export function buildSummary(responses, lang) {
  let summary = "";
  responses.forEach((r, i) => {
    summary += `Q${i + 1}: ${r}\n`;
  });
  return summary;
}
