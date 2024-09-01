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