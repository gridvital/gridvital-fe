import styles from "./OPSInitialsAvatar.module.css";

const colorPalette = [
  "#0284C7",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#2563eb",
  "#9333ea",
  "#0d9488",
];

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const OPSInitialsAvatar = ({ name, size }) => {
  const colorIndex = name ? hashString(name) % colorPalette.length : 0;
  const bgColor = colorPalette[colorIndex];
  const dimension = size || 40;

  return (
    <div
      className={styles.OPSInitialsAvatar_avatar}
      style={{
        width: dimension,
        height: dimension,
        fontSize: Math.round(dimension * 0.4),
        backgroundColor: bgColor,
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default OPSInitialsAvatar;
