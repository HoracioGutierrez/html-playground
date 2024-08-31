const textElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "b", "i", "a", "br"];
const semanticElements = ["header", "main", "footer", "section", "article", "aside", "nav"];
const multimediaElements = ["img", "video", "audio", "source", "track", "map", "area", "embed", "object", "iframe", "picture", "svg", "math"];
const formElements = ["input", "button", "select", "datalist", "optgroup", "option", "textarea", "form"];
const generalBlocks = ["div"];

const ERROR_CODE = {
  NO_PARENT_BLOCK: 'NO_PARENT_BLOCK',
  RECURSIVE_ELEMENT: 'RECURSIVE_ELEMENT',
  ONLY_MODIFIER: 'ONLY_MODIFIER',
  RECURSIVE_BLOCK: 'RECURSIVE_BLOCK',
  ELEMENT_OF_ELEMENT: 'ELEMENT_OF_ELEMENT',
};

const OK_TRANSLATION = {
  ru: 'BEMissimo 🤌 (Всё хорошо)',
  en: 'BEMissimo 🤌 (Everything good)',
};

const ERROR_TRANSLATION = {
  ru: {
    [ERROR_CODE.ELEMENT_OF_ELEMENT]: 'Не может быть элемента у элемента',
    [ERROR_CODE.RECURSIVE_BLOCK]: 'Блок вложен в блок с таким же именем',
    [ERROR_CODE.RECURSIVE_ELEMENT]:
      'Элемент вложен в элемент с таким же именем',
    [ERROR_CODE.NO_PARENT_BLOCK]:
      'Элемент используется без блока в родителях',
    [ERROR_CODE.ONLY_MODIFIER]:
      'Модификатор используется без блока или элемента',
  },
  en: {
    [ERROR_CODE.ELEMENT_OF_ELEMENT]: 'It could not be element of element',
    [ERROR_CODE.RECURSIVE_BLOCK]: 'Block is in block with same name',
    [ERROR_CODE.RECURSIVE_ELEMENT]: 'Element is in element with same name',
    [ERROR_CODE.NO_PARENT_BLOCK]:
      'The element has a class name that contains a block name but no parent element with that block name exists',
    [ERROR_CODE.ONLY_MODIFIER]:
      'Modifier was used without block or element',
  },
};

let language = 'en';

export const baseElements = [
  { id: 0, tagName: 'doctype', hasChildren: false },
  {
    id: 1, tagName: 'html', hasChildren: true, possibleChildren: [
      { tag: "head", limit: 1 },
      { tag: "body", limit: 1 },
    ],
    attributes: ["lang", "dir"]
  },
  {
    id: 2, tagName: 'body', hasChildren: true, possibleChildren: [
      ...textElements,
      ...semanticElements,
      ...multimediaElements,
      ...formElements,
      "ul", "ol",
    ],
    attributes: ["class", "id"]
  },
  {
    id: 3, tagName: 'head', hasChildren: true, possibleChildren: [
      { tag: "title", limit: 1 },
      "meta", "link", "script", "style"]
  },
  { id: 4, tagName: 'title', hasChildren: false },
  { id: 5, tagName: 'meta', hasChildren: false, attributes: ["content", "name"] },
  { id: 6, tagName: 'link', hasChildren: false, attributes: ["href", "rel", "type"] },
  { id: 7, tagName: 'script', hasChildren: false, attributes: ["src", "type"] },
  { id: 8, tagName: 'style', hasChildren: false, attributes: ["type"] },
  { id: 9, tagName: 'h1', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 10, tagName: 'h2', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 11, tagName: 'h3', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 12, tagName: 'h4', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 13, tagName: 'h5', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 14, tagName: 'h6', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 15, tagName: 'p', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 16, tagName: 'span', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 17, tagName: 'strong', hasChildren: false, attributes: ["class", "id"] },
  { id: 18, tagName: 'em', hasChildren: false, attributes: ["class", "id"] },
  { id: 19, tagName: 'b', hasChildren: false, attributes: ["class", "id"] },
  { id: 20, tagName: 'i', hasChildren: false, attributes: ["class", "id"] },
  { id: 21, tagName: 'a', hasChildren: false, attributes: ["class", "id"] },
  { id: 22, tagName: 'br', hasChildren: false, attributes: ["class", "id"] },
  { id: 23, tagName: 'img', hasChildren: false, attributes: ["class", "id"] },
  { id: 24, tagName: 'ul', hasChildren: true, possibleChildren: ["li"], attributes: ["class", "id"] },
  { id: 25, tagName: 'ol', hasChildren: true, possibleChildren: ["li"], attributes: ["class", "id"] },
  { id: 26, tagName: 'li', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
]

export const structureElements = [
  { id: 0, tagName: 'doctype', hasChildren: false },
  {
    id: 1, tagName: 'html', hasChildren: true, possibleChildren: [
      { tag: "head", limit: 1 },
      { tag: "body", limit: 1 },
    ],
    attributes: ["lang", "dir"]
  },
  {
    id: 2, tagName: 'body', hasChildren: true, possibleChildren: [
      ...textElements,
      ...semanticElements,
      ...multimediaElements,
      ...formElements,
      "ul", "ol",
    ],
    attributes: ["class", "id"]
  },
  {
    id: 3, tagName: 'head', hasChildren: true, possibleChildren: [
      { tag: "title", limit: 1 },
      "meta", "link", "script", "style"]
  }
]

export const blockElements = [
  { id: 4, tagName: 'header', hasChildren: true, possibleChildren: [...textElements, ...generalBlocks], attributes: ["class", "id"] },
  { id: 5, tagName: 'main', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks], attributes: ["class", "id"] },
  { id: 6, tagName: 'footer', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks], attributes: ["class", "id"] },
  { id: 7, tagName: 'section', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks, ...semanticElements], attributes: ["class", "id"] },
  { id: 8, tagName: 'article', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks], attributes: ["class", "id"] },
  { id: 9, tagName: 'aside', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks], attributes: ["class", "id"] },
  { id: 10, tagName: 'nav', hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks], attributes: ["class", "id"] },
  { id: 11, tagName: "div", hasChildren: true, possibleChildren: [...textElements, , ...generalBlocks, ...semanticElements], attributes: ["class", "id"] },
]

