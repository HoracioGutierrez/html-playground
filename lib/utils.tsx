import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const refactorInitialElements = [
  {
    title: "Base Elements",
    elements: [
      { id: 1, tag: "html", tooltip: "The root element of an HTML document. All other elements must be descendants of this element.", canContain: ["head", "body"] },
      { id: 2, tag: "head", tooltip: "The head element contains meta information about the HTML document.", canContain: ["title", "meta", "link", "style", "script"] },
      { id: 3, tag: "body", tooltip: "The body element contains the document's content.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div", "header", "footer", "section", "article", "aside", "figure", "main", "nav"] },
      { id: 60, tag: "div", tooltip: "The div element is a generic container for flow content.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div"] },
    ],
  },
  {
    title: "Form Elements",
    elements: [
      { id: 4, tag: "form", tooltip: "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.", canContain: ["input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source"] },
      { id: 5, tag: "input", tooltip: "The input element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.", canContain: [] },
      { id: 6, tag: "label", tooltip: "The label element represents a caption for an item in a user interface.", canContain: ["span"] },
      { id: 7, tag: "select", tooltip: "The select element represents a control that provides a menu of options", canContain: ["option"] },
      { id: 8, tag: "option", tooltip: "The option element represents an option in a select element or as part of a datalist element", canContain: ["span"] },
      { id: 9, tag: "textarea", tooltip: "The textarea element represents a multi-line plain-text editing control.", canContain: [] },
      { id: 10, tag: "button", tooltip: "The button element represents a clickable button.", canContain: ["span"] },
      { id: 11, tag: "fieldset", tooltip: "The fieldset element is used to group related data in a form and is used to create a fieldset begin and end tag.", canContain: ["legend", "div", "input", "label"] },
      { id: 12, tag: "legend", tooltip: "The legend element represents a caption for the content of its parent fieldset.", canContain: ["span"] },
    ],
  },
  {
    title: "Interactive Elements",
    elements: [
      { id: 13, tag: "details", tooltip: "The details element represents a disclosure widget from which the user can obtain additional information or controls.", canContain: ["summary", "div"] },
      { id: 14, tag: "summary", tooltip: "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.", canContain: ["span"] },
      { id: 15, tag: "dialog", tooltip: "The dialog element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.", canContain: ["div"] },
      { id: 16, tag: "a", tooltip: "The a element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.", canContain: ["span", "img", "div"] },
    ],
  },
  {
    title: "Media Elements",
    elements: [
      { id: 22, tag: "canvas", tooltip: "The canvas element is used to draw graphics, on the fly, via scripting (usually JavaScript).", canContain: [] },
      { id: 23, tag: "audio", tooltip: "The audio element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the src object's src property. Audio sources may be specified as URLs or as the audio element's child elements.", canContain: ["source"] },
      { id: 24, tag: "video", tooltip: "The video element is used to embed video content in documents. It may contain one or more video sources, represented using the src attribute or the src object's src property. Video sources may be specified as URLs or as the video element's child elements.", canContain: ["source"] },
      { id: 25, tag: "source", tooltip: "The source element is used to specify multiple media resources for either the audio or video element. It is an empty element, meaning that it has no content and does not have a closing tag. It is commonly used as a child of the video or audio element.", canContain: [] },
    ],
  },
  {
    title: "Semantic Elements",
    elements: [
      { id: 26, tag: "main", tooltip: "The main element represents the dominant content of the body of a document. The main element can be used multiple times in a document, for example, to provide multiple main sections in a column-based layout.", canContain: ["div", "article", "h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "pre", "blockquote", "ol", "ul", "li", "form", "button", "a", "img", "canvas", "audio", "video", "section"] },
      { id: 27, tag: "nav", tooltip: "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links", canContain: ["div", "a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "ul", "button", "ol", "img"] },
      { id: 28, tag: "header", tooltip: "The header element represents a container for introductory content or a set of navigational links.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "li", "form", "button", "a", "img", "div"] },
      { id: 29, tag: "footer", tooltip: "The footer element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"] },
      { id: 30, tag: "section", tooltip: "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content, typically with a heading.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"] },
      { id: 31, tag: "article", tooltip: "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"] },
      { id: 32, tag: "aside", tooltip: "The aside element represents a portion of a document whose content is only indirectly related to the document's main content.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"] },
      { id: 33, tag: "figure", tooltip: "The figure element represents some flow content, optionally with a caption, that is self-contained and is typically referenced as a single unit from the main flow of the document.", canContain: ["img", "figcaption", "div"] },
      { id: 34, tag: "figcaption", tooltip: "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.", canContain: ["span"] },
    ],
  },
  {
    title: "Metadata Elements",
    elements: [
      { id: 35, tag: "title", tooltip: "The title element represents the document's title or name.", canContain: [] },
      { id: 36, tag: "meta", tooltip: "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, or script elements.", canContain: [] },
      { id: 37, tag: "link", tooltip: "The link element represents relationships between the current document and an external resource. This element is most commonly used to link to external style sheets, but is also used to establish site icons (both \"favicon\" style icons and icons for the home screen and apps on the device), and to link to an external feed of RSS or Atom news content.", canContain: [] },
      { id: 38, tag: "style", tooltip: "The style element contains style information for a document, or part of a document. By default, the style element is expected to be contained within the head element.", canContain: [] },
      { id: 39, tag: "script", tooltip: "The script element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code.", canContain: [] },
    ],
  },
  {
    title: "Table Elements",
    elements: [
      { id: 40, tag: "table", tooltip: "The table element represents tabular data — that is, information presented in a two-dimensional table consisting of rows and columns of cells containing data.", canContain: ["thead", "tbody", "tfoot", "tr", "th", "td"] },
      { id: 44, tag: "thead", tooltip: "The thead element represents the title of the table. The title appears at the top of the table, and is often described using the th element.", canContain: ["tr", "th"] },
      { id: 45, tag: "tbody", tooltip: "The tbody element represents the block of rows in a table.", canContain: ["tr"] },
      { id: 46, tag: "tfoot", tooltip: "The tfoot element represents the footer of the table.", canContain: ["tr"] },
      { id: 47, tag: "tr", tooltip: "The tr element represents a row of cells in a table.", canContain: ["th", "td"] },
      { id: 48, tag: "th", tooltip: "The th element represents a cell in a table header.", canContain: ["span"] },
      { id: 49, tag: "td", tooltip: "The td element represents a cell of data in a table.", canContain: ["span"] },
    ],
  },
  {
    title: "Text Elements",
    elements: [
      { id: 50, tag: "h1", tooltip: "The h1 element represents a heading of level 1 in an HTML document.", canContain: ["span"] },
      { id: 51, tag: "h2", tooltip: "The h2 element represents a heading of level 2 in an HTML document.", canContain: ["span"] },
      { id: 52, tag: "h3", tooltip: "The h3 element represents a heading of level 3 in an HTML document.", canContain: ["span"] },
      { id: 53, tag: "h4", tooltip: "The h4 element represents a heading of level 4 in an HTML document.", canContain: ["span"] },
      { id: 54, tag: "h5", tooltip: "The h5 element represents a heading of level 5 in an HTML document.", canContain: ["span"] },
      { id: 55, tag: "h6", tooltip: "The h6 element represents a heading of level 6 in an HTML document.", canContain: ["span"] },
      { id: 56, tag: "p", tooltip: "The p element represents a paragraph.", canContain: ["span", "br"] },
      { id: 57, tag: "hr", tooltip: "The hr element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.", canContain: [] },
      { id: 58, tag: "br", tooltip: "The br element represents a line break.", canContain: [] },
      { id: 59, tag: "pre", tooltip: "The pre element represents preformatted text which is to be presented exactly as written in the HTML file.", canContain: [] },
      { id: 60, tag: "blockquote", tooltip: "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.", canContain: ["span", "cite", "footer", "blockquote"] },
      { id: 61, tag: "ol", tooltip: "The ol element represents an ordered list of items — typically rendered as a numbered list.", canContain: ["li"] },
      { id: 62, tag: "ul", tooltip: "The ul element represents an unordered list of items, typically rendered as a bulleted list.", canContain: ["li"] },
      { id: 63, tag: "li", tooltip: "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.", canContain: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote", "ol", "ul", "div", "img", "a"] },
    ],
  },
  {
    title: "Other Elements",
    elements: [
      { id: 64, tag: "a", tooltip: "The a element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.", canContain: ["span", "img", "div"] },
      { id: 65, tag: "div", tooltip: "The div element is a generic container for flow content.", canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div"] },
    ]
  }
]

export type HeaderTitleProps = {
  children?: React.ReactNode | string
}

export type RootLayoutProps = Readonly<{ children: React.ReactNode; }>