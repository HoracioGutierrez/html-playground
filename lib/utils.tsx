import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const refactorInitialElements = [
  {
    title: "Base Elements",
    elements: [
      {
        id: 1,
        tag: "html",
        tooltip: "The root element of an HTML document. All other elements must be descendants of this element.",
        description: [
          "The HTML tag is the root elemement of an HTML document.",
          "It can only be used once in an HTML document and it must be the first element in the document."
        ],
        canContain: ["head", "body"],
        attributes: [
          { name: "lang", value: "" },
          { name: "dir", value: "" },
        ]
      },
      {
        id: 2,
        tag: "head",
        tooltip: "The head element contains meta information about the HTML document.",
        description: [
          "The head tag is the first child of the html element and should be present only once in an HTML document.",
          "It contains meta information about the HTML document like title, meta, link and script tags."
        ],
        canContain: ["title", "meta", "link", "style", "script"],
        attributes: []
      },
      {
        id: 3,
        tag: "body",
        tooltip: "The body element contains the document's content.",
        description: [
          "The body tag is the second child of the html element and should be present only once in an HTML document.",
          "It contains the document's content like headings, paragraphs, images, links, etc."
        ],
        canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div", "header", "footer", "section", "article", "aside", "figure", "main", "nav"],
        attributes: [
          { name: "class", value: "" },
          { name: "id", value: "" },
          { name: "lang", value: "" },
          { name: "dir", value: "" },
        ]
      },
      {
        id: 60,
        tag: "div",
        tooltip: "The div element is a generic container for flow content.",
        description: [
          "The div tag is a generic container for flow content.",
          "It can contain almost any other tag such as headings, paragraphs, images, links, etc."
        ],
        canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div"],
        attributes: [
          { name: "class", value: "" },
          { name: "id", value: "" },
          { name: "lang", value: "" },
          { name: "dir", value: "" },
        ]
      },
    ],
  },
  {
    title: "Metadata Elements",
    elements: [
      {
        "id": 35,
        "tag": "title",
        "tooltip": "Document's title or name.",
        "description": [
          "The title element represents the document's title or name.",
          "It appears in the browser's title bar and tab bar."
        ],
        "canContain": []
      },
      {
        "id": 36,
        "tag": "meta",
        "tooltip": "Metadata for the document.",
        "description": [
          "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, or script elements.",
          "It is used to provide information about the document, such as keywords, author, description, or viewport settings."
        ],
        "canContain": []
      },
      {
        "id": 37,
        "tag": "link",
        "tooltip": "Links to external resources.",
        "description": [
          "The link element represents relationships between the current document and an external resource.",
          "It is most commonly used to link to external style sheets, but is also used to establish site icons and to link to external feeds of RSS or Atom news content."
        ],
        "canContain": []
      },
      {
        "id": 38,
        "tag": "style",
        "tooltip": "Contains style information for a document.",
        "description": [
          "The style element contains style information for a document, or part of a document.",
          "It is typically used to define the style rules for the document's elements."
        ],
        "canContain": []
      },
      {
        "id": 39,
        "tag": "script",
        "tooltip": "Embeds executable code or data.",
        "description": [
          "The script element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code.",

          "It allows you to add interactive features or functionality to your web page."
        ],
        "canContain": []
      }
    ],
  },
  {
    title: "Semantic Elements",
    elements: [
      {
        "id": 26,
        "tag": "main",
        "tooltip": "Main content of a document.",
        "description": [
          "The main element represents the dominant content of the body of a document.",
          "It can be used multiple times in a document, for example, to provide multiple main sections in a column-based layout."
        ],
        "canContain": ["div", "article", "h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "pre", "blockquote", "ol", "ul", "li", "form", "button", "a", "img", "canvas", "audio", "video", "section"]
      },
      {
        "id": 27,
        "tag": "nav",
        "tooltip": "Navigation links section.",
        "description": [
          "The nav element represents a section of a page that links to other pages or to parts within the page.",
          "It is typically used for navigation menus or sitemaps."
        ],
        "canContain": ["div", "a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "ul", "button", "ol", "img"]
      },
      {
        "id": 28,
        "tag": "header",
        "tooltip": "Introductory content or navigation links.",
        "description": [
          "The header element represents a container for introductory content or a set of navigational links.",
          "It is often used for page titles, logos, or navigation menus."
        ],
        "canContain": ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "li", "form", "button", "a", "img", "div"]
      },
      {
        "id": 29,
        "tag": "footer",
        "tooltip": "Footer for a section or document.",
        "description": [
          "The footer element represents a footer for its nearest sectioning content or sectioning root element.",
          "A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and  the like."
        ],
        "canContain": ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"]
      },
      {
        "id": 30,
        "tag": "section",
        "tooltip": "Generic section of a document or application.",
        "description": [
          "The section element represents a generic section of a document or application.",
          "A section, in this context, is a thematic grouping of content, typically with a heading."

        ],
        "canContain": ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"]
      },
      {
        "id": 31,
        "tag": "article",
        "tooltip": "Self-contained composition in a document.",
        "description": [
          "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g.in syndication.",
          "This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content."
        ],
        "canContain": ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"]
      },
      {
        "id": 32,
        "tag": "aside",
        "tooltip": "Content indirectly related to the main content.",
        "description": [
          "The aside element represents a portion of a document whose content is only indirectly related to the document's main content.",

          "It is often used for sidebars, advertisements, or related content."
        ],
        "canContain": ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "ol", "ul", "form", "button", "a", "img", "div"]
      },
      {
        "id": 33,
        "tag": "figure",
        "tooltip": "Self-contained content with optional caption.",
        "description": [
          "The figure element represents some flow content, optionally with a caption, that is self-contained and is typically referenced as a single unit from the main flow of the document.",
          "It is often used for images, charts, or code snippets."
        ],
        "canContain": ["img", "figcaption", "div"]
      },
      {
        "id": 34,
        "tag": "figcaption",
        "tooltip": "Caption for a figure element.",
        "description": [
          "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if  any."
        ],
        "canContain": ["span"]
      }
    ],
  },
  {
    title: "Text Elements",
    elements: [
      {
        "id": 50,
        "tag": "h1",
        "tooltip": "Level 1 heading.",
        "description": [
          "The h1 element represents a heading of level 1 in an HTML document.",
          "It is the most important heading on a page and is typically used for the main title."
        ],
        "canContain": ["span"]
      },
      {
        "id": 51,
        "tag": "h2",
        "tooltip": "Level 2 heading.",
        "description": [
          "The h2 element represents a heading of level 2 in an HTML document.",
          "It is used for subheadings within a section."
        ],
        "canContain": ["span"]
      },
      {
        "id": 52,
        "tag": "h3",
        "tooltip": "Level 3 heading.",
        "description": [
          "The h3 element represents a heading of level 3 in an HTML document.",
          "It is used for subheadings within a subsection."
        ],
        "canContain": ["span"]
      },
      {
        "id": 53,
        "tag": "h4",
        "tooltip": "Level 4 heading.",
        "description": [
          "The h4 element represents a heading of level 4 in an HTML document.",
          "It is used for subheadings within a subsubsection."
        ],
        "canContain": ["span"]
      },
      {
        "id": 54,
        "tag": "h5",
        "tooltip": "Level 5 heading.",
        "description": [
          "The h5 element represents a heading of level 5 in an HTML document.",
          "It is used for subheadings within a subsubsubsection."
        ],
        "canContain": ["span"]
      },
      {
        "id": 55,
        "tag": "h6",
        "tooltip": "Level 6 heading.",
        "description": [
          "The h6 element represents a heading of level 6 in an HTML document.",
          "It is used for subheadings within a subsubsubsubsection."
        ],
        "canContain": ["span"]
      },
      {
        "id": 56,
        "tag": "p",
        "tooltip": "Paragraph.",
        "description": [
          "The p element represents a paragraph."
        ],
        "canContain": ["span", "br"]
      },
      {
        "id": 57,
        "tag": "hr",
        "tooltip": "Thematic break.",
        "description": [
          "The hr element represents a thematic break between paragraph-level elements.",
          "It is often used to visually separate sections of content."
        ],
        "canContain": []
      },
      {
        "id": 58,
        "tag": "br",
        "tooltip": "Line break.",
        "description": [
          "The br element represents a line break."
        ],
        "canContain": []
      },
      {
        "id": 59,
        "tag": "pre",
        "tooltip": "Preformatted text.",
        "description": [
          "The pre element represents preformatted text which is to be presented exactly as written in the HTML file.",
          "It is often used for code snippets or fixed-width text."
        ],
        "canContain": []
      },
      {
        "id": 60,
        "tag": "blockquote",
        "tooltip": "Quoted content.",
        "description": [
          "The blockquote element represents content that is quoted from another source.",
          "It is often used to display long quotes or citations."
        ],
        "canContain": ["span", "cite", "footer", "blockquote"]
      },
      {
        "id": 61,
        "tag": "ol",
        "tooltip": "Ordered list.",
        "description": [
          "The ol element represents an ordered list of items, typically rendered as a numbered list.",
          "The only possible child of the ol element is the li element."
        ],
        "canContain": ["li"]
      },
      {
        "id": 62,
        "tag": "ul",
        "tooltip": "Unordered list.",
        "description": [
          "The ul element represents an unordered list of items, typically rendered as a bulleted list.",
          "The only possible child of the ul element is the li element."
        ],
        "canContain": ["li"]
      },
      {
        "id": 63,
        "tag": "li",
        "tooltip": "List item.",
        "description": [
          "The li element represents a list item.",
          "It is used within ol and ul elements to create lists and should only be used as a direct child of those elements."
        ],
        "canContain": ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote", "ol", "ul", "div", "img", "a"]
      }
    ],
  },
  {
    title: "Form Elements",
    elements: [
      {
        id: 4,
        tag: "form",
        tooltip: "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.",
        description: [
          "The form tag is the element used to create an HTML form for user input.",
          "It can contain many different elements such as input, label, select, option, textarea, button,etc. to make the form interactive."
        ],
        canContain: ["input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source"]
      },
      {
        id: 5,
        tag: "input",
        tooltip: "The input element is used to create interactive controls for web-based forms in order to accept data from the user",
        description: [
          "The input tag can be used to display a variety of different types of controls configuring its right attributes.",
          "Depending on it's configuration, it can show a wide variety of types of input data and control widgets are available, depending on the device and user agent."
        ],
        canContain: []
      },
      {
        id: 6,
        tag: "label",
        tooltip: "The label element represents a caption for an item in a user interface.",
        description: [
          "The label tag is used to create a caption for an interactive element; it's like the title of the inputs.",
          "It can contain a span element."
        ],
        canContain: ["span"]
      },
      {
        id: 7,
        tag: "select",
        tooltip: "The select element represents a control that provides a menu of options",
        description: [
          "The select tag is used to create a drop-down list of options for the user to choose from.",
          "It can contain many option tags inside it such, which will be displayed as a drop-down list item."
        ],
        canContain: ["option"]
      },
      {
        "id": 8,
        "tag": "option",
        "tooltip": "Represents an option in a select or datalist element.",
        "description": [
          "The option element represents a single choice within a select or datalist element.",
          "It defines a potential value that the user can select or choose from.",
          "Each option element should have a unique value attribute that is used to represent the selected option."
        ],
        "canContain": ["span"]
      },
      {
        "id": 9,
        "tag": "textarea",
        "tooltip": "Multi-line plain-text editing control.",
        "description": [
          "The textarea element is used to create a multi-line text input field.",
          "It allows users to enter and edit large amounts of plain text.",
          "The rows and cols attributes can be used to specify the initial dimensions of the textarea."
        ],
        "canContain": []
      },
      {
        "id": 10,
        "tag": "button",
        "tooltip": "Clickable button.",
        "description": [
          "The button element represents a clickable button that can trigger actions when clicked.",
          "It can be used to submit forms, navigate between pages, or perform other user interactions.",
          "The type attribute can be used to specify the button's function (e.g., submit, reset, button)."
        ],
        "canContain": ["span"]
      },
      {
        "id": 11,
        "tag": "fieldset",
        "tooltip": "Groups related data in a form.",
        "description": [
          "The fieldset element is used to group related elements within a form.",
          "It helps to visually organize and structure form fields.",
          "The legend element can be used to provide a caption for the fieldset."
        ],
        "canContain": ["legend", "div", "input", "label"]
      },
      {
        "id": 12,
        "tag": "legend",
        "tooltip": "Caption for a fieldset.",
        "description": [
          "The legend element is used to provide a caption for the content of its parent fieldset element.",
          "It should be the first child of the fieldset."
        ],
        "canContain": ["span"]
      }
    ],
  },
  {
    title: "Interactive Elements",
    elements: [
      {
        "id": 13,
        "tag": "details",
        "tooltip": "Collapsible section of content.",
        "description": [
          "The details element represents a collapsible section of content that can be expanded or collapsed by the user.",
          "It provides a way to present additional information or options in a compact manner.",
          "The summary element is used to define the visible title or label for the details section."
        ],
        "canContain": ["summary", "div"]
      },
      {
        "id": 14,
        "tag": "summary",
        "tooltip": "Summary, caption, or legend for a details element.",
        "description": [
          "The summary element is used to provide a summary, caption, or legend for the content within its parent details element.",
          "It acts as a toggle that expands or collapses the details section when clicked."
        ],
        "canContain": ["span"]
      },
      {
        "id": 15,
        "tag": "dialog",
        "tooltip": "Modal dialog box or other interactive component.",
        "description": [
          "The dialog element represents a modal dialog box or other interactive component.",
          "It is used to display important messages, gather user input, or provide additional context.",
          "The open attribute can be used to control whether the dialog is visible or not."
        ],
        "canContain": ["div"]
      },
      {
        "id": 16,
        "tag": "a",
        "tooltip": "Hyperlink to web pages, files, etc.",
        "description": [
          "The a element (or anchor element) is used to create hyperlinks to web pages, files, email addresses, or other resources.",
          "The href attribute specifies the target URL.",
          "The a element can contain other elements, such as span, img, or div, to create styled or interactive links."
        ],
        "canContain": ["span", "img", "div"]
      }
    ],
  },
  {
    title: "Media Elements",
    elements: [
      {
        "id": 22,
        "tag": "canvas",
        "tooltip": "Graphics drawing element.",
        "description": [
          "The canvas element is used to draw graphics, on the fly, via scripting (usually JavaScript).",
          "It provides a blank canvas on which you can create custom graphics using JavaScript code."
        ],
        "canContain": []
      },
      {
        "id": 23,
        "tag": "audio",
        "tooltip": "Embeds sound content in documents.",
        "description": [
          "The audio element is used to embed sound content in documents.",
          "It can contain one or more audio sources, represented using the src attribute or the src object's src property.",
          "Audio sources may be specified as URLs or as the audio element's child elements."
        ],
        "canContain": ["source"]
      },
      {
        "id": 24,
        "tag": "video",
        "tooltip": "Embeds video content in documents.",
        "description": [
          "The video element is used to embed video content in documents.",
          "It can contain one or more video sources, represented using the src attribute or the src object's src property.",
          "Video sources may be specified as URLs or as the video element's child elements."
        ],
        "canContain": ["source"]
      },
      {
        "id": 25,
        "tag": "source",
        "tooltip": "Specifies media resources for audio or video.",
        "description": [
          "The source element is used to specify multiple media resources for either the audio or video element.",
          "It is an empty element, meaning that it has no content and does not have a closing tag.",
          "It is commonly used as a child of the video or audio element."
        ],
        "canContain": []
      }
    ],
  },

  {
    title: "Table Elements",
    elements: [
      {
        "id": 40,
        "tag": "table",
        "tooltip": "Represents tabular data.",
        "description": [
          "The table element represents tabular data, presenting information in a two-dimensional grid of rows and columns.",
          "It is commonly used to organize and display data in a structured format."
        ],
        "canContain": ["thead", "tbody", "tfoot", "tr", "th", "td"]
      },
      {
        "id": 44,
        "tag": "thead",
        "tooltip": "Table header.",
        "description": [
          "The thead element represents the title of the table.",
          "It appears at the top of the table and is often used to define column headers."
        ],
        "canContain": ["tr", "th"]
      },
      {
        "id": 45,
        "tag": "tbody",
        "tooltip": "Table body.",
        "description": [
          "The tbody element represents the block of rows in a table.",
          "It contains the main data of the table."
        ],
        "canContain": ["tr"]
      },
      {
        "id": 46,
        "tag": "tfoot",
        "tooltip": "Table footer.",
        "description": [
          "The tfoot element represents the footer of the table.",
          "It is often used to display summary information or totals."
        ],
        "canContain": ["tr"]
      },
      {
        "id": 47,
        "tag": "tr",
        "tooltip": "Table row.",
        "description": [
          "The tr element represents a row of cells in a table."
        ],
        "canContain": ["th", "td"]
      },
      {
        "id": 48,
        "tag": "th",
        "tooltip": "Table header cell.",
        "description": [
          "The th element represents a cell in a table header.",
          "It is typically used to define column headings and is often styled differently than regular data cells."
        ],
        "canContain": ["span"]
      },
      {
        "id": 49,
        "tag": "td",
        "tooltip": "Table data cell.",
        "description": [
          "The td element represents a cell of data in a table."
        ],
        "canContain": ["span"]
      }
    ],
  },
  {
    title: "Other Elements",
    elements: [
      {
        id: 64,
        tag: "a",
        tooltip: "The a element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.",
        description: [],
        canContain: ["span", "img", "div"]
      },
      {
        id: 65,
        tag: "div",
        tooltip: "The div element is a generic container for flow content.",
        description: [
          "The div tag is a generic container for flow content.",
          "It can contain almost any other tag such as headings, paragraphs, images, links, etc."
        ],
        canContain: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "br", "pre", "blockquote", "ol", "ul", "li", "form", "input", "label", "select", "option", "textarea", "button", "fieldset", "legend", "details", "summary", "dialog", "a", "img", "canvas", "audio", "video", "source", "div"]
      },
    ]
  }
]

export type HeaderTitleProps = {
  children?: React.ReactNode | string
}

export type DroppableDOMElementProps = {
  children?: string
  id: string
  tagName: string
  items: any[]
  onReorder: (newOrder: any[], id: string) => void
  handleGenerateHTML?: VoidFunction
  validateBEM?: VoidFunction
  handleRemoveElement?: (id: string) => void
  handleOpenAttributesDialog?: (id: string) => void
  attributes?: any[]
}

export type DraggableTagProps = {
  containerRef: any
  item: any
  handleDrop: any
  delay: number
  dragControls: any
}

export type RootLayoutProps = Readonly<{ children: React.ReactNode; }>

export type SidebarProps = {
  className?: string
  handleClose?: () => void
}