// src/sample.ts
import type { User } from "../types/index";

// Function: getUser 
// We combine User with { score: number } so TypeScript knows the returned object includes a score.
function getUser(id: number): User & { score: number } {
  return {
    id: id,
    name: "Rayz Gabriel Lasi",
    email: "rayzgabriel.lasi@example.com",
    role: "student",
    isActive: true,
    score: 95.5, 
  };
}

// Function: calculateGrade
function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

// Function: formatCourse
function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

// Usage
const user = getUser(1);
console.log(user);

const grade: string = calculateGrade(85, 100);
console.log(grade);

const courseInfo: string = formatCourse("IT Elective 4", 3, "1st Semester");
console.log(courseInfo);