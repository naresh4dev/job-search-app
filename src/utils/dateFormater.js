export function getTimeAgo(utcDateString) {
  const date = new Date(utcDateString);
  const now = new Date();
  const diffMs = now - date;

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  let timeAgo = '';
  let recent = false;

  if (diffHours < 24) {
    timeAgo = `${diffHours <= 0 ? 1 : diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    recent = true;
  } else if (diffDays < 7) {
    timeAgo = `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else if (diffWeeks < 4) {
    timeAgo = `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  } else if (diffMonths < 12) {
    timeAgo = `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  } else {
    timeAgo = `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
  }

  return { timeAgo, recent };
}
