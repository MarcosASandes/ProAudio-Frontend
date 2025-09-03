export const clearData = () => {
  const exactKeys = ["userName", "userMail", "userToken", "projectDraft"];
  const prefixes = [
    "projectDraftUpdate",
    "temporaryProjectEvent",
    "temporaryProjectClient",
  ];

  exactKeys.forEach((key) => localStorage.removeItem(key));

  Object.keys(localStorage).forEach((key) => {
    if (prefixes.some((prefix) => key.startsWith(prefix))) {
      localStorage.removeItem(key);
    }
  });
};
