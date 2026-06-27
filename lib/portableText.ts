import { dataset, projectId } from "@/sanity/env";
import createImageUrlBuilder from "@sanity/image-url";
import { PortableTextBlock } from "@sanity/types";

// Sanity image URL builder
const builder = createImageUrlBuilder({ projectId, dataset });
const urlFor = (source: any) => {
  return builder.image(source).url();
};

/**
 * Convert Sanity Portable Text to Markdown
 */
// export function portableTextToMarkdown(
//   blocks: (PortableTextBlock | any)[] | undefined,
// ): string {
//   if (!blocks || !Array.isArray(blocks)) {
//     return "";
//   }

//   return blocks
//     .map((block: any) => {
//       // Handle image blocks
//       if (block._type === "image") {
//         const imageUrl = urlFor(block.asset);
//         const alt = block.alt || "";
//         return `![${alt}](${imageUrl})\n\n`;
//       }

//       if (
//         block._type !== "block" ||
//         !block.children ||
//         !Array.isArray(block.children)
//       ) {
//         return "";
//       }

//       const text = block.children
//         .map((child: any) => {
//           let content = child.text || "";

//           // Apply marks (bold, italic, etc.)
//           if (child.marks && Array.isArray(child.marks)) {
//             child.marks.forEach((mark: string) => {
//               if (mark === "strong") {
//                 content = `**${content}**`;
//               } else if (mark === "em") {
//                 content = `*${content}*`;
//               }
//             });
//           }

//           return content;
//         })
//         .join("");

//       // Handle different block styles
//       switch (block.style) {
//         case "h1":
//           return `# ${text}\n\n`;
//         case "h2":
//           return `## ${text}\n\n`;
//         case "h3":
//           return `### ${text}\n\n`;
//         case "h4":
//           return `#### ${text}\n\n`;
//         case "blockquote":
//           return `> ${text}\n\n`;
//         case "bullet":
//           return `- ${text}\n`;
//         default:
//           return text ? `${text}\n\n` : "";
//       }
//     })
//     .join("");
// }

/**
 * Convert Sanity Portable Text to plain text (for excerpts)
 */
export function portableTextToPlainText(
  blocks: PortableTextBlock[] | undefined,
): string {
  if (!blocks || !Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block) => {
      if (
        block._type !== "block" ||
        !block.children ||
        !Array.isArray(block.children)
      ) {
        return "";
      }

      return block.children.map((child: any) => child.text || "").join("");
    })
    .join(" ")
    .trim();
}
