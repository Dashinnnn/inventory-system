import "./Tag.css";

export type TagType =
  | "electronics"
  | "sale"
  | "featured"
  | "instock"
  | "lowstock"
  | "outofstock";

interface TagProps {
  label: string;
  type: TagType;
}

export default function Tag({ label, type }: TagProps) {
  return <span className={`tag tag--${type}`}>{label}</span>;
}