export const textBaseElements = [
  { id: 11, tagName: 'h1', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 12, tagName: 'h2', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 13, tagName: 'h3', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 14, tagName: 'h4', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 15, tagName: 'h5', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 16, tagName: 'h6', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 17, tagName: 'p', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 18, tagName: 'span', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] },
  { id: 19, tagName: 'strong', hasChildren: false, attributes: ["class", "id"] },
  { id: 20, tagName: 'em', hasChildren: false, attributes: ["class", "id"] },
  { id: 21, tagName: 'b', hasChildren: false, attributes: ["class", "id"] },
  { id: 22, tagName: 'i', hasChildren: false, attributes: ["class", "id"] },
  { id: 23, tagName: 'a', hasChildren: false, attributes: ["class", "id"] },
  { id: 24, tagName: 'br', hasChildren: false, attributes: ["class", "id"] },
  { id: 25, tagName: 'img', hasChildren: false, attributes: ["class", "id"] },
  { id: 26, tagName: 'ul', hasChildren: true, possibleChildren: ["li"], attributes: ["class", "id"] },
  { id: 27, tagName: 'ol', hasChildren: true, possibleChildren: ["li"], attributes: ["class", "id"] },
  { id: 28, tagName: 'li', hasChildren: true, possibleChildren: ["span", "strong", "em", "b", "i", "a", "br"], attributes: ["class", "id"] }
]

export const multimediaBaseElements = [
  { id: 29, tagName: 'img', hasChildren: false, attributes: ["class", "id", "src", "alt"] },
  { id: 30, tagName: 'video', hasChildren: true, possibleChildren: ["source"], attributes: ["class", "id", "src", "type"] },
  { id: 31, tagName: 'audio', hasChildren: true, possibleChildren: ["source"], attributes: ["class", "id", "src", "type"] },
  { id: 32, tagName: 'source', hasChildren: false, attributes: ["class", "id", "src", "type"] },
  /* { id: 33, tagName: 'track', hasChildren: false, attributes: ["class", "id"] }, */
  /* { id: 34, tagName: 'map', hasChildren: false, attributes: ["class", "id"] }, */
  /* { id: 35, tagName: 'area', hasChildren: false, attributes: ["class", "id"] }, */
  /* { id: 36, tagName: 'embed', hasChildren: false, attributes: ["class", "id"] },
  { id: 37, tagName: 'object', hasChildren: false, attributes: ["class", "id"] }, */
  { id: 38, tagName: 'iframe', hasChildren: false, attributes: ["class", "id", "src", "title"] },
  { id: 39, tagName: 'picture', hasChildren: true, possibleChildren: ["source"], attributes: ["class", "id", "src", "type"] },
  { id: 40, tagName: 'svg', hasChildren: false, attributes: ["class", "id"] },
  /* { id: 41, tagName: 'math', hasChildren: false, attributes: ["class", "id"] }, */
]

function parseClassName(className) {
  const regExp = /^([a-z-0-9]*)(__)?([a-z-0-9]*)(_)?([a-z-0-9]*)?(_)?([a-z-0-9])?/i;

  const [
    ,
    blockName,
    ,
    elementName,
    ,
    modifierName,
    ,
    modifierValue,
  ] = regExp.exec(className) as any;

  return { blockName, elementName, modifierName, modifierValue };
}

