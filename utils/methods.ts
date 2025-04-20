export const getDesignsURL = (hash: string) => {
    return `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/${hash}/json`;
}

export const getScale = (scale: number) => {
    return {
        transform: `scale(${scale})`,
        transformOrigin: '0px 0px 0px'
    };
}
