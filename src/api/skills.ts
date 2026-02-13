export const getSkills = async () => {
  const response = await fetch('/db/skills.json');
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
};