import { styled } from "@/stitches.config";
import Image from "next/image";
import { FC } from "react";

interface Props {
  src: string;
  alt?: string;
  imageBpWidths: string[];
}

const ImageWrapper = styled("div", {
  position: "relative",
  width: "$w100",
  borderRadius: "$1 $1 0px 0px",
  backgroundColor: "$w100",
  textAlign: "center",
});

const StyledImage = styled(Image, {
  objectFit: "contain",
  background: "transparent",
});

const ResponsiveImage: FC<Props> = ({ src, alt = "", imageBpWidths }) => {
  return (
    <ImageWrapper>
      <StyledImage
        src={src}
        alt={alt}
        loading="lazy"
        fill
        sizes={imageBpWidths.join(", ")}
      />
    </ImageWrapper>
  );
};

export default ResponsiveImage;
