import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Masonry from "react-masonry-css";

export default function Fallback({ isDark }) {
  const lightModeColor = "#fff";
  const darkModeColor = "#202020";
  const skeletonColor = isDark ? darkModeColor : lightModeColor;
  const skeletonArray = Array.from({ length: 10 });

  console.log("Fallback");

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1430: 4,
        1150: 3,
        860: 2,
        570: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {skeletonArray.map((_, i) => (
        <Stack key={i} spacing={1} margin={2}>
          <Skeleton
            variant="rounded"
            width={270}
            height={40}
            style={{ backgroundColor: skeletonColor }}
          />
          <Skeleton
            variant="rounded"
            width={270}
            height={140}
            style={{ backgroundColor: skeletonColor }}
          />
          <Stack spacing={1} direction="row" justifyContent="flex-end">
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              style={{ backgroundColor: skeletonColor }}
            />
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              style={{ backgroundColor: skeletonColor }}
            />
          </Stack>
        </Stack>
      ))}
    </Masonry>
  );
}