function validateNode(node, parentArray: any[] = []) {
  const errors: any = [];
  const currentClasses = [...node.classList];
  const parentArrayWithCurrent = [...parentArray, currentClasses];
  const tagName = node.tagName.toLowerCase();

  currentClasses.forEach((className) => {
    const { blockName, elementName, modifierName } = parseClassName(className);

    if (elementName && !parentArray.flat().find((parentClass) => parentClass === blockName)) {
      errors.push({
        code: ERROR_CODE.NO_PARENT_BLOCK,
        className,
        parentArray,
        tagName
      });
    }

    if (elementName && parentArray.flat().find((parentClass) => parentClass === `${blockName}__${elementName}`)) {
      errors.push({
        code: ERROR_CODE.RECURSIVE_ELEMENT,
        className,
        parentArray,
        tagName
      });
    }

    if (modifierName && !currentClasses.find((currentClass) => elementName
      ? currentClass === `${blockName}__${elementName}`
      : blockName === currentClass)) {
      errors.push({
        code: ERROR_CODE.ONLY_MODIFIER,
        className,
        parentArray,
        tagName
      });
    }

    if (!elementName && !modifierName && parentArray.flat().some((parentClass) => parentClass === blockName)) {
      errors.push({
        code: ERROR_CODE.RECURSIVE_BLOCK,
        className,
        parentArray,
        tagName
      });
    }

    if (className.split('__').length > 2) {
      errors.push({
        code: ERROR_CODE.ELEMENT_OF_ELEMENT,
        className,
        parentArray,
        tagName
      });
    }
  });

  if (node.children) {
    [...node.children].forEach((node) => {
      const childErrors = validateNode(node, parentArrayWithCurrent);
      errors.push(...childErrors);
    });
  }

  return errors;
}

function getParentPath(parents) {
  return parents
    .filter((element) => element.length > 0)
    .map((element) =>
      Array.isArray(element) ? element.join('.') : element,
    )
    .join(' > ');
}

function getErrorMessage(key, errorGroup) {

  const resultErrors: string[] = [];

  errorGroup.forEach((error) => {
    const { className, parentArray, code, tagName } = error;
    const elementWithError = className;
    const blockName = elementWithError.split('__')[0];
    let pathToElement = ""

    parentArray.forEach((element, index) => {
      if (element.length > 0) {
        pathToElement += `${element[0]}`
      } else {
        if (index < parentArray.length - 1) {
          pathToElement += ` > `
        }
      }
    })
    const ERRORS = {
      [ERROR_CODE.NO_PARENT_BLOCK]: `The element <${tagName}/> has a class name "${elementWithError}" that contains the block name "${blockName}" but there's no parent element with that block name. The current path to the element is "${pathToElement}".`,
      [ERROR_CODE.RECURSIVE_BLOCK]: `The element <${tagName}/> with the class name "${elementWithError}" is in block with same name "${className}" and a block cannot be inside itself. The current path to the element is "${pathToElement}".`,
      [ERROR_CODE.RECURSIVE_ELEMENT]: `The element <${tagName}/> with the class name "${elementWithError}" is in element with same name "${className}" and an element cannot be inside itself. The current path to the element is "${pathToElement}".`,
      [ERROR_CODE.ONLY_MODIFIER]: `The element <${tagName}/> with the class name "${elementWithError}" was used without block or element class name. Modifiers should be present if the name of the block or element is also present in the element/tag. The current path to the element is "${pathToElement}".`,
      [ERROR_CODE.ELEMENT_OF_ELEMENT]: `The element <${tagName}/> with the class name "${elementWithError}" cannot be a child of the element <${className}/>. Elements cannot be direct children of itself. The current path to the element is "${pathToElement}".`,
    }

    resultErrors.push(ERRORS[code]);
  })

  return resultErrors;
}

function insertErrors(errors = []) {
  if (!errors.length) {
    return {
      message: OK_TRANSLATION[language],
      hasErrors: false,
      errors: [],
    }
  }

  const groupedErrors = errors.reduce((sum: any, error) => {
    const { code } = error;
    if (sum[code]) {
      sum[code].push(error);
    } else {
      sum[code] = [error];
    }
    return sum;
  }, {});

  return {
    message: "",
    hasErrors: true,
    errors: Object.keys(groupedErrors).map((key) => {
      const errorGroup = groupedErrors[key];
      return {
        message: getErrorMessage(key, errorGroup),
        hasErrors: true,
        errors: errorGroup.map((error) => {
          return {
            className: error.className,
            parentArray: getParentPath(error.parentArray),
          }
        }),
      }
    })
  }
}


export function validate(htmlString: string) {
  const parser = new DOMParser();
  const text = htmlString;
  const inputDocument = parser.parseFromString(text.trim(), 'text/html');

  if (!text || !inputDocument.body) {
    return;
  }

  const errors = validateNode(inputDocument.body);
  const result = insertErrors(errors);
  return result;
}