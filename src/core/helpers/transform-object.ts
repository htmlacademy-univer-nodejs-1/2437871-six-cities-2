import transformProperty from './transform-property.js';
import {DEFAULT_STATIC_IMAGES} from './constants.js';

export default function transformObject(properties: string[], staticPath: string, uploadPath: string, data:Record<string, unknown>) {
  return properties
    .forEach((property) => {
      transformProperty(property, data, (target: Record<string, unknown>) => {
        const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });
}
