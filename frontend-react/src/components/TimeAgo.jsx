import React from "react";

const TimeAgo = ({ createdAt }) => {
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const createdAtDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - createdAtDate) / 1000);

    // Convert the difference to various time units
    const seconds = diffInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximation
    const years = Math.floor(days / 365); // Approximation

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  };

  return <small>{getRelativeTime(createdAt)}</small>;
};

export default TimeAgo;
