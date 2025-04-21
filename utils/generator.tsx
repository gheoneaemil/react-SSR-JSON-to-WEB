import React from 'react';
import { JsonBackground, JsonBlur, JsonBorder, JsonButtonLabelStyle, JsonCropData, JsonDesign, JsonShadow, JsonSlideTransition, JsonTextOldConfigStyle } from './types';
import { horizontalAlign, mediaUrl, scaleModeToStyle, verticalAlign } from './constants';
import { getScale } from './methods';

const conversions = {
  scaleMode: (value: string) => scaleModeToStyle[value],
  verticalAlign: (value: string) => verticalAlign[value],
  horizontalAlign	: (value: string) => horizontalAlign[value],
  contentScale: (value: number) => getScale(value),
  width: (value: number | string) => ({ width: Number(value) }),
  initialFontSize: (value: number) => ({ fontSize: value }),
  height: (value: number | string) => ({ height: Number(value) }),
  bannerUrl: (value: string) => ({ src: value }),
  urlTarget: (value: string) => ({ target: value }),
  useHandCursor: (value: boolean) => ({ cursor: value ? 'pointer' : 'auto' }),
  borderColor: (value: string) => ({ borderColor: value }),
  scolor: (value: string) => ({ backgroundColor: value }),
  color: (value: string) => ({ color: value }),
  type: (value: string) => ({ borderStyle: value }),
  backgroundColor: (value: JsonBackground) => convertJSONObjectToHTMLStyle(value),
  id: (value: number) => ({ id: value }),
  dropShadow: (value: JsonShadow) => {
    if (!value.useShadow) {
      return {};
    }

    return {
      backgroundPosition: "50% 50%",
      backgroundRepeat: "no-repeat",
      filter: `drop-shadow(${value.hShadow}px ${value.vShadow}px ${value.color}))`
    };
  },
  cropData: (value: JsonCropData) => ({
    backgroundPosition: `-${value.x}px -${value.y}px`
  }),
  blur: (value: JsonBlur) => {
    if (!value.useBlur) {
      return {};
    }

    return { filter: `blur(${value.pixels}px)` };
  },
  rotation: (value: number) => {
    if (value === 0) {
      return {};
    }
    return { transform: `rotate(${value}deg)` };
  },
  opacity: (value: number) => ({ opacity: value / 100 }),
  x: (value: number) => ({ left: `${value}px` }),
  y: (value: number) => ({ top: `${value}px` }),
  buildIn	: (value: JsonSlideTransition) => ({
    opacity: value.alphaOffset !== undefined ? 1 - value.alphaOffset : 1,
    transform: `scale(1)`,
    filter: `blur(${value.blurAmount || 0}px)`,
    color: value.color,
    transition: `all ${value.duration}s ${value.ease || 'ease'}`,
  }),
  backgroundOverColor: (value: string) => ({
    ":hover": {
      backgroundColor: value
    }
  }),
  border: (value: JsonBorder) => ({
    borderColor: value.color,
    borderWidth: value.weight,
    borderRadius: value.radius
  }),
  labelStyle: (value: JsonButtonLabelStyle) => {
    return {
      fontFamily: value.fontFamily,
      fontWeight: value.fontWeight,
      fontStyle: value.fontStyle,
      fontSize: value.fontSize,
      color: value.color,
      letterSpacing: value.letterSpacing,
      textTransform: value.textTransform,
      direction: value.textDirection
    };
  },
  defaultFontSettings: (value: JsonTextOldConfigStyle) => {
    if (!value) {
      return {};
    }

    return {
      fontFamily: value.fontFamily,
      fontWeight: value.fontWeight,
      fontStyle: value.fontStyle,
    }
  },
  fontSettings: (value: JsonTextOldConfigStyle) => ({
    fontFamily: value.fontFamily,
    fontWeight: value.fontWeight,
    fontStyle: value.fontStyle,
  }),
  fontSize: (value: number) => ({
    fontSize: value
  })
}

const convertJSONObjectToHTMLStyle = styleObjectProps => {
  let htmlStyle = {};
  
  Object.entries(styleObjectProps)
  .filter(([key, value]) => {
    return value !== null && 
      value !== undefined && 
      Object.keys(conversions).indexOf(key) !== -1;
  })
  .map(([key, value]) => {
    htmlStyle = {
      ...htmlStyle,
      ...conversions[key](value)
    };
  });
  
  return htmlStyle;
}

