export const getUsers = async () => {
  const response = await fetch('/db/users.json');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};