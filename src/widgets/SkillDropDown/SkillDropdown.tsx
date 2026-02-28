import { useState, useEffect, useRef } from 'react';
import { getSkills } from '@api/skills';
import SkillsDropdownUI, { SkillCategory } from '@shared/ui/SkillsDropdownUI/SkillsDropdownUI';

const SkillsDropdown: React.FC = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSkills()
    .then(setSkills)
    .catch(console.error);
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