const renderImage = (children: any) => {
  const {
    backgroundColor, dropShadow,
    id, x, y, width, rotation,
    originalName, height, url, cropData, 
    contentOffsetX, contentOffsetY,
    horizontalAlign, verticalAlign
  } = children.properties;
  
  const props = {
    x, y, width, height, backgroundColor, 
    dropShadow, rotation, contentOffsetX,
    contentOffsetY, horizontalAlign,
    verticalAlign, cropData
  };

  return (
    <img
      id={id}
      src={`${mediaUrl}/${url}`}
      style={{
        position: "absolute",
        ...(children.type !== "slide"
          ? convertJSONObjectToHTMLStyle(props)
          : undefined)
      }}
      data-name={originalName}
      key={`element-${children?.id}`}
    >
      {children?.elements?.map((el: any, idx) => 
        el && generateChildren(el)
      )}
    </img>
  );
}

const renderButton = (children: any) => {
  const {
    backgroundColor,
    id, labelStyle, 
    dropShadow,
    rotation, border, 
    opacity, backgroundOverColor,
    width, layerType, 
    height, buttonLabel,
    x, y, buildIn
  } = children.properties;

  const props = {
    backgroundColor,
    id, 
    dropShadow,
    rotation,
    opacity,
    width, border, 
    height,
    x, y, buildIn, 
    backgroundOverColor,
  };

  return (
    <button
      type={layerType}
      style={{
        position: "absolute",
        ...(children.type !== "slide" ? convertJSONObjectToHTMLStyle(props) : {})
      }}
      key={`element-${children?.id}`}
    >
      <span style={convertJSONObjectToHTMLStyle({ labelStyle })}>
        {buttonLabel}
      </span>
    </button>
  );
}

const renderParagraph = (children: any) => {
  let {
    defaultFontSettings,
    fontSettings,  
    text, color
  } = children;

  return (
    <p
      data-text={text} 
      key={`element-${text}-${color}`}
      style={{ 
        position: "absolute", 
        marginTop: 0,
        ...convertJSONObjectToHTMLStyle({ defaultFontSettings, color, fontSettings })
      }}
    >
      {children?.children?.map((el: any) => 
        el && renderParagraph(el)
      )}
      {!children.children && text}
    </p>
  )
}

const renderText = (children: any) => {
  const {
    backgroundColor,
    initialFontSize, 
    id, scale
  } = children.properties;

  return (
    <div
      id={id}
      style={{
        fontVariantLigatures: "normal",
        lineHeight: 1.3,
        letterSpacing: "0px",
        textAlign: "center",
        wordWrap: "break-word",
        width: "313.3881px",
        height: "81.6294px",
        left: "11px",
        top: "20px",
        position: "absolute",
        ...(children.type !== "slide" ? convertJSONObjectToHTMLStyle({ backgroundColor, initialFontSize, fontSize: scale * initialFontSize }) : {})
      }}
      key={`element-${children?.id}`}
    >
      {children?.properties?.config?.nodes?.map((el: any) => 
        el && renderParagraph(el)
      )}
    </div>
  );
}

const renderDiv = (children: any) => {
  const {
    backgroundColor, id
  } = children.properties;

  return (
    <div
      id={id}
      style={
        children.type !== "slide" ? convertJSONObjectToHTMLStyle({ backgroundColor }) : undefined
      }
      key={`element-${children?.id}`}
    >
      {children?.elements?.map((el: any, idx) => 
        el && generateChildren(el)
      )}
    </div>
  );
}

const convertChildrenToHtmlLayerType = (children: any) => {
  switch (children.layerType) {
    case "image":
      return renderImage(children);
    case "button":
      return renderButton(children);
    case "text":
      return renderText(children);
    default:
      return renderDiv(children);
  }
}

const generateChildren = (children: any) => {
  return convertChildrenToHtmlLayerType(children);
}

export function generateDesign(data: any) {
  const { 
    bannerUrl, urlTarget, useHandCursor, name, 
    width, height, backgroundColor, dateLastUpdate
  } = data.banner.properties;

  const props = {
    width,
    height,
    useHandCursor, 
    backgroundColor,
    display: 'flex',
    dateLastUpdate
  };

  return (
    <a 
      {...bannerUrl ? { url: bannerUrl } : {}}
      {...urlTarget ? { target: urlTarget } : {}}
      style={convertJSONObjectToHTMLStyle({ useHandCursor })}
      data-name={name}
    >
      <div 
        data-datelastupdate={dateLastUpdate}
        style={{
          left: 0,
          ...convertJSONObjectToHTMLStyle(props)
        }}
        data-name={name}
      >
        {data?.banner?.elements?.map((el: JsonDesign) => 
          el && generateChildren(el)
        )}
      </div>
    </a>
  );
}
