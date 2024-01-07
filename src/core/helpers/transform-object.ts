import transformProperty from './transform-property.js';
import {DEFAULT_STATIC_IMAGES} from './constants.js';

const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:Record<string, unknown>) =>
  properties
    .forEach((property) => {
      transformProperty(property, data, (target: Record<string, unknown>) => {
        const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });

export default transformObject;
