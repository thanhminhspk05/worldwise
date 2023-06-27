const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag?.toLowerCase()}.png`}
      alt="flag"
    />
  );
};

export { flagemojiToPNG, formatDate };
