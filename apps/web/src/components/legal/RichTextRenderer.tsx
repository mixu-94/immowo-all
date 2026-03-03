import React from "react";
import type { LexicalContent } from "@/lib/cms/legalPages";

// --- Types for Lexical AST nodes ---

type TextNode = {
  type: "text";
  text: string;
  format?: number; // bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=sub, 64=sup
  version?: number;
};

type LinkNode = {
  type: "link" | "autolink";
  url?: string;
  fields?: { url?: string; newTab?: boolean };
  children?: LexicalNode[];
  version?: number;
};

type ListItemNode = {
  type: "listitem";
  children?: LexicalNode[];
  version?: number;
};

type ListNode = {
  type: "list";
  listType?: "bullet" | "number";
  children?: LexicalNode[];
  version?: number;
};

type HeadingNode = {
  type: "heading";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: LexicalNode[];
  version?: number;
};

type ParagraphNode = {
  type: "paragraph";
  children?: LexicalNode[];
  version?: number;
};

type BlockquoteNode = {
  type: "quote";
  children?: LexicalNode[];
  version?: number;
};

type HorizontalRuleNode = {
  type: "horizontalrule";
  version?: number;
};

type RootNode = {
  type: "root";
  children?: LexicalNode[];
  version?: number;
};

type LexicalNode =
  | TextNode
  | LinkNode
  | ListItemNode
  | ListNode
  | HeadingNode
  | ParagraphNode
  | BlockquoteNode
  | HorizontalRuleNode
  | RootNode
  | { type: string; children?: LexicalNode[]; [key: string]: unknown };

// --- Renderers ---

function renderText(node: TextNode): React.ReactNode {
  let content: React.ReactNode = node.text;
  const fmt = node.format ?? 0;
  if (fmt & 1) content = <strong>{content}</strong>;
  if (fmt & 2) content = <em>{content}</em>;
  if (fmt & 16) content = <code>{content}</code>;
  if (fmt & 4) content = <s>{content}</s>;
  if (fmt & 8) content = <u>{content}</u>;
  return content;
}

function renderChildren(
  nodes: LexicalNode[] | undefined,
): React.ReactNode[] | null {
  if (!nodes?.length) return null;
  return nodes.map((n, i) => (
    <React.Fragment key={i}>{renderNode(n)}</React.Fragment>
  ));
}

function renderNode(node: LexicalNode): React.ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node as TextNode);

    case "paragraph": {
      const children = renderChildren((node as ParagraphNode).children);
      if (!children) return <br />;
      return <p>{children}</p>;
    }

    case "heading": {
      const h = node as HeadingNode;
      const Tag = h.tag ?? "h2";
      return <Tag>{renderChildren(h.children)}</Tag>;
    }

    case "list": {
      const l = node as ListNode;
      const Tag = l.listType === "number" ? "ol" : "ul";
      return <Tag>{renderChildren(l.children)}</Tag>;
    }

    case "listitem":
      return <li>{renderChildren((node as ListItemNode).children)}</li>;

    case "quote":
      return (
        <blockquote>
          {renderChildren((node as BlockquoteNode).children)}
        </blockquote>
      );

    case "horizontalrule":
      return <hr />;

    case "link":
    case "autolink": {
      const l = node as LinkNode;
      const url = l.url ?? l.fields?.url ?? "#";
      const newTab = l.fields?.newTab ?? false;
      return (
        <a href={url} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
          {renderChildren(l.children)}
        </a>
      );
    }

    case "root":
      return <>{renderChildren((node as RootNode).children)}</>;

    default:
      // Fall through for unknown nodes with children
      if ("children" in node && Array.isArray(node.children)) {
        return <>{renderChildren(node.children)}</>;
      }
      return null;
  }
}

type Props = {
  content: LexicalContent;
};

export function RichTextRenderer({ content }: Props) {
  const root = (content as { root?: LexicalNode }).root;
  if (!root) return null;

  return (
    <div className={[
      "prose prose-invert max-w-none",
      "prose-p:leading-relaxed prose-p:text-[color:var(--color-text-muted)]",
      "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:text-[color:var(--color-accent)]",
      "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold",
      "prose-ul:my-4 prose-ol:my-4",
      "prose-li:my-1 prose-li:text-[color:var(--color-text-muted)]",
      "prose-a:text-[color:var(--color-link)] hover:prose-a:text-[color:var(--color-link-hover)] prose-a:no-underline hover:prose-a:underline",
      "prose-h2:border-b prose-h2:border-[color:var(--color-border)] prose-h2:pb-3",
      "prose-strong:text-[color:var(--color-text)]",
      "prose-blockquote:border-l-[color:var(--color-accent)] prose-blockquote:text-[color:var(--color-text-muted)]",
    ].join(" ")}>
      {renderNode(root)}
    </div>
  );
}
