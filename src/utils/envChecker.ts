export const isLocalProxy = () => {
  return (
    location.hostname.includes('points.polyflow.tech') ||
    location.hostname.includes('pointstest.polyflow.tech')
  );
};
