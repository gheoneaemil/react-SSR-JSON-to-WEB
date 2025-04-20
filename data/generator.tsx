import { JsonAlign, JsonScaleMode } from '../app/utils';
import untypedData from './design.json';
import HelmetAsync from 'react-helmet-async';
const data = untypedData;

const getScaleMode = (scaleMode: JsonScaleMode) => {
  const scaleModeToStyle = {
    stretch: { "object-fit": "fill" },
    aspect: { "object-fit": "contain" },
    mask: { 
      "object-fit": "cover",
      "clip-path": "circle(50% at 50% 50%)"
    },
    tile: {
      "background-repeat": "repeat"
    },
    crop: { "object-fit": "cover" },
    userCrop: { 
      "object-fit": "cover",
      "clip-path": "inset(10px 20px)"
    },
  };
  return scaleModeToStyle[scaleMode];
}

const getFlexAlignStyles = (horizontal: JsonAlign, vertical: JsonAlign) => {
  const justifyMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  const alignMap = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
  };

  return {
    display: 'flex',
    justifyContent: justifyMap[horizontal] ?? 'flex-start',
    alignItems: alignMap[vertical] ?? 'center',
  };
};

const getScale = (
  width: number,
  height: number,
  scale: number
) => {
  const scaleX = width / scale;
  const scaleY = height / scale;

  // Use the smaller scale to preserve aspect ratio and avoid overflow
  const finalScale = Math.max(scaleX, scaleY);
  return {
    transform: `scale(${finalScale})`,
    transformOrigin: '0px 0px 0px'
  };
};

export function generateDesign() {
  console.log("Server side rendering...");
  const {
    width,
    height,
    backgroundColor,
    name,
    useHandCursor,
    urlTarget
  }: any = data.banner.properties;

  const aProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};

  if (urlTarget) {
    aProps.target = urlTarget;
  }
    
  return (
    <>
      <head>
        <meta name="ad.size" content={`width=${width},height=${height}`} />
        <title>{name}</title>
      </head>
      <body>
        <a {...aProps}>
          <div
            className="relative overflow-hidden border shadow-lg"
            data-name={name}
            style={{
              backgroundColor: backgroundColor.scolor,
              borderColor: backgroundColor.borderColor,
              borderStyle: backgroundColor.type,
              cursor: useHandCursor ? 'pointer' : 'auto',
              backgroundRepeat: 'repeat',
              ...getScaleMode(backgroundColor.scaleMode),
              ...getFlexAlignStyles(
                backgroundColor.horizontalAlign, 
                backgroundColor.verticalAlign
              ),
              ...getScale(
                width, height,
                backgroundColor.contentScale
              ),
              width,
              height,
            }}
          >
            {data.banner.elements?.map((el: any, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: el.top,
                    left: el.left,
                    width: el.width,
                    height: el.height,
                    backgroundImage: el.imageUrl ? `url(${el.imageUrl})` : undefined,
                    backgroundSize: 'cover',
                    ...el.customStyles, // if you support extra styles
                  }}
                >
                  {/* You can handle types like text, image, shape, etc. */}
                  {el.type === 'text' && (
                    <p
                      style={{
                        fontSize: el.fontSize,
                        color: el.color,
                        fontFamily: el.fontFamily,
                      }}
                    >
                      {el.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </a>
      </body>
    </>
  );
}
