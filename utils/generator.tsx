import React from 'react';
import { JsonBackground, JsonBlur, JsonBorder, JsonButtonLabelStyle, JsonDesign, JsonShadow, JsonSlideTransition, JsonTextOldConfigStyle } from './types';
import { horizontalAlign, scaleModeToStyle, verticalAlign } from './constants';
import { getScale } from './methods';

const conversions = {
  scaleMode: (value: string) => scaleModeToStyle[value],
  verticalAlign: (value: string) => verticalAlign[value],
  horizontalAlign	: (value: string) => horizontalAlign[value],
  contentScale: (value: number) => getScale(value),
  width: (value: number | string) => ({ width: Number(value) }),
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
    return { boxShadow: `${value.hShadow}px ${value.vShadow}px ${blur}px ${value.spread}px ${value.color}` };
  },
  blur: (value: JsonBlur) => {
    if (!value.useBlur) {
      return {};
    }

    return { filter: blur() };
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
    transform: `
      translate(${value.slidePosX || 0}px, ${value.slidePosY || 0}px)
      scale(${value.zoom ? 1 + value.zoom / 100 : 1})
    `,
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
    console.log("Button: ", value);
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
  defaultFontSettings: (value: JsonTextOldConfigStyle) => ({
    fontFamily: value.fontFamily,
    fontWeight: value.fontWeight,
    fontStyle: value.fontStyle,
  }),
  fontSettings: (value: JsonTextOldConfigStyle) => ({
    fontFamily: value.fontFamily,
    fontWeight: value.fontWeight,
    fontStyle: value.fontStyle,
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
    backgroundColor,
    id,
    originalName	
  } = children.properties;

  return (
    <img
      id={id}
      style={
        children.type !== "slide"
          ? convertJSONObjectToHTMLStyle({ backgroundColor })
          : undefined
      }
      data-name={originalName}
      key={`${children.type}_${children?.id}_${children?.duration}_${children?.backgroundColor?.contentScale}_${children?.properties?.width}`}
    >
      {children && children.elements && children.elements.map((el: any, idx) => 
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
    backgroundOverColor
  };

  return (
    <button
      type={layerType}
      style={
        children.type !== "slide"
          ? convertJSONObjectToHTMLStyle(props)
          : undefined
      }
      key={`${children.type}_${children?.id}_${children?.duration}_${children?.backgroundColor?.contentScale}_${children?.properties?.width}`}
    >
      <span style={convertJSONObjectToHTMLStyle({ labelStyle })}>
        {buttonLabel}
      </span>
    </button>
  );
}

const renderParagraph = (children: any) => {
  const {
    defaultFontSettings,
    fontSettings,  
    text, color
  } = children.properties;
  console.log("Rendering paragraph: ", text);
  return (
    <p
      data-text={text} 
      style={convertJSONObjectToHTMLStyle({ defaultFontSettings, color, fontSettings })}
    >
      {children && children.children && children.children.map((el: any) => 
        el && renderParagraph(el)
      )}
    </p>
  )
}

const renderText = (children: any) => {
  const {
    backgroundColor,
    id, 
  } = children.properties;

  console.log("Rendering text");

  return (
    <div
      id={id}
      style={
        children.type !== "slide"
          ? convertJSONObjectToHTMLStyle({ backgroundColor })
          : undefined
      }
      key={`${children.type}_${children?.id}_${children?.duration}_${children?.backgroundColor?.contentScale}_${children?.properties?.width}`}
    >
      {children && children.config && children.config.nodes && children.config.nodes.map((el: any) => 
        el && renderParagraph(el)
      )}
    </div>
  );
}

const renderDiv = (children: any) => {
  const {
    backgroundColor,
    id, 
  } = children.properties;

  return (
    <div
      id={id}
      style={
        children.type !== "slide"
          ? convertJSONObjectToHTMLStyle({ backgroundColor })
          : undefined
      }
      key={`${children.type}_${children?.id}_${children?.duration}_${children?.backgroundColor?.contentScale}_${children?.properties?.width}`}
    >
      {children && children.elements && children.elements.map((el: any, idx) => 
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
  console.log("Generate children");
  return convertChildrenToHtmlLayerType(children);
}

export function generateDesign(data: any) {
  console.log("Server side rendering... ", data.banner);

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
        style={convertJSONObjectToHTMLStyle(props)}
        data-name={name}
      >
        {data.banner.elements && data.banner.elements.map((el: JsonDesign) => 
          el && generateChildren(el)
        )}
      </div>
    </a>
  );
}
