export const getSkills = async () => {
      try {
        const response = await fetch('/db/skills.json');
        if (!response.ok) throw new Error('Failed to fetch skills');
        const skills = await response.json();
        return skills;
      } catch (err) {
        console.error('Error fetching skills', err);
      }
    };