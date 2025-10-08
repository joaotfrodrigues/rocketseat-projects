import { useState } from "react";
import { clsx } from "clsx";
import { BASE_URL } from "../../services/api";

import type { HTMLAttributes } from "react";


type Props = {
  name?: string;
  email?: string;
  size?: "big" | "medium" | "small" | "xsmall";
  avatar?: string | null
  avatarMobile?: boolean
  darkMode?: boolean
} & HTMLAttributes<HTMLDivElement>;

export function User({
  name,
  email,
  size = "small",
  avatar,
  avatarMobile = false,
  darkMode = false,
  ...rest }: Props) {
  const avatarUrl = BASE_URL + "/uploads/" + avatar;

  const [imgError, setImgError] = useState(false);

  function getInitials(name: string) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  if (!name) return "";
  const initials = getInitials(name);

  let dimension;
  switch (size) {
    case "big": //40px
      dimension = "w-10 h-10 text-sm font-normal leading-[1.2]";
      break;
    case "medium": //32px
      dimension = "w-8 h-8 text-sm font-normal leading-[1.2]";
      break;
    case "small": //28px
      dimension = "w-7 h-7 text-xs font-normal leading-[1.4]";
      break;
    case "xsmall": //20px
      dimension = "w-5 h-5 text-[8.75px] font-normal leading-[1.4]";
      break;
  }

  return (
    <div className={clsx(
      "flex items-center",
      size === "big" ? "gap-3" : "gap-2"
    )} {...rest}>
      {!imgError && avatar ? (
        <img
          src={avatarUrl}
          alt={name}
          className={clsx("rounded-full object-cover", dimension)}
          onError={() => setImgError(true)} // fallback if image fails
        />
      ) : (
        <span
          className={clsx(
            "flex items-center justify-center bg-blue-dark rounded-full text-gray-600",
            dimension,
          )}
        >
          {initials}
        </span>
      )}

      <div className={clsx(
        "justify-center flex-col gap-0 flex-1 min-w-0",
        avatarMobile ? "hidden sm:flex" : "flex"
      )}>
        <span
          className={clsx(
            "text-sm font-normal leading-[1.4] w-fit truncate",
            darkMode ? "text-gray-200" :
              size === "small" || size === "xsmall" ? "text-gray-200" : "text-gray-600"
          )}
          title={name}
        >
          {name}
        </span>

        {email &&
          <span
            className="text-xs font-normal leading-[1.4] text-gray-400 w-fit truncate"
            title={email}
          >
            {email}
          </span>
        }
      </div>
    </div>
  );
}

