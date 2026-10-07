import { POWER_VERBS } from "../constants/initialData";

const WEAK_VERBS = [
  "worked", "helped", "assisted", "responsible for", "handled", "participated",
  "involved in", "did", "tasked with", "supported", "contributed to"
];

export function calculateAtsScore(data) {
  const auditList = [];
  let score = 0;

  // 1. Personal & Contact Completeness (20 pts)
  const contact = data.personalInfo || {};
  let contactPoints = 0;
  if (contact.fullName && contact.fullName.trim().length > 2) contactPoints += 5;
  if (contact.email && contact.email.includes("@")) contactPoints += 5;
  if (contact.phone && contact.phone.trim().length > 6) contactPoints += 4;
  if (contact.location && contact.location.trim().length > 2) contactPoints += 3;
  if (contact.linkedin || contact.github || contact.website) contactPoints += 3;

  score += contactPoints;
  auditList.push({
    category: "Contact Details",
    title: "Essential Contact Info",
    status: contactPoints >= 17 ? "pass" : "warning",
    detail: contactPoints >= 17 
      ? "Full name, email, phone number, location, and GitHub or LinkedIn links are present."
      : "Make sure your phone number, city, and GitHub/LinkedIn profiles are filled in."
  });

  // 2. Summary / Objective (15 pts)
  const summary = data.summary || "";
  const summaryWordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWordCount >= 20 && summaryWordCount <= 90) {
    score += 15;
    auditList.push({
      category: "Profile Summary",
      title: "Clear Student Objective",
      status: "pass",
      detail: `Good summary length (${summaryWordCount} words). Highlights your BSc.IT focus and career interests.`
    });
  } else if (summaryWordCount > 0) {
    score += 8;
    auditList.push({
      category: "Profile Summary",
      title: "Summary Length Check",
      status: "warning",
      detail: `Summary has ${summaryWordCount} words. Try keeping it between 25 and 75 words for quick reading.`
    });
  } else {
    auditList.push({
      category: "Profile Summary",
      title: "Add a Short Summary",
      status: "fail",
      detail: "Add a 2-3 sentence introduction stating your BSc.IT focus and what you are looking to learn or build."
    });
  }

  // 3. Projects & Experience Impact (25 pts)
  // Gather bullets from both experience AND college projects (crucial for students!)
  const allBullets = [];
  (data.experience || []).forEach(exp => {
    (exp.bullets || []).forEach(b => {
      if (b && b.trim()) allBullets.push(b.trim());
    });
  });
  (data.projects || []).forEach(proj => {
    (proj.bullets || []).forEach(b => {
      if (b && b.trim()) allBullets.push(b.trim());
    });
  });

  const metricRegex = /(\d+(\.\d+)?%|\$\d+|\d+x|\d+\s*(ms|s|FPS|users|students|classmates|records|pages|colleges|participants|hours|days|weeks|months|years|stars|marks|SGPA)|\b\d{2,}\b)/;
  const bulletsWithMetrics = allBullets.filter(b => metricRegex.test(b));
  const metricRatio = allBullets.length > 0 ? (bulletsWithMetrics.length / allBullets.length) : 0;

  if (metricRatio >= 0.5) {
    score += 25;
    auditList.push({
      category: "Project & Work Impact",
      title: "Quantified Results",
      status: "pass",
      detail: `${bulletsWithMetrics.length} of ${allBullets.length} bullet points (${Math.round(metricRatio * 100)}%) include numbers (like 150+ students, 3 seconds, or 96 score).`
    });
  } else if (metricRatio >= 0.25) {
    score += 15;
    auditList.push({
      category: "Project & Work Impact",
      title: "Add More Numbers to Bullets",
      status: "warning",
      detail: `${bulletsWithMetrics.length} of ${allBullets.length} bullets have numbers. Try mentioning project scale (e.g., 'Tested across 100+ records' or 'Handled 250+ participants').`
    });
  } else {
    score += 5;
    auditList.push({
      category: "Project & Work Impact",
      title: "Include Specific Numbers",
      status: "fail",
      detail: "Add numbers or outcomes to your project bullets to prove your work (e.g., marks, users, or speed improvements)."
    });
  }

  // 4. Action Verbs (20 pts)
  let strongVerbCount = 0;
  let weakVerbCount = 0;

  allBullets.forEach(bullet => {
    const firstWord = bullet.split(/\s+/)[0]?.replace(/[^a-zA-Z]/g, "") || "";
    if (POWER_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase())) {
      strongVerbCount++;
    }
    if (WEAK_VERBS.some(w => bullet.toLowerCase().startsWith(w))) {
      weakVerbCount++;
    }
  });

  if (strongVerbCount >= 3 && weakVerbCount === 0) {
    score += 20;
    auditList.push({
      category: "Action Verbs",
      title: "Active Action Verbs",
      status: "pass",
      detail: `${strongVerbCount} bullets start with solid verbs like 'Built', 'Developed', or 'Created'.`
    });
  } else if (strongVerbCount > 0) {
    score += 12;
    auditList.push({
      category: "Action Verbs",
      title: "Improve Starting Verbs",
      status: "warning",
      detail: `${strongVerbCount} power verbs found. Try replacing passive words like 'worked on' with 'Developed' or 'Implemented'.`
    });
  } else {
    score += 5;
    auditList.push({
      category: "Action Verbs",
      title: "Use Active Verbs",
      status: "fail",
      detail: "Begin each project or work bullet with a strong action verb (e.g. 'Programmed', 'Built', 'Designed')."
    });
  }

  // 5. Skills Section (10 pts)
  const skillsCount = (data.skills || []).reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
  if (skillsCount >= 8) {
    score += 10;
    auditList.push({
      category: "Technical Skills",
      title: "Well-Organized Skills",
      status: "pass",
      detail: `${skillsCount} skills listed across categories (programming, web technologies, and tools).`
    });
  } else if (skillsCount >= 4) {
    score += 6;
    auditList.push({
      category: "Technical Skills",
      title: "Add More Skills",
      status: "warning",
      detail: `${skillsCount} skills listed. Add key tools you know (like Git, VS Code, C++, or MySQL).`
    });
  } else {
    auditList.push({
      category: "Technical Skills",
      title: "Skills Section Too Short",
      status: "fail",
      detail: "List your programming languages, web tools, and databases."
    });
  }

  // 6. Anti-Slop Rule: Zero Em-Dash Check (10 pts)
  const rawString = JSON.stringify(data);
  const emDashCount = (rawString.match(/[—–]/g) || []).length;

  if (emDashCount === 0) {
    score += 10;
    auditList.push({
      category: "Typography Quality",
      title: "Zero Em-Dash Discipline",
      status: "pass",
      detail: "Verified: Clean typography using regular hyphens (-) and dots (·)."
    });
  } else {
    auditList.push({
      category: "Typography Quality",
      title: "Avoid Em-Dashes",
      status: "fail",
      detail: `Found ${emDashCount} em-dashes. Use regular hyphens (-) instead for clean ATS parsing.`
    });
  }

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    audits: auditList,
    metricCount: bulletsWithMetrics.length,
    totalBullets: allBullets.length,
    powerVerbCount: strongVerbCount,
    emDashCount: emDashCount
  };
}

export function matchJobKeywords(resumeData, jobDescriptionText) {
  if (!jobDescriptionText || jobDescriptionText.trim().length < 20) {
    return { score: 0, matched: [], missing: [] };
  }

  const resumeText = JSON.stringify(resumeData).toLowerCase();
  
  const stopWords = new Set([
    "the", "and", "for", "with", "that", "this", "from", "have", "will", "your",
    "about", "into", "their", "more", "some", "such", "than", "them", "then",
    "these", "they", "were", "what", "when", "where", "which", "while", "who",
    "will", "would", "you", "are", "been", "has", "had", "can", "our", "all",
    "any", "both", "each", "few", "more", "most", "other", "some", "such", "only"
  ]);

  const rawWords = jobDescriptionText
    .toLowerCase()
    .replace(/[^a-z0-9#+.]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  const wordFreq = {};
  rawWords.forEach(w => {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  });

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([w]) => w);

  const matched = [];
  const missing = [];

  topKeywords.forEach(kw => {
    if (resumeText.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchRatio = topKeywords.length > 0 ? (matched.length / topKeywords.length) : 0;
  const matchPercentage = Math.round(matchRatio * 100);

  return {
    score: matchPercentage,
    matched,
    missing
  };
}
