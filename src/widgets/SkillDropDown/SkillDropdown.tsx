import { useState, useEffect, useRef } from 'react';
import SkillsDropdownUI, { SkillCategory } from '@shared/ui/SkillsDropdownUI/SkillsDropdownUI';

const SkillsDropdown: React.FC = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/db/skills.json');
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <SkillsDropdownUI
      skills={skills}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dropdownRef={dropdownRef}
    />
  );
};

export default SkillsDropdown;
