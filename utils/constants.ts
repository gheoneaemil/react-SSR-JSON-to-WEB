export const scaleModeToStyle = {
    stretch: { objectFit: "fill" },
    aspect: { objectFit: "contain" },
    mask: { 
        objectFit: "cover",
        clipPath: "circle(50% at 50% 50%)"
    },
    tile: {
        backgroundRepeat: "repeat"
    },
    crop: { objectFit: "cover" },
    userCrop: { 
        objectFit: "cover",
        clipPath: "inset(10px 20px)"
    },
};

export const verticalAlign = {
    top: { alignItems: 'flex-start' },
    middle: { alignItems: 'center' },
    bottom: { alignItems: 'flex-end' },
};

export const horizontalAlign = {
    left: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    right: { justifyContent: 'flex-end' },
};

export const mediaUrl = "https://d2gla4g2ia06u2.cloudfront.net/assets/media";